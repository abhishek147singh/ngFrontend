import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incr-decr-button',
  standalone: true,
  imports: [],
  templateUrl: './incr-decr-button.component.html',
  styleUrl: './incr-decr-button.component.scss'
})

export class IncrDecrButtonComponent {
  @Input() count:number = 0;
  @Output() incrementEmt = new EventEmitter<void> ();
  @Output() decrementEmt = new EventEmitter<void> ();

  onIncrement(){
    this.incrementEmt.emit();
  }

  onDecrement(){
    this.decrementEmt.emit();
  }

}
