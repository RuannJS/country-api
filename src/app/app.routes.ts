import { Route } from '@angular/router';
import { HomeComponent } from '../../home/src/lib/home/home.component';
import { CountryComponent } from '../../country/src/lib/country/country.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, title: 'Countries Explorer' },
  { path: ':country', component: CountryComponent, title: 'Country Details' },
];
