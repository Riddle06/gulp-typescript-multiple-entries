export interface User {
  city: string;
  county: string;
  address: string;
  hasElevator: boolean;
}

export interface City {
  city: string;
  county: string[];
}
