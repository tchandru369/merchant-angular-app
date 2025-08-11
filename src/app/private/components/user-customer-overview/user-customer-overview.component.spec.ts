import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCustomerOverviewComponent } from './user-customer-overview.component';

describe('UserCustomerOverviewComponent', () => {
  let component: UserCustomerOverviewComponent;
  let fixture: ComponentFixture<UserCustomerOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCustomerOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCustomerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
