import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustPlaceOrderComponent } from './cust-place-order.component';

describe('CustPlaceOrderComponent', () => {
  let component: CustPlaceOrderComponent;
  let fixture: ComponentFixture<CustPlaceOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustPlaceOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustPlaceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
