import { Component } from '@angular/core';
import Modules from 'app/shared/modules';
import { InputTextComponent } from 'app/shared/components';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [Modules, InputTextComponent],
})
export default class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  errors = {
    email: {
      required: { message: 'El correo es obligatorio' },
      email: { message: 'El correo es incorreto' },
    },
    password: {
      required: { message: 'La contraseña es obligatoria' },
    }
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
