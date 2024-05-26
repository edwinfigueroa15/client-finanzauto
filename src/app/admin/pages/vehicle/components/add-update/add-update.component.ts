import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IVehicle } from 'app/core/interfaces/vehicle.interface';
import { AuthService } from 'app/core/services/auth.service';
import { UploadService } from 'app/core/services/upload.service';
import { VehicleService } from 'app/core/services/vehicle.service';
import { InputCheckboxComponent, InputFileComponent, InputSelectComponent, InputTextComponent, TextareaComponent } from 'app/shared/components';
import { ListColor, ListYear } from 'app/shared/lists';
import Modules from 'app/shared/modules';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-update',
  templateUrl: './add-update.component.html',
  styleUrl: './add-update.component.scss',
  standalone: true,
  imports: [Modules, InputCheckboxComponent, InputFileComponent, InputTextComponent, InputSelectComponent, TextareaComponent],
})
export class AddUpdateComponent implements OnInit {
  @Input() isEdit: boolean = false;
  @Input() infoModalEdit: IVehicle | null = null;

  @Output() responseEvent = new EventEmitter<any>(undefined);

  allSubs: Subscription[] = [];
  listYear = ListYear;
  listColor = ListColor;
  
  form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('Logan', [Validators.required]),
    plate: new FormControl('XDR456', [Validators.required]),
    color: new FormControl('blue', [Validators.required]),
    brand: new FormControl('Renoult', [Validators.required]),
    line: new FormControl('Sedan', [Validators.required]),
    year: new FormControl('2019', [Validators.required]),
    kilimetres: new FormControl('80000', [Validators.required]),
    cost: new FormControl('40000000', [Validators.required]),
    image: new FormControl(''),
    clientId: new FormControl(null),
    status: new FormControl(true),
    observations: new FormControl('Observations del carro', [Validators.required]),
  })

  filesAreLoaded = signal<boolean>(false);
  files = signal<File[]>([]);
  images = signal<string[]>([]);

  errors = {
    name: {
      required: { message: 'El nombre es obligatorio' },
    },
    plate: {
      required: { message: 'La placa es obligatoria' },
    },
    color: {
      required: { message: 'El color es obligatorio' },
    },
    brand: {
      required: { message: 'La marca es obligatoria' },
    },
    line: {
      required: { message: 'La linea es obligatoria' },
    },
    year: {
      required: { message: 'El año es obligatorio' },
    },
    kilimetres: {
      required: { message: 'El kilometraje es obligatorio' },
    },
    cost: {
      required: { message: 'El costo es obligatorio' },
    },
  }
  
  private _vehicleService = inject(VehicleService);
  private _uploadService = inject(UploadService);
  private _authService = inject(AuthService);

  ngOnInit(): void {
    if(this.isEdit) {
      this.loadInfo();
    }
  }

  ngOnDestroy() {
		this.allSubs.forEach(sub => sub.unsubscribe());
	}

  closeModal() {
    this._vehicleService.showModalAddUpdateVeihcles.update(() => false);
  }

  loadInfo() {
    if(this.infoModalEdit != null) {
      this.form.patchValue(this.infoModalEdit as any);

      this.images.update(() => {
        const nameFiles = this.infoModalEdit!.image.split(",")
        const paths = nameFiles.map(name => `${environment.API_URL_PUBLIC}/${name}`)
        return paths;
      })

      this.filesAreLoaded.update(() => true);
    }
  }

  async create() {
    let paths: string = "";
    if(this.files().length) {
      paths = await this._uploadService.uploadFile(this.files());
    }

    const body = {
      ...this.form.value,
      image: paths,
      clientId: this._authService.user().id
    }

    delete body.id;

    this.allSubs[this.allSubs.length] = this._vehicleService.create(body as IVehicle).subscribe({
      next: (response) => {
        this.responseEvent.emit(response);
        this._vehicleService.showModalAddUpdateVeihcles.update(() => false);
      },
      error: (error) => {
        this.responseEvent.emit(error.error);
      }
    })
  }

  async update() {
    let paths: string = "";
    if(this.files().length) {
      paths = await this._uploadService.uploadFile(this.files());
    }

    const body = {
      ...this.form.value,
      image: paths ? paths : this.form.value.image,
      clientId: this._authService.user().id
    }

    delete body.id;

    this.allSubs[this.allSubs.length] = this._vehicleService.update(this.infoModalEdit?.id!, body as IVehicle).subscribe({
      next: (response) => {
        this.responseEvent.emit(response);
        this._vehicleService.showModalAddUpdateVeihcles.update(() => false);
      },
      error: (error) => {
        this.responseEvent.emit(error.error);
      }
    })
  }

  OnSubmit() {
    if(this.isEdit) this.update();
    else this.create();
  }

  filesSelect(files: File[]) {
    this.files.update(() => []);
    if(files.length === 0) {
      if(this.form.controls.image.value) {
        this.filesAreLoaded.update(() => true);
      } else {
        this.filesAreLoaded.update(() => false);
      }
      return
    }
    this.filesAreLoaded.update(() => true);
    this.files.update(() => files);
  }
}
