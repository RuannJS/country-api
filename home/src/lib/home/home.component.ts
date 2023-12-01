import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../countries.service';
import { Observable } from 'rxjs';
import { Country } from '../country';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'countries-app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private countryCount: number = 10;

  constructor(private readonly countryService: CountriesService) {}

  countryList$: Observable<Country[]> = this.countryService.getCountries(
    this.countryCount
  );

  ngOnInit(): void {}
}
