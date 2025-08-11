import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustRequestStatusComponent } from './cust-request-status.component';

describe('CustRequestStatusComponent', () => {
  let component: CustRequestStatusComponent;
  let fixture: ComponentFixture<CustRequestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustRequestStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
