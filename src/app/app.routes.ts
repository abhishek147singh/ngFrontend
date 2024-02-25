import { Routes } from '@angular/router';
import { HomeScreenComponent } from './presentation/screens/home-screen/home-screen.component';
import { ProductDetailsScreenComponent } from './presentation/screens/product-details-screen/product-details-screen.component';
import { CartScreenComponent } from './presentation/screens/cart-screen/cart-screen.component';

export const routes: Routes = [
    {path:'', component:HomeScreenComponent},
    {path:'product/:id', component:ProductDetailsScreenComponent},
    {path:'cart', component:CartScreenComponent}
];
