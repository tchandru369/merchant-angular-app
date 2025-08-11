import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustMakePaymentComponent } from './cust-make-payment.component';

describe('CustMakePaymentComponent', () => {
  let component: CustMakePaymentComponent;
  let fixture: ComponentFixture<CustMakePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustMakePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustMakePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
