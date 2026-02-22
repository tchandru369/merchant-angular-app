import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustVerifyPymntListComponent } from './cust-verify-pymnt-list.component';

describe('CustVerifyPymntListComponent', () => {
  let component: CustVerifyPymntListComponent;
  let fixture: ComponentFixture<CustVerifyPymntListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustVerifyPymntListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustVerifyPymntListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
