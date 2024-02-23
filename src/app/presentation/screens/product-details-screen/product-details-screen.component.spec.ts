import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsScreenComponent } from './product-details-screen.component';

describe('ProductDetailsScreenComponent', () => {
  let component: ProductDetailsScreenComponent;
  let fixture: ComponentFixture<ProductDetailsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductDetailsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
