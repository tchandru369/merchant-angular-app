import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustSettingsComponent } from './cust-settings.component';

describe('CustSettingsComponent', () => {
  let component: CustSettingsComponent;
  let fixture: ComponentFixture<CustSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
