export interface Country {
    name?: string;
    code?: string;
  }
  
  export interface Representative {
    name?: string;
    image?: string;
  }
  
  export class Customer {
    id!: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string | Date;
    customdate?: string | Date;
    enddate?: string | Date;
    status?: string;
    activity?: number;
    representative?: Representative;
    verified?: boolean;
    balance?: boolean;
  }
  export class Customer1 {
    id!: number;
    name?: string;
    country?: Country;
    company?: string;
    date?: string | Date;
    customdate?: string | Date;
    enddate?: string | Date;
    status?: string;
    activity?: number;
    representative?: Representative;
    verified?: boolean;
    balance?: boolean;
  }
  