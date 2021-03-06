import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderId: string
  orderForm: FormGroup

  delivery = 8;

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de débito', value: 'DEB'},
    {label: 'Cartão refeição', value: 'REF'}
  ];

  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');
    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return { emailsNotMatch: true };
    }
    return undefined;
  }

  constructor(private orderService: OrderService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
      this.orderForm = new FormGroup({
          name: new FormControl('', {
            validators: [Validators.required, Validators.minLength(5)]
          }),
          email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
          emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
          address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
          number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
          optionalAddress: this.formBuilder.control(''),
          paymentOption: new FormControl('', {
            validators:[Validators.required],
            updateOn: 'change'
          })    
      }, {validators: [OrderComponent.equalsTo], updateOn: 'blur'});
  }

  itemsValue(): number {
    return this.orderService.total();
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  decreaseQty(item: CartItem) {
    return this.orderService.decreaseQty(item);
  }

  increaseQty(item: CartItem) {
    return this.orderService.increaseQty(item);
  }

  removeItem(item: CartItem) {
    return this.orderService.removeItem(item);
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems().map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));

    this.orderService.checkOrder(order)
      .pipe(tap((orderId: string) => {
      this.orderId = orderId;
      }))
      .subscribe((orderId: string) => {
        this.router.navigate(['/order-summary']);
        this.orderService.clear();
      });
    console.log(order);
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined;
  }



}
