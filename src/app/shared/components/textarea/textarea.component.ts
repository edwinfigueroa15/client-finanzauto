import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import Modules from 'app/shared/modules';
import { UtilsService } from 'app/shared/utils/utils.service';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  standalone: true,
  imports: [Modules]
})
export class TextareaComponent implements OnInit {
  nameError: string = '';
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label!: string;
  @Input() row: string = '5';
  @Input() col: string = '';
  @Input() placeholder: string = '';
  @Input() errors: any = {};
  
  constructor() { }

  ngOnInit() { }

  getKeyError(value: any) {
    if(value != null) this.nameError = Object.keys(value)[0];
    else this.nameError = "";
    return this.nameError;
  }
}
