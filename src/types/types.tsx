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
}
