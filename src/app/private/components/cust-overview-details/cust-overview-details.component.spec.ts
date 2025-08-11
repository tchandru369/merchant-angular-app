import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustOverviewDetailsComponent } from './cust-overview-details.component';

describe('CustOverviewDetailsComponent', () => {
  let component: CustOverviewDetailsComponent;
  let fixture: ComponentFixture<CustOverviewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustOverviewDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustOverviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
