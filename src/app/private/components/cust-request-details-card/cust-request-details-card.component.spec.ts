import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustRequestDetailsCardComponent } from './cust-request-details-card.component';

describe('CustRequestDetailsCardComponent', () => {
  let component: CustRequestDetailsCardComponent;
  let fixture: ComponentFixture<CustRequestDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustRequestDetailsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustRequestDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
