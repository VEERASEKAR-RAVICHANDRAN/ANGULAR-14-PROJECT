import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor() {}

  async login(credentials: any) {
    const response = await axios.post(`${this.baseUrl}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token); // Save token in localStorage
    }
    return response.data;
  }

  async register(user: any) {
    const response = await axios.post(`${this.baseUrl}/register`, user);
    return response.data;
  }

  async getProducts() {
    const response = await axios.get(`${this.baseUrl}/products`);
    return response.data;
  }

  // Place an order
  async placeOrder(order: any) {
    const response = await axios.post(`${this.baseUrl}/orders`, order);
    return response.data;
  }

  // Get user orders
  async getOrders(userId: string, page: number = 1, limit: number = 10) {
    const response = await axios.get(`${this.baseUrl}/orders`, {
      params: { userId, page, limit },
    });
    return response.data;
  }
}