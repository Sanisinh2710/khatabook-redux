export interface TransectionType{
    [key : string]: any;
    remarks: string;
    receipt: string;
    toAccount: string;
    fromAccount: string;
    amount: number;
    ttype: string;
    monthYear: string;
    tdate: string;
    id: number;


}

export interface LoginForm {
    email :  string   
    password: string 
    token? : string
}

export interface RegisterForm {
    id : number
    uname: string
        email: string
        password: string
}

export interface  RegisterType {uname:string;email:string;password:string;id:number}

export interface sort {key: string;direction : string}