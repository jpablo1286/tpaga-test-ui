import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './store/main/main.component';
import { OrderComponent } from './store/order/order.component';
import { OrderconfirmComponent } from './store/orderconfirm/orderconfirm.component';
import { OrdersComponent } from './admin/orders/orders.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'order/:oId', component: OrderComponent },
  { path: 'admin', component: OrdersComponent },
  { path: 'orderconfirm/:oId', component: OrderconfirmComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
