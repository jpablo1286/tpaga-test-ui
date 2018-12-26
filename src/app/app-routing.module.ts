import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './store/main/main.component';
import { OrderComponent } from './store/order/order.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'order/:oId', component: OrderComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
