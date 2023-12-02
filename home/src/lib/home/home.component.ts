import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../countries.service';
import { Observable } from 'rxjs';

import { NgOptimizedImage } from '@angular/common';
import { Country } from '../country';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'countries-app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private readonly countryService: CountriesService) {}

  countryList$: Observable<Country[]> = this.countryService.getCountries();

  listView$ = this.countryList$;

  currentFilter!: string;
  currentSearchValue!: string;

  onFilterChange(region: string) {
    this.currentSearchValue = '';

    this.listView$ = this.countryService.filterByRegion(
      region,
      this.countryList$
    );

    if (region === 'all') {
      this.listView$ = this.countryList$;
    }
  }

  searchForCountry(event: KeyboardEvent) {
    if (this.currentSearchValue === '' && event.key === 'Backspace') {
      return;
    }

    this.listView$ = this.countryService.searchForCountry(
      this.currentSearchValue,
      this.countryList$
    );
  }
}
