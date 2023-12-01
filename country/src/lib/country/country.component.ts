import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { CountriesService } from 'home/src/lib/countries.service';
import { Country } from 'home/src/lib/country';
import { Observable, map } from 'rxjs';
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
    private readonly countryService: CountriesService
  ) {}

  countryCca!: string | null;
  country$!: Observable<Country>;
  countryCodes: any = codes;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param: ParamMap) => (this.countryCca = param.get('country'))
    );

    this.country$ = this.countryService
      .getCountry(this.countryCca)
      .pipe(map((value) => value[0]));
  }
}
