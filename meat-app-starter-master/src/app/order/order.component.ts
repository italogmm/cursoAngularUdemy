import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup

  delivery: number = 8;

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de débito', value: 'DEB'},
    {label: 'Cartão refeição', value: 'REF'}
  ];

  constructor(private orderService: OrderService, 
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
      this.orderForm = this.formBuilder.group({
          name: this.formBuilder.control(''),
          email: this.formBuilder.control(''),
          emailConfirmation: this.formBuilder.control(''),
          address: this.formBuilder.control(''),
          number: this.formBuilder.control(''),
          optionalAddress: this.formBuilder.control(''),
          paymentOption: this.formBuilder.control('')
      });
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
    this.orderService.checkOrder(order).subscribe((orderCadastrada: Order) => {
      this.router.navigate(['/order-summary']);
      console.log(`Compra concluída: ${orderCadastrada.id}`);
      this.orderService.clear();
    });
    console.log(order);
  }

}
