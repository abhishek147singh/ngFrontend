import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOrderScreenComponent } from './place-order-screen.component';

describe('PlaceOrderScreenComponent', () => {
  let component: PlaceOrderScreenComponent;
  let fixture: ComponentFixture<PlaceOrderScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceOrderScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaceOrderScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
