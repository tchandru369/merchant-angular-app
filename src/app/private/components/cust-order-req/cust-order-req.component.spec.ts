import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustOrderReqComponent } from './cust-order-req.component';

describe('CustOrderReqComponent', () => {
  let component: CustOrderReqComponent;
  let fixture: ComponentFixture<CustOrderReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustOrderReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustOrderReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
