import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrDecrButtonComponent } from './incr-decr-button.component';

describe('IncrDecrButtonComponent', () => {
  let component: IncrDecrButtonComponent;
  let fixture: ComponentFixture<IncrDecrButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncrDecrButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncrDecrButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
