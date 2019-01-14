import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainComponent } from './store/main/main.component';
import { ItemComponent } from './store/item/item.component';
import { ShopcarComponent } from './store/shopcar/shopcar.component';
import { ShopcaritemComponent } from './store/shopcaritem/shopcaritem.component';
import { OrderComponent } from './store/order/order.component';
import { OrderconfirmComponent } from './store/orderconfirm/orderconfirm.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { OrderitemComponent } from './admin/orderitem/orderitem.component';
import { BackendService } from './backend.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ItemComponent,
    ShopcarComponent,
    ShopcaritemComponent,
    OrderComponent,
    OrderconfirmComponent,
    OrdersComponent,
    OrderitemComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    BackendService,
    HttpClient

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
