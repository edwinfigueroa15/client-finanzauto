import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
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
  
  @Input({ required: true }) label!: string;
  @Input() images = signal<string[]>([]);
  
  @Output() filesSelectEvent = new EventEmitter<File[]>();

  constructor() { }
  ngOnInit() { }

  upload(event: any) {
    this.images.update(value => []);
    const files: File[] = event.target.files;
    
    if(files.length == 0) {
      this.filesSelectEvent.emit(files);
      return;
    };

    Array.from(files).forEach(file => {
      this.images.update(value => [...value, URL.createObjectURL(file)]);
    })

    this.filesSelectEvent.emit(files);
  }
}
