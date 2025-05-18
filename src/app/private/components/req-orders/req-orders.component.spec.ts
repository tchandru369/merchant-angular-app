import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqOrdersComponent } from './req-orders.component';

describe('ReqOrdersComponent', () => {
  let component: ReqOrdersComponent;
  let fixture: ComponentFixture<ReqOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReqOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
