export interface Product {
    name: string;
    images: string[];
    description: string;
    categories: string;
    price: number;
    createdBy: string;
    createdAt: Date;
  }

 export interface productsState{
    products:Product[];
    isLoading: boolean;
    error: string | null;
 } 