import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemDetailComponent } from '../item-detail/item-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemDetailComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedTab: string = 'All';
  searchTerm: string = '';
  jewelryItems: any[] = [
    { name: 'Gold Necklace', category: 'Necklaces', price: 6878, description: 'Your go-to gold pendant necklace for a classy, minimalist vibe.', sizes: [14, 16, 18, 20, 24, 30, 32, 36] },
    { name: 'Gold Crescent', category: 'Earrings', price: 2500, description: 'Elegant gold crescent earrings for a minimalist look.', sizes: [14, 16, 18, 20, 24, 30, 32, 36] },
    { name: 'Silver Bow Ring', category: 'Ring', price: 1800, description: 'A delicate silver ring with a bow design.', sizes: [14, 16, 18, 20, 24, 30, 32, 36] },
    { name: 'Rose Gold Bracelet', category: 'Bracelets', price: 3200, description: 'A stunning rose gold bracelet for any occasion.', sizes: [14, 16, 18, 20, 24, 30, 32, 36] },
    { name: 'Anklet Charm', category: 'Anklets', price: 1500, description: 'A charming anklet with a delicate design.', sizes: [14, 16, 18, 20, 24, 30, 32, 36] },
    { name: 'Floral Chain', category: 'Necklaces', price: 7200, description: 'A floral-inspired chain necklace.', sizes: [14, 16, 18, 20, 24, 30, 32, 36] },
    { name: 'Pearl Drop', category: 'Earrings', price: 2800, description: 'Classic pearl drop earrings for elegance.', sizes: [14, 16, 18, 20, 24, 30, 32, 36] },
    { name: 'Gold Chic Crystal', category: 'Ring', price: 2000, description: 'A chic gold ring with a crystal accent.', sizes: [14, 16, 18, 20, 24, 30, 32, 36] },
    { name: 'Turquoise Anklet', category: 'Anklets', price: 1700, description: 'A vibrant turquoise anklet for a pop of color.', sizes: [14, 16, 18, 20, 24, 30, 32, 36] },
    { name: 'Chain Multi Layer', category: 'Necklaces', price: 8000, description: 'A multi-layered chain necklace for a bold look.', sizes: [14, 16, 18, 20, 24, 30, 32, 36] },
    { name: 'Golden Bow', category: 'Earrings', price: 2600, description: 'Golden bow-shaped earrings for a playful touch.', sizes: [14, 16, 18, 20, 24, 30, 32, 36] },
    { name: 'White Pearl', category: 'Ring', price: 2200, description: 'A white pearl ring for timeless elegance.', sizes: [14, 16, 18, 20, 24, 30, 32, 36] },
    { name: 'Citrine Bracelet', category: 'Bracelets', price: 3400, description: 'A citrine bracelet with a warm glow.', sizes: [14, 16, 18, 20, 24, 30, 32, 36] },
    { name: 'Garnet Anklet', category: 'Anklets', price: 1600, description: 'A garnet anklet with a rich red hue.', sizes: [14, 16, 18, 20, 24, 30, 32, 36] }
  ];
  selectedItem: any = null;

  constructor(private router: Router) {}

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  get filteredItems() {
    // Create a map to track the index of each item within its category
    const categoryIndices: { [key: string]: number } = {};

    // Initialize indices for each category
    this.jewelryItems.forEach(item => {
      const category = item.category;
      categoryIndices[category] = categoryIndices[category] || 0;
    });

    // Map items to include their category-specific index
    let items = this.jewelryItems.map(item => {
      const category = item.category;
      const categoryIndex = categoryIndices[category]++;
      return { ...item, categoryIndex };
    });

    // Filter by category
    if (this.selectedTab !== 'All') {
      items = items.filter(item => item.category === this.selectedTab);
    }

    // Filter by search term
    if (this.searchTerm.trim()) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    return items;
  }

  onFavoritesClick() {
    console.log('Favorites clicked');
  }

  onSearchClick() {
    console.log('Search clicked');
  }

  onHomeClick() {
    this.selectedTab = 'All'; // Reset to 'All' category
    this.searchTerm = ''; // Optionally clear the search term
  }

  onCartClick() {
    this.router.navigate(['/cart']);
  }

   onUserClick() {
      this.router.navigate(['/user']);
    }
    

  getItemClass(item: any, categoryIndex: number): string {
    const baseCategory = item.category.toLowerCase();
    const categoryMap: { [key: string]: string } = {
      necklaces: 'item-necklace',
      earrings: 'item-earrings',
      ring: 'item-ring',
      bracelets: 'item-bracelet',
      anklets: 'item-anklet'
    };

    const baseClass = categoryMap[baseCategory] || 'item-default';
    if (baseClass !== 'item-default') {
      const suffix = categoryIndex % 3;
      return suffix === 0 ? baseClass : `${baseClass}${suffix}`;
    }
    return baseClass;
  }

  showItemDetails(item: any) {
    this.selectedItem = { ...item };
  }
}