import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CartComponent } from '../cart/cart.component';
import { OrderComponent } from '../order/order.component';
import { AuthGuard } from '../auth.guard'; // Import AuthGuard for route protection

// Define application routes
const routes: Routes = [
  { path: '', redirectTo: 'cart', pathMatch: 'full' }, // Default route redirects to cart
  { path: 'home', component: CartComponent }, // Home route points to CartComponent
  { path: 'cart', component: CartComponent }, // Cart route
  { path: 'login', component: LoginComponent }, // Login route
  { path: 'register', component: RegisterComponent }, // Registration route
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] }, // Protected order route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Register routes
  exports: [RouterModule], // Export RouterModule to make it available throughout the app
})
export class AppRoutingModule {}
