/* Change as needed */

export interface Continent {
  code: string
  name: string
}

export interface Country {
  code: string
  name: string
  capital: string
  population: number
  continent: {
    name: string
  }
  languages: { name: string }[];
}

export interface GetCountriesData {
  countries: Country[];
}

export enum SortKey {
  Name = "name",
  LanguagesCount = "languagesCount",
  Capital = "capital",
  Continent = "continent",
}

export interface Continent {
  code: string;
  name: string;
  countries: { languages: { name: string }[] }[];
}

export interface GetContinentsData {
  continents: Continent[];
}