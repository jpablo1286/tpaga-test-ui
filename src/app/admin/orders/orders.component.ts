import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BackendService } from '../../backend.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  authenticated=false;
  urlBase="https://backminiapp.juanrivera.org/";
  token="";
  credentials: any;
  error=false;
  errorMessage="";
  orders: any;
  httpOptions: any;
  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.errorInfo.subscribe(
      ()=>{
        this.error = this.backendService.error;
        this.errorMessage = this.backendService.errorMessage;
      }
    );

    this.backendService.tokenUpdated.subscribe(
      ()=> {
        this.token=this.backendService.getToken();

        if(this.token != "")
        {
          this.authenticated = true;
          this.listOrders();
        }
        else
        {
          this.authenticated = false;
        }

      });

      this.backendService.ordersUpdated.subscribe(
        ()=>{
          this.orders = this.backendService.getOrders();
        }
      );
  }
  authenticate(user:string, pass:string){
    this.backendService.getAuthenticated(user,pass);
  }

  listOrders(){
    this.backendService.listOrders(this.token);
  }
  refund($event){
    this.backendService.refund($event.orderId,this.token);
  }
}
