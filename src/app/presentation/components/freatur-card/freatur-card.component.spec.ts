import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreaturCardComponent } from './freatur-card.component';

describe('FreaturCardComponent', () => {
  let component: FreaturCardComponent;
  let fixture: ComponentFixture<FreaturCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreaturCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreaturCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
