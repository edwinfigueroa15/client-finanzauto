import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import Modules from 'app/shared/modules';
import { UtilsService } from 'app/shared/utils/utils.service';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  standalone: true,
  imports: [Modules]
})
export class InputFileComponent implements OnInit {
  nameError: string = '';
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label!: string;
  @Input() value: any = null;
  @Input() errors: any = {};
  
  constructor() { }

  ngOnInit() { }

  getKeyError(value: any) {
    if(value != null) this.nameError = Object.keys(value)[0];
    else this.nameError = "";
    return this.nameError;
  }
}
