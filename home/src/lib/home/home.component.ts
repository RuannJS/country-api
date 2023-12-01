import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../countries.service';
import { Observable } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { Country } from '../country';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'countries-app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, InfiniteScrollModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private readonly countryService: CountriesService) {}

  countryList$: Observable<Country[]> = this.countryService.getCountries();

  listView$ = this.countryList$;

  currentFilter!: string;
  currentSearchValue!: string;

  currentPage: number = 0;
  totalPages!: number;

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

  searchForCountry() {
    if (this.currentSearchValue === '') {
      this.listView$ = this.countryService.getCountries();
    }

    this.listView$ = this.countryService.searchForCountry(
      this.currentSearchValue,
      this.countryList$
    );
  }
}
