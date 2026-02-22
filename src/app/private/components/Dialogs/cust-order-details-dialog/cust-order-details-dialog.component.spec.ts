import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustOrderDetailsDialogComponent } from './cust-order-details-dialog.component';

describe('CustOrderDetailsDialogComponent', () => {
  let component: CustOrderDetailsDialogComponent;
  let fixture: ComponentFixture<CustOrderDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustOrderDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustOrderDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
