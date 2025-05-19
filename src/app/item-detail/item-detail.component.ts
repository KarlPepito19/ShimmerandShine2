import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {
  @Input() item: any = null;
  @Output() close = new EventEmitter<void>();
  selectedSize: number = 0;

  constructor(private cartService: CartService) {}

  onClose() {
    this.close.emit();
  }

  onAddToCart() {
    if (this.selectedSize > 0 && this.item?.sizes?.includes(this.selectedSize)) {
      this.cartService.addToCart(this.item, this.selectedSize, 1); // Add with quantity 1
    }
    this.close.emit();
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