import { NgModule, ModuleWithProviders } from "../../../node_modules/@angular/core";
import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";
import { FormsModule, ReactiveFormsModule } from "../../../node_modules/@angular/forms";
import { CommonModule } from "../../../node_modules/@angular/common";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { RestaurantsService } from "../restaurants/restaurants.service";
import { OrderService } from "../order/order.service";
import { SnackbarComponent } from "./messages/snackbar/snackbar.component";
import { NotificationService } from "./messages/notification.service";

@NgModule({
    declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    exports: [InputComponent, RadioComponent, SnackbarComponent,
              RatingComponent, CommonModule, 
              ReactiveFormsModule, FormsModule]
})
export class SharedModule{

    static forRoot(): ModuleWithProviders{
        return {
            ngModule: SharedModule,
            providers: [ShoppingCartService, RestaurantsService, OrderService, NotificationService]
        }
    }
}