import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  urlBase="http://192.168.1.172:8000/";
  purcahsedItems=[];
  totalShopingCar=0;
  items: any;
  myCost=0;
  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient.get(this.urlBase +'item/list').subscribe((res)=>{
    this.items=res;

  });
    this.httpClient.get(this.urlBase +'item/list').subscribe((res)=>{
      this.items=res;

  });
  }

  AddItemToCar($event,id: number, name: string, description: string, quantity: number, cost: number, imgUrl: string){
    this.myCost=cost * $event.quantity
    this.totalShopingCar=this.totalShopingCar + this.myCost;
    this.purcahsedItems.push({"id": id, "name":name, "quantity":$event.quantity, "description": description, "cost": this.myCost, "imgUrl": imgUrl});
  }
  removeItem($event){
    this.totalShopingCar= this.totalShopingCar - $event.cost;
    this.purcahsedItems.splice($event.idx,1);
  }

}
