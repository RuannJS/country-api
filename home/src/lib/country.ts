export interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: { svg: string; png: string };
  nativeName: string;
  population: number;
  region: string;
  subRegion: string;
  capital: string;
  topLevelDomain: string[];
  currencies: [{ code: string; name: string; symbol: string }];
  languages: [
    { iso639_1: string; iso639_2: string; name: string; nativeName: string }
  ];
  borders: string[];
  cca3: string;
}
