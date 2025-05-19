import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: { item: any, size: number, quantity: number }[] = [];

  constructor(public cartService: CartService, public router: Router) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items.map(item => ({
        ...item,
        quantity: item.quantity || 1 // Default quantity to 1 if not set
      }));
    });
  }

  removeFromCart(index: number) {
    this.cartService.removeItem(index);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  incrementQuantity(index: number) {
    this.cartItems[index].quantity++;
    this.updateCart();
  }

  decrementQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.updateCart();
    } else {
      // If quantity is 1, remove the item from the cart
      this.removeFromCart(index);
    }
  }

  updateCart() {
    this.cartService.updateCartItems([...this.cartItems]);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, cartItem) => total + (cartItem.item.price * cartItem.quantity), 0);
  }

  getItemClass(item: any): string {
    const baseCategory = item.category.toLowerCase();
    const categoryMap: { [key: string]: string } = {
      necklaces: 'item-necklace',
      earrings: 'item-earrings',
      ring: 'item-ring',
      bracelets: 'item-bracelet',
      anklets: 'item-anklet'
    };

    const baseClass = categoryMap[baseCategory] || 'item-default';
    if (baseClass !== 'item-default' && item.originalIndex !== undefined) {
      const suffix = item.originalIndex % 3;
      return suffix === 0 ? baseClass : `${baseClass}${suffix}`;
    }
    return baseClass;
  }
}