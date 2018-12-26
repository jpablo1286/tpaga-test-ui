import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-orderconfirm',
  templateUrl: './orderconfirm.component.html',
  styleUrls: ['./orderconfirm.component.css']
})
export class OrderconfirmComponent implements OnInit {
  confirmed=false;
  urlBase="http://192.168.1.172:8000/";
  tpagaUrl="";
  order:any;
  oId:any;
  sub: any;
  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {


  }

  goHome(){
    this.router.navigate(['/']);
  }
  pagar(){
    window.location.href=this.tpagaUrl;
  }
  confirmOrder()
  {
    this.sub = this.route.params.subscribe(params => {
    this.oId = params['oId'];

    this.httpClient.post(this.urlBase + 'order/confirm/'+ this.oId,{}).subscribe((res)=>{
        this.order=res;
        this.tpagaUrl = this.order.tpagaPaymentUrl;
        if(this.order.status == "delivered")
        {
          this.confirmed = true;
        }
        });

    });
  }

}
