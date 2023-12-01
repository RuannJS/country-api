import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from './country';
import { Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private API_URL: string = 'https://restcountries.com/v3.1/all';
  private CCA_URL: string = 'https://restcountries.com/v3.1/alpha/';

  constructor(private readonly http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http
      .get<Country[]>(this.API_URL)
      .pipe(
        tap((value) =>
          value.sort((a, b) => a.name.common.localeCompare(b.name.common))
        )
      );
  }

  getCountry(cca: string | null): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.CCA_URL}${cca}`);
  }

  filterByRegion(region: string, list: Observable<Country[]>) {
    return list.pipe(
      map((value) => value.filter((country) => country.region === region))
    );
  }

  searchForCountry(
    searchQuery: string,
    list: Observable<Country[]>
  ): Observable<Country[]> {
    return list.pipe(
      map((value) =>
        value.filter((country) =>
          country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    );
  }
}
