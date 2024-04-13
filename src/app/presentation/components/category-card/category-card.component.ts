import { Component, Input } from '@angular/core';
import { assetsPath } from '../../../../environment';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {
  @Input() name = '';
  @Input() image = '';
  @Input() noProducts = 0;

  assestPath = assetsPath;
}
