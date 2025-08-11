import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustCardSliderComponent } from './cust-card-slider.component';

describe('CustCardSliderComponent', () => {
  let component: CustCardSliderComponent;
  let fixture: ComponentFixture<CustCardSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustCardSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustCardSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
