import { Component, OnInit, inject, signal } from '@angular/core';
import Modules from 'app/shared/modules';
import { BreadCrumbsComponent, TableComponent } from 'app/shared/components';
import { VehicleService } from 'app/core/services/vehicle.service';
import { Subscription } from 'rxjs';
import { AddUpdateComponent } from './components/add-update/add-update.component';
import { IVehicle } from 'app/core/interfaces/vehicle.interface';
import Swal from 'sweetalert2'
import { UploadService } from 'app/core/services/upload.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss',
  standalone: true,
  imports: [Modules, BreadCrumbsComponent, TableComponent, AddUpdateComponent],
})
export default class HotelComponent implements OnInit {
  isEditVehicle = signal(false);
  infoModalEdit = signal<IVehicle | null>(null);
  search: string = "";

  allSubs: Subscription[] = [];
  
  showActionsTable = { edit: true, delete: true };
  nameHeaderColumns: string[] = ['Nombre', 'Placa', 'Año', 'Color', 'Costo', 'Estado'];
  keyBodyData: string[] = ['name', 'plate', 'year', 'color', 'cost', 'status'];
  dataBodyTable: any[] = [];
  paginator = signal({ show: true, currentPage: 1, pageSize: 5, totalPage: 1 })

  protected _vehicleService = inject(VehicleService);
  protected _uploadService = inject(UploadService);

  ngOnInit(): void {
    this.getAll();
  }

  ngOnDestroy() {
		this.allSubs.forEach(sub => sub.unsubscribe());
	}

  searchChange() {
    this.paginator.update(currentValue => {
      currentValue.show = false;
      return currentValue;
    });

    if(this.search == '') {
      this.getAll();

    } else {
      const queryParams = {
        search: this.search,
        pageIndex: this.paginator().currentPage,
        pageSize: this.paginator().pageSize,
      }
  
      this.allSubs[this.allSubs.length] = this._vehicleService.getAll(queryParams).subscribe({
        next: (response: any) => {
          this.paginator.update((currentValue) => {
            currentValue.show = true;
            currentValue.totalPage = Math.ceil(response.length / this.paginator().pageSize)
            return currentValue;
          })
          this.dataBodyTable = response.data;
        },
        error: (error: any) => {
          console.log(error.error);
        }
      })
    }
  }

  getAll() {
    this.paginator.update(currentValue => {
      currentValue.show = false;
      return currentValue;
    });
    
    const queryParams = {
      search: '',
      pageIndex: this.paginator().currentPage,
      pageSize: this.paginator().pageSize,
    }

    this.allSubs[this.allSubs.length] = this._vehicleService.getAll(queryParams).subscribe({
      next: (response: any) => {
        this.paginator.update((currentValue) => {
          currentValue.show = true;
          currentValue.totalPage = Math.ceil(response.length / this.paginator().pageSize)
          return currentValue;
        })
        this.dataBodyTable = response.data;
      },
      error: (error: any) => {
        console.log(error.error);
      }
    })
  }

  openModal() {
    this.isEditVehicle.update(() => false);
    this.infoModalEdit.update(() => null);
    this._vehicleService.showModalAddUpdateVeihcles.update(() => true);
  }

  responseAddUpdate(event: any) {
    if(event.status == "success") this.getAll();
  }

  editEvent(event: IVehicle) {
    this.isEditVehicle.update(() => true);
    this.infoModalEdit.update(() => event);
    this._vehicleService.showModalAddUpdateVeihcles.update(() => true);
  }

  deleteEvent(event: any) {
    Swal.fire({
      title: "Está seguro?",
      text: "Esta acción sera permanente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.allSubs[this.allSubs.length] = this._vehicleService.delete(event.id).subscribe({
          next: (response) => this.getAll(),
          error: (error: any) => console.log(error.error),
        })

        event.image.split(",").forEach((nameFile: string) => {
          this.allSubs[this.allSubs.length] = this._uploadService.deleteFile(nameFile).subscribe({
            next: (response) => {},
            error: (error: any) => console.log(error.error),
          })
        })
      }
    });
  }
  
}
