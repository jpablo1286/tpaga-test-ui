import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopcaritemComponent } from './shopcaritem.component';

describe('ShopcaritemComponent', () => {
  let component: ShopcaritemComponent;
  let fixture: ComponentFixture<ShopcaritemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopcaritemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopcaritemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
