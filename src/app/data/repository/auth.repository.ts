import { Injectable } from "@angular/core";
import { baseUrl } from "../../../environment";
import { IAuthRepository } from "../../core/repository/IAuth.reposioty";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { authModel } from "../../core/domain/auth/auth.model";
import { AuthEntity } from "../../entity/auth/auth.entity";

@Injectable({
    providedIn: 'root'
})

export class AuthRepository extends IAuthRepository{
    
    baseUrl = baseUrl;
    
    constructor(private http:HttpClient){
        super();
    }

    override login(Email: string, Password: string): Observable<authModel> {
        const url = `${baseUrl}/api/user/signin`;

       return this.http.post<AuthEntity> (url, { Email, Password }).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.message);
            })
        );
    }
    
    override register(Name: string, Email: string, Password: string): Observable<authModel> {
        const url = `${baseUrl}/api/user/signup`;

        return this.http.post<AuthEntity> (url, { Name, Email, Password }).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                }

                throw new Error(response.message);
            })
        );
    }
}