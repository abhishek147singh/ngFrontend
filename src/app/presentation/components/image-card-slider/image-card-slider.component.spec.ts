import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCardSliderComponent } from './image-card-slider.component';

describe('ImageCardSliderComponent', () => {
  let component: ImageCardSliderComponent;
  let fixture: ComponentFixture<ImageCardSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCardSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageCardSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
