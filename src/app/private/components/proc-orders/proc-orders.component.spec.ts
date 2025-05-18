import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcOrdersComponent } from './proc-orders.component';

describe('ProcOrdersComponent', () => {
  let component: ProcOrdersComponent;
  let fixture: ComponentFixture<ProcOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
