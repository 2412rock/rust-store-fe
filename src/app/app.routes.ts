import { Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { StorePageComponent } from './components/store-page/store-page.component';

export const routes: Routes = [
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: 'store',
        component: StorePageComponent
    }
];
