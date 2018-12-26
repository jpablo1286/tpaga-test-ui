import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() imgUrl: string;
  @Input() description: string;
  @Input() price: string;
  @Output() productAdded = new EventEmitter();
  productQuantity = 1;
  constructor() { }

  ngOnInit() {
  }
  increaseQuantity(){
    this.productQuantity = this.productQuantity + 1
  }
  decreaseQuantity(){
    if(this.productQuantity > 1)
    {
      this.productQuantity = this.productQuantity - 1
    }
  }
  addToCar(){
    this.productAdded.emit({quantity : this.productQuantity});
  }

}
