import { Observable } from "rxjs";
import { authModel } from "../domain/auth/auth.model";

export abstract class IAuthService{
    abstract login(Email:string, Password:string):Observable<authModel>;

    abstract register(Name:string, Email:string, Password:string):Observable<authModel>;

    abstract updateProfile(Name:string, Email:string, Password:string):Observable<authModel>;
}