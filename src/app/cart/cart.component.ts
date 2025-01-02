import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any[] = [];
  cart: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  async ngOnInit() {
    try {
      const response = await this.apiService.getProducts();
      this.products = response.products; // Populate products from API response
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  addToCart(product: any) {
    const index = this.cart.findIndex((item) => item.productId === product._id);
    if (index >= 0) {
      this.cart[index].quantity += 1;
    } else {
      this.cart.push({
        productId: product._id,
        productName: product.name,
        productPrice: product.price,
        quantity: 1,
      });
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    // alert(`${product.name} added to cart!`);
    
  }

  removeFromCart(productId: string) {
    const index = this.cart.findIndex((item) => item.productId === productId);
    if (index >= 0) {
      this.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      // alert('Item removed from cart!');
    }
  }

  calculateTotalPrice(): number {
    return this.cart.reduce(
      (total, item) => total + item.productPrice * item.quantity,
      0
    );
  };
  


  placeOrder() {
    if (this.cart.length === 0) {
      alert('Your cart is empty. Add items before placing an order!');
      return;
    }
    // Here, you can add additional logic to save the order in the backend
    // alert('Redirecting to the order page...');
    this.router.navigate(['/order']); // Redirect to order
  }

  incrementQuantity(productId: string) {
    const index = this.cart.findIndex((item) => item.productId === productId);
    if (index >= 0) {
      this.cart[index].quantity += 1;
    }
  }
  
  decrementQuantity(productId: string) {
    const index = this.cart.findIndex((item) => item.productId === productId);
    if (index >= 0 && this.cart[index].quantity > 1) {
      this.cart[index].quantity -= 1;
    } else if (index >= 0 && this.cart[index].quantity === 1) {
      this.removeFromCart(productId); // Remove the item if quantity is 1 and decremented
    }
  }
  
}
