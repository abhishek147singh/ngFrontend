import { Routes } from '@angular/router';
import { HomeScreenComponent } from './presentation/screens/home-screen/home-screen.component';
import { ProductDetailsScreenComponent } from './presentation/screens/product-details-screen/product-details-screen.component';
import { CartScreenComponent } from './presentation/screens/cart-screen/cart-screen.component';
import { ContactUsScreenComponent } from './presentation/screens/contact-us-screen/contact-us-screen.component';
import { FilterProductScreenComponent } from './presentation/screens/filter-product-screen/filter-product-screen.component';
import { ShippingScreenComponent } from './presentation/screens/shipping-screen/shipping-screen.component';
import { LoginScreenComponent } from './presentation/screens/login-screen/login-screen.component';
import { RegisterScreenComponent } from './presentation/screens/register-screen/register-screen.component';
import { PaymentScreenComponent } from './presentation/screens/payment-screen/payment-screen.component';
import { ProfileScreenComponent } from './presentation/screens/profile-screen/profile-screen.component';

export const routes: Routes = [
    {path:'', component:HomeScreenComponent},
    {path:'login', component:LoginScreenComponent},
    {path:'register', component:RegisterScreenComponent},
    {path:'product/:id', component:ProductDetailsScreenComponent},
    {path:'cart', component:CartScreenComponent},
    {path:'contact-us', component:ContactUsScreenComponent},
    {path:'shop', component:FilterProductScreenComponent},
    {path:'shipping', component:ShippingScreenComponent},
    {path:'payment', component:PaymentScreenComponent},
    {path:'profile', component:ProfileScreenComponent},
];
