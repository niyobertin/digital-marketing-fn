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

 export interface User{
   firstName:string;
   secondName:String;
   gender:string;
   dob:Date;
   email:string
   ;
   role:string;
   password:string;
}
export interface Login{
   email:string;
   password:string;
} 
export interface LoginState {
    user:User[];
    loading: boolean;
    error: string | null;
 }

export interface Register{
   firstName:string;
    secondName:String;
    gender:string;
    dob:Date;
    email:string;
    password:string;
}

export interface RegisterState {
   user:User[];
   loading: boolean;
   error: string | null;
}