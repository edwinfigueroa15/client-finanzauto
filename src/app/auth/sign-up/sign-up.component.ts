import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Modules from 'app/shared/modules';
import { InputTextComponent } from 'app/shared/components';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [Modules, InputTextComponent],
})
export default class SignUpComponent {
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

  onSubmit() {
    console.log(this.form.value);
  }
}
