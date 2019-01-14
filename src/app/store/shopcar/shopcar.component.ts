import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../backend.service';

@Component({
  selector: 'app-shopcar',
  templateUrl: './shopcar.component.html',
  styleUrls: ['./shopcar.component.css']
})
export class ShopcarComponent implements OnInit {
  @Input() totalShopingCar: number;
  @Input() purcahsedItems: any;
  @Output() productRemoved = new EventEmitter();
  order: any;
  data: any;
  id=0;
  httpOptions:any;
  btnPay=0;
  constructor(private router: Router, private backendService: BackendService) {

  }

  ngOnInit() {
    this.backendService.orderUpdated.subscribe(
      ()=> {
        this.data=this.backendService.getOrder();
        this.id = this.data['id'];
        this.order = this.data['order'];
        this.router.navigate(['/order/' + this.id]);
      });
  }
  removeItem($event){
    this.productRemoved.emit({idx : $event.idx, cost: $event.cost});
  }
  createOrder(){
    this.btnPay=1;
    this.backendService.createOrder(this.totalShopingCar);
    }
}
