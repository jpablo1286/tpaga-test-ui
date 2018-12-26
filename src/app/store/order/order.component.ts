import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  urlBase="http://192.168.1.172:8000/";
  tpagaUrl="";
  cost=0;
  order: any;
  oId: any;
  sub: any;
  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {
   }

  ngOnInit() {
  }
  pagar(){
    window.location.href=this.tpagaUrl;
  }
  getData(){
    this.sub = this.route.params.subscribe(params => {
    this.oId = params['oId'];

    this.httpClient.get(this.urlBase + 'order/info/'+ this.oId).subscribe((res)=>{
        this.order=res;
        this.tpagaUrl = this.order.tpagaPaymentUrl;
        this.cost = this.order.cost;
        });

    });
    this.sub = this.route.params.subscribe(params => {
    this.oId = params['oId'];

    this.httpClient.get(this.urlBase + 'order/info/'+ this.oId).subscribe((res)=>{
        this.order=res;
        this.tpagaUrl = this.order.tpagaPaymentUrl;
        this.cost = this.order.cost;
        });

    });
  }
}
