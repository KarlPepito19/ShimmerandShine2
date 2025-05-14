import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedTab: string = 'All';
  searchTerm: string = '';
  jewelryItems: any[] = [
    { name: 'Gold Necklace', category: 'Necklaces' },
    { name: 'Gold Crescent', category: 'Earrings' },
    { name: 'Silver Bow Ring', category: 'Ring' },
    { name: 'Rose Gold Bracelet', category: 'Bracelets' },
    { name: 'Anklet Charm', category: 'Anklets' },
    { name: 'Floral Chain', category: 'Necklaces' },
    { name: 'Pearl Drop', category: 'Earrings' },
    { name: 'Gold Chic Crystal', category: 'Ring' },
    { name: 'Sapphire Bracelet', category: 'Bracelets' },
    { name: 'Turquoise Anklet', category: 'Anklets' },
    { name: 'Chain Multi Layer', category: 'Necklaces' },
    { name: 'Golden Bow', category: 'Earrings' },
    { name: 'White Pearl', category: 'Ring' },
    { name: 'Citrine Bracelet', category: 'Bracelets' },
    { name: 'Garnet Anklet', category: 'Anklets' },
    { name: 'Extra Item 1', category: 'Other' },
    { name: 'Extra Item 2', category: 'Other' },
    { name: 'Extra Item 3', category: 'Other' },
    { name: 'Extra Item 4', category: 'Other' },
    { name: 'Extra Item 5', category: 'Other' }
  ];

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  get filteredItems() {
    let items = this.jewelryItems;

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
    console.log('Home clicked');
  }

  onCartClick() {
    console.log('Cart clicked');
  }

  onUserClick() {
    console.log('User clicked');
  }

  getItemClass(item: any, index: number): string {
    const baseCategory = item.category.toLowerCase();
    // Map categories to their base class
    const categoryMap: { [key: string]: string } = {
      necklaces: 'item-necklace',
      earrings: 'item-earrings',
      ring: 'item-ring',
      bracelets: 'item-bracelet',
      anklets: 'item-anklet'
    };

    const baseClass = categoryMap[baseCategory] || 'item-default';
    // If there's a specific class for the category, append index for variation
    if (baseClass !== 'item-default') {
      // Cycle through 0, 1, 2 for class suffixes (e.g., item-necklace, item-necklace1, item-necklace2)
      const suffix = index % 3; // Assuming 3 variations per category
      return suffix === 0 ? baseClass : `${baseClass}${suffix}`;
    }
    return baseClass;
  }
}