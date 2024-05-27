import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISale } from 'app/core/interfaces/sale.interface';
import { IVehicle } from 'app/core/interfaces/vehicle.interface';
import { SaleService } from 'app/core/services/sale.service';
import { InputTextComponent } from 'app/shared/components';
import Modules from 'app/shared/modules';
import { UtilsService } from 'app/shared/utils/utils.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-buy-vehicle',
  templateUrl: './buy-vehicle.component.html',
  styleUrl: './buy-vehicle.component.scss',
  standalone: true,
  imports: [Modules, InputTextComponent],
})
export class BuyVehicleComponent implements OnInit {
  @Input() infoModal: IVehicle | null = null;
  @Output() responseEvent = new EventEmitter<any>(undefined);

  allSubs: Subscription[] = [];
  
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    vehicleId: new FormControl(0),
    status: new FormControl(true),
  })

  errors = {
    name: {
      required: { message: 'El nombre es obligatorio' },
    },
    document: {
      required: { message: 'El número de documento es obligatorio' },
    },
    phone: {
      required: { message: 'El celular es obligatorio' },
    },
    email: {
      required: { message: 'El correo es obligatorio' },
      email: { message: 'El correo es incorreto' },
    }
  }
  
  private _saleService = inject(SaleService);
  private _utilsService = inject(UtilsService);
  ngOnInit(): void {}

  ngOnDestroy() {
		this.allSubs.forEach(sub => sub.unsubscribe());
	}

  closeModal() {
    this._saleService.showModalBuy.update(() => false);
  }

  OnSubmit() {
    this.form.controls.vehicleId.setValue(this.infoModal!.id as number);

    this.allSubs[this.allSubs.length] = this._saleService.create(this.form.value as ISale).subscribe({
      next: (response) => {
        this.responseEvent.emit(response);
        this._saleService.showModalBuy.update(() => false);
        this._utilsService.routerLink('client')
        Swal.fire({
          title: "Gracias",
          text: "Pronto un asesor se pondrá en contacto contigo",
          icon: "success"
        });
      },
      error: (error) => {
        this.responseEvent.emit(error.error);
      }
    })
  }

}
