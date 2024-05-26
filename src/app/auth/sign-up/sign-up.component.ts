import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Modules from 'app/shared/modules';
import { InputTextComponent } from 'app/shared/components';
import { AuthService } from 'app/core/services/auth.service';
import { UtilsService } from 'app/shared/utils/utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [Modules, InputTextComponent],
})
export default class SignUpComponent {
  allSubs: Subscription[] = [];
  
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  errors = {
    name: {
      required: { message: 'El nombre es obligatorio' },
    },
    email: {
      required: { message: 'El correo es obligatorio' },
      email: { message: 'El correo es incorreto' },
    },
    password: {
      required: { message: 'La contraseña es obligatoria' },
    }
  }

  private _authService = inject(AuthService);
  private _utilsService = inject(UtilsService);

  ngOnDestroy() {
		this.allSubs.forEach(sub => sub.unsubscribe());
	}

  onSubmit() {
    this.allSubs[this.allSubs.length] = this._authService.signUp(this.form.value as any).subscribe({
      next: (response: any) => {
        this._authService.decodeJwt(response.data);
        localStorage.setItem('client_token', response.data);
        this._utilsService.routerLink('/admin');
      },
      error: (error) => {
        console.log(error.error);
      }
    })
  }
}
