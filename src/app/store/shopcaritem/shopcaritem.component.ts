import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopcaritem',
  templateUrl: './shopcaritem.component.html',
  styleUrls: ['./shopcaritem.component.css']
})
export class ShopcaritemComponent implements OnInit {
  @Input() name: string;
  @Input() imgUrl: string;
  @Input() description: string;
  @Input() quantity: string;
  @Input() cost: string;
  @Input() idx: number;
  @Output() productRemoved = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }
  removeFromCar(){
    this.productRemoved.emit({idx : this.idx, cost: this.cost});
  }

}
