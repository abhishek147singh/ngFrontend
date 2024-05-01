import { Injectable } from "@angular/core";
import { IAuthService } from "../core/service/IAuth.service";
import { AuthRepository } from "../data/repository/auth.repository";
import { Observable } from "rxjs";
import { authModel } from "../core/domain/auth/auth.model";

@Injectable({
    providedIn:'root'
}) 

export class AuthService extends IAuthService{

    constructor(private authRepository : AuthRepository){
        super();
    }

    override login(Email:string, Password:string): Observable<authModel> {
        return this.authRepository.login(Email , Password);
    }

    override register(Name: string, Email: string, Password: string): Observable<authModel> {
        return this.authRepository.register(Name, Email, Password);
    }

    override updateProfile(Name: string, Email: string, Password: string): Observable<authModel> {
        return this.authRepository.updateProfile(Name, Email, Password);
    }
}