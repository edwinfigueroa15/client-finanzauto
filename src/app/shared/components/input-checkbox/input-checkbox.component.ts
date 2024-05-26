import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Modules from 'app/shared/modules';

@Component({
  selector: 'app-input-checkbox',
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss'],
  standalone: true,
  imports: [Modules]
})
export class InputCheckboxComponent implements OnInit {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label!: string;
  @Input() value: boolean = false;
  
  constructor() { }

  ngOnInit() { }
}
