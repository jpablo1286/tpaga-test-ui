import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  authenticated=false;
  urlBase="http://192.168.1.172:8000/";
  token="";
  credentials: any;
  error=false;
  orders: any;
  httpOptions: any;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }
  authenticate(user:string, pass:string){
    this.httpClient.post(this.urlBase + 'api-token-auth',{username:user, password: pass}).subscribe((res)=>{
        this.credentials=res;
        this.token = this.credentials.token;
        if(this.token != "")
        {
          this.authenticated = true;
          this.error = false;
          this.listOrders();
        }
        else
        {
          this.authenticated = false;
          this.error = true;
        }
        });
  }

  listOrders(){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token '+ this.token
       })
    };
    this.httpClient.get(this.urlBase + 'order/list',this.httpOptions).subscribe((res)=>{
        this.orders=res;
    });
  }
  refund($event){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token '+ this.token
       })
    };
    this.httpClient.get(this.urlBase + 'order/refund/' + $event.orderId,this.httpOptions).subscribe((res)=>{
        this.listOrders();
    });
  }
}
