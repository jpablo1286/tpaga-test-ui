import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  // Este parametro es el unico que debe ser modificado
  // Para entorno de produccion o desarrollo
  //urlBase="https://backminiapp.juanrivera.org/";
  //urlBase="http://localhost:8000/";
  urlBase="http://192.168.28.128:8000/"
  error=false;
  errorMessage="";
  items: any;
  order: any;
  orders: any;
  id=0;
  credentials:any;
  token:"";
  httpOptions: any;
  itemsUpdated = new Subject();
  orderUpdated = new Subject();
  tokenUpdated = new Subject();
  ordersUpdated = new Subject();
  errorInfo = new Subject();
  constructor(private httpClient: HttpClient) {
  }

  getItemList() {
    this.httpClient.get(this.urlBase +'item/list').subscribe((res)=>{
      this.items=res;
      this.itemsUpdated.next();
      this.clearErrors();
    },
    (err) => {
      this.setError("Error de comunicación con el backend");
    }
  );

  }
  getItems(){
    return this.items;
  }

  createOrder(myTotal){
    this.httpClient.post(this.urlBase + 'order/create',
    {
      status:"new",
      customerEmail:"jpablo.localhost@gmail.com",
      cost: myTotal
    }
    ).subscribe((res)=>{
      this.order=res;
      this.id=this.order.id;
      this.httpClient.post(this.urlBase +'order/checkout/'+ this.order.id,{}).subscribe((res)=>{
      this.order=res;
      this.orderUpdated.next();
      this.clearErrors();
      },
      (err) => {
        this.setError("Error de comunicación con el backend");
      });
    },
    (err) => {
      this.setError("Error de comunicación con el backend");
    });
  }

  getOrder(){
    return {'order': this.order, 'id':this.id };
  }
  getOrderInfo(orderId){
    this.httpClient.get(this.urlBase + 'order/info/'+ orderId).subscribe((res)=>{
        this.order=res;
        this.orderUpdated.next();
        this.clearErrors();
      },
      (err) => {
        this.setError("Error de comunicación con el backend");
      });
  }
  confirmOrder(orderId){
    this.httpClient.post(this.urlBase + 'order/confirm/'+ orderId,{}).subscribe((res)=>{
        this.order=res;
        this.orderUpdated.next();
        this.clearErrors();
      });
  }
  getAuthenticated(user:string, pass:string){
    this.httpClient.post(this.urlBase + 'api-token-auth',{username:user, password: pass}).subscribe((res)=>{
        this.credentials=res;
        this.token = this.credentials.token;
        this.tokenUpdated.next();
        this.clearErrors();
      },
      (err) => {
        this.token="";
        this.setError("Error de authenticación");
      }
    );
  }
  getToken(){
    return this.token;
  }
  listOrders(myToken:string){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token '+ myToken
       })
    };
    this.httpClient.get(this.urlBase + 'order/list',this.httpOptions).subscribe((res)=>{
        this.orders=res;
        this.ordersUpdated.next();
        this.clearErrors();
    },
    (err) => {
      this.setError("Error de comunicación con el backend");
    });
  }
  getOrders(){
    return this.orders;
  }
  refund(orderId, myToken){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Token '+ myToken
       })
    };
    this.httpClient.get(this.urlBase + 'order/refund/' + orderId,this.httpOptions).subscribe((res)=>{
        this.listOrders(myToken);
    },
    (err) => {
      this.setError("Error de comunicación con el backend");
    });
  }
  clearErrors(){
    this.error=false;
    this.errorMessage="";
    this.errorInfo.next();
  }
  setError(myError:string){
    this.error=true;
    this.errorMessage=myError;
    this.errorInfo.next();
  }


}
