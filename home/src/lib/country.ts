export interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: { svg: string; png: string };
  population: number;
  region: string;
  subregion: string;
  capital: string;
  tld: string[];
  currencies: {
    code: {
      name: string;
    };
  };
  languages: {};
  borders: string[];
  cca3: string;
}
