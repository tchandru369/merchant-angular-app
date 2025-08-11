import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustOrderPaymentListComponent } from './cust-order-payment-list.component';

describe('CustOrderPaymentListComponent', () => {
  let component: CustOrderPaymentListComponent;
  let fixture: ComponentFixture<CustOrderPaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustOrderPaymentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustOrderPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
