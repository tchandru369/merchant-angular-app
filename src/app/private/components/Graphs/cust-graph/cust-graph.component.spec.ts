import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustGraphComponent } from './cust-graph.component';

describe('CustGraphComponent', () => {
  let component: CustGraphComponent;
  let fixture: ComponentFixture<CustGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
