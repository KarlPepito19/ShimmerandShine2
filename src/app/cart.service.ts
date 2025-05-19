import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { item: any, size: number, quantity: number }[] = [];
  private cartItemsSubject = new BehaviorSubject<{ item: any, size: number, quantity: number }[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(item: any, size: number, quantity: number = 1) {
    this.cartItems.push({ item, size, quantity });
    this.cartItemsSubject.next([...this.cartItems]);
  }

  getCartItems() {
    return this.cartItems;
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.cartItemsSubject.next([...this.cartItems]);
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next([]);
  }

  updateCartItems(items: { item: any, size: number, quantity: number }[]) {
    this.cartItems = items;
    this.cartItemsSubject.next([...this.cartItems]);
  }
}