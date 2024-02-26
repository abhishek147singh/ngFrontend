import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProductScreenComponent } from './filter-product-screen.component';

describe('FilterProductScreenComponent', () => {
  let component: FilterProductScreenComponent;
  let fixture: ComponentFixture<FilterProductScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterProductScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterProductScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
