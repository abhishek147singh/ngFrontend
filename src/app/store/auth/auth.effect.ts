import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, of, catchError } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../../service/auth.service";
import { login, loginSuccess, loginError, logout, dummy, register, updateProfile } from "./auth.action";

@Injectable()

export class AuthEffect {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router:Router,
    ) { }

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            switchMap((action) => {
                return this.authService.login(action.username, action.pass).pipe(
                    map((data) =>{ 
                        this.router.navigate([action.redirectionUrl]);
                       return loginSuccess({ data });
                    }),
                    catchError((err) => {
                        console.error(err);
                       return of(loginError({message :err.message}));
                    })
                )
            })
        )
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(register),
            switchMap((action) => {
                return this.authService.register(action.username, action.email , action.pass).pipe(
                    map((data) =>{ 
                        this.router.navigate([action.redirectionUrl]);
                       return loginSuccess({ data });
                    }),
                    catchError((err) => {
                        console.error(err);
                       return of(loginError({message :err.message}));
                    })
                )
            })
        )
    );

    updateProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateProfile),
            switchMap((action) => {
                return this.authService.updateProfile(action.username, action.email , action.pass).pipe(
                    map((data) =>{ 
                       return loginSuccess({ data });
                    }),
                    catchError((err) => {
                        console.error(err);
                       return of(loginError({message :err.message}));
                    })
                )
            })
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logout),
            switchMap((action) => {
                this.router.navigate(['login']);
                return of(dummy());
            })
        )
    );
}
