import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  ParamMap,
  RouterModule,
  Router,
} from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { CountriesService } from 'home/src/lib/countries.service';
import { Country } from 'home/src/lib/country';
import { Observable, map, tap } from 'rxjs';
import { codes } from '../codes';

@Component({
  selector: 'countries-app-country',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './country.component.html',
  styleUrl: './country.component.css',
})
export class CountryComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly countryService: CountriesService,
    private readonly router: Router
  ) {}

  countryCca!: string | null;
  country$!: Observable<Country>;
  countryCodes: any = codes;

  countryCurrency!: string[];
  countryLanguages!: string[];

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param: ParamMap) => (this.countryCca = param.get('country'))
    );

    this.country$ = this.countryService.getCountry(this.countryCca).pipe(
      map((value) => value[0]),
      tap((value) => (this.countryLanguages = Object.values(value.languages))),
      tap((value) => (this.countryCurrency = Object.keys(value.currencies)))
    );
  }

  redirectTo(code: string) {
    this.router.navigate([code]);

    this.country$ = this.countryService.getCountry(code).pipe(
      map((value) => value[0]),
      tap((value) => (this.countryLanguages = Object.values(value.languages))),
      tap((value) => (this.countryCurrency = Object.keys(value.currencies)))
    );
  }
}
