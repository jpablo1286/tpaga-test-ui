import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-orderitem',
  templateUrl: './orderitem.component.html',
  styleUrls: ['./orderitem.component.css']
})
export class OrderitemComponent implements OnInit {
  @Input() id: number;
  @Input() status: string;
  @Input() token: string;
  @Input() cost: number;
  @Output() productRefunded = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  refund()
  {
    this.productRefunded.emit({orderId : this.id});
  }

}
