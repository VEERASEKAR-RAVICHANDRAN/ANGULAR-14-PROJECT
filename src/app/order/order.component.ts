import { Component } from '@angular/core';
import { ApiService } from '../app.service';
import {jwtDecode} from 'jwt-decode';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  // imports:[FormsModule]
  // standalone:true
})
export class OrderComponent {
  cart: any[] = []; // Populate this from the cart component or local storage
  shippingAddress = {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  };
  userId: string | null = null;
  ngOnInit() {
    console.log('Initial Shipping Address:', this.shippingAddress);
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    } else {
      console.warn('Cart is empty');
    }
  }
  constructor(private apiService: ApiService) {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userId = decoded.userId;
    }
  }

  async placeOrder() {
    console.log(this.shippingAddress)
    if (!this.userId) {
      alert('You need to log in first!');
      return;
    }
    
  
    const totalAmount = this.cart.reduce(
      (acc, item) => acc + item.quantity * (item.productPrice || 0),
      0
    );
    console.log('Total Amount:', totalAmount);


    if (totalAmount <= 0) {
      alert('Total amount must be greater than zero.');
      return;
    }
  
    const order = {
      userId: this.userId,
      products: this.cart,
      shippingAddress: this.shippingAddress,
      paymentMethod: 'Cash on Delivery',
      totalAmount,
    };
    if (
      !this.shippingAddress.street ||
      !this.shippingAddress.city ||
      !this.shippingAddress.state ||
      !this.shippingAddress.postalCode ||
      !this.shippingAddress.country
    ) {
      alert('Please fill in all shipping address fields.');
      return;
    }
    console.log('Order payload:', order)
    try {
      console.log('Placing order with data:', order); // Debug log
      const response = await this.apiService.placeOrder(order);
      alert('Order placed successfully!');
      console.log('Order response:', response); // Debug log
      this.cart = []; // Clear the cart
      localStorage.removeItem('cart'); // Clear saved cart
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  }
  totalAmount(totalAmount: any) {
    throw new Error('Method not implemented.');
  }
}