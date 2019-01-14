import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BackendService } from '../../backend.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  tpagaUrl="";
  cost=0;
  order: any;
  oId: any;
  sub: any;
  data: any;
  error=false;
  errorMessage="";
  constructor(private router: Router, private route: ActivatedRoute, private backendService: BackendService) {
   }

  ngOnInit() {
    //Se realiza una subscripcion para hacer seguimientos a los errores de backend
      this.backendService.errorInfo.subscribe(
        ()=>{
          this.error = this.backendService.error;
          this.errorMessage = this.backendService.errorMessage;
        }
      );
    this.backendService.orderUpdated.subscribe(
      ()=> {
        this.data=this.backendService.getOrder();
        this.order = this.data['order'];
        this.tpagaUrl = this.order.tpagaPaymentUrl;
        this.cost = this.order.cost;
      });
  }
  pagar(){
    window.location.href=this.tpagaUrl;
  }
  getData(){
    this.sub = this.route.params.subscribe(params => {
    this.oId = params['oId'];
    this.backendService.getOrderInfo(this.oId);
    this.backendService.getOrderInfo(this.oId);
    });

  }
}
