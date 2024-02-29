import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingScreenComponent } from './shipping-screen.component';

describe('ShippingScreenComponent', () => {
  let component: ShippingScreenComponent;
  let fixture: ComponentFixture<ShippingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShippingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
