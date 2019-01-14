import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BackendService } from '../../backend.service';
@Component({
  selector: 'app-orderconfirm',
  templateUrl: './orderconfirm.component.html',
  styleUrls: ['./orderconfirm.component.css']
})
export class OrderconfirmComponent implements OnInit {
  confirmed=false;
  tpagaUrl="";
  order:any;
  oId:any;
  sub: any;
  data: any;
  error=false;
  errorMessage="";
  constructor(private router: Router, private route: ActivatedRoute, private backendService: BackendService) { }

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
        if(this.order.status == "delivered")
        {
          this.confirmed = true;
        }

      });

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
      this.backendService.confirmOrder(this.oId);
      this.backendService.confirmOrder(this.oId);
    });
  }

}
