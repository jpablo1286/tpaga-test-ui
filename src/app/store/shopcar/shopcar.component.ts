import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shopcar',
  templateUrl: './shopcar.component.html',
  styleUrls: ['./shopcar.component.css']
})
export class ShopcarComponent implements OnInit {
  @Input() totalShopingCar: number;
  @Input() purcahsedItems: any;
  @Output() productRemoved = new EventEmitter();

  urlBase="http://192.168.1.172:8000/";
  order: any;
  id=0;
  httpOptions:any;
  btnPay=0;
  constructor(private router: Router, private httpClient: HttpClient) {

  }

  ngOnInit() {
  }
  removeItem($event){
    this.productRemoved.emit({idx : $event.idx, cost: $event.cost});
  }
  createOrder(){
    this.btnPay=1;
    this.httpClient.post(this.urlBase + 'order/create',
    {
      status:"new",
      customerEmail:"jpablo.localhost@gmail.com",
      cost: this.totalShopingCar
    }
    ).subscribe((res)=>{
      this.order=res;
      this.id=this.order.id;
      this.httpClient.post(this.urlBase +'order/checkout/'+ this.order.id,{}).subscribe((res)=>{
      this.order=res;
      this.router.navigate(['/order/' + this.id]);


      });
    });

    }
}
