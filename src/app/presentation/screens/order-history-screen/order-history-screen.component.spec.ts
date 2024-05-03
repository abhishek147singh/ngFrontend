import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryScreenComponent } from './order-history-screen.component';

describe('OrderHistoryScreenComponent', () => {
  let component: OrderHistoryScreenComponent;
  let fixture: ComponentFixture<OrderHistoryScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHistoryScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderHistoryScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
