import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../backend.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  purcahsedItems=[];
  totalShopingCar=0;
  items: any;
  myCost=0;
  error=false;
  errorMessage="";
  //Se implementa el servicio que consulta al backend
  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
  //Se realiza una subscripcion para hacer seguimientos a los errores de backend
    this.backendService.errorInfo.subscribe(
      ()=>{
        this.error = this.backendService.error;
        this.errorMessage = this.backendService.errorMessage;
      }
    );
  //Se realiza una subscripcion para seguir los cambios en la lista de items
  this.backendService.itemsUpdated.subscribe(
    ()=> {
      this.items=this.backendService.getItems();
    });
  this.backendService.getItemList();
  this.backendService.getItemList();
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
