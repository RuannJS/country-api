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

  getCountries(pageSize: number): Observable<Country[]> {
    return this.http.get<Country[]>(this.API_URL).pipe(
      tap((value) =>
        value.sort((a, b) => a.name.common.localeCompare(b.name.common))
      ),
      map((value) => value.filter((value, index) => index <= pageSize))
    );
  }

  getCountry(cca: string | null): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.CCA_URL}${cca}`);
  }
}
