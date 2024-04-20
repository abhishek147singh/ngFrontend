import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-price-filter',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.scss'
})
export class PriceFilterComponent implements OnInit{
  @Input() min:number = 0;
  @Input() max:number = 0;

  @Output() onSubmitEmt = new EventEmitter<{min:number; max:number}> ();

  priceFilterForm:FormGroup = new FormGroup({
    min:new FormControl(this.min, [Validators.required]),
    max:new FormControl(this.max, [Validators.required]),
  })

  ngOnInit(): void {
    this.priceFilterForm.patchValue({
      min:this.min,
      max:this.max
    });
  }

  onSubmit(){
    const minLimit = this.priceFilterForm.get('min')?.value;
    const maxLimit = this.priceFilterForm.get('max')?.value;
    this.onSubmitEmt.emit({min:minLimit, max:maxLimit});
  }

  onClear(){
    this.priceFilterForm.patchValue({
      min:0,
      max:0
    });

    this.onSubmitEmt.emit({min:0, max:0});
  }
}
