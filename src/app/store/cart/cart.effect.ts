import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, of, catchError } from "rxjs";
import { validateCart, validateCartError, validateCartSuccess } from "./cart.action";
import { ProductService } from "../../service/product.service";

@Injectable()

export class CartEffect {
    constructor(
        private actions$: Actions,
        private productService:ProductService
    ) { }

    validateCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(validateCart),
            switchMap((action) => {
                return this.productService.getCartProductDetails(action.productIds).pipe(
                    map((products) =>{
                       return validateCartSuccess({ products });
                    }),
                    catchError((err) => {
                        console.error(err);
                       return of(validateCartError({message :err.message}));
                    })
                )
            })
        )
    );
}