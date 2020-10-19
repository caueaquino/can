import { Component } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent {

  public emailControl: FormControl;
  public isAuthErrorActive: boolean;

  constructor() {
    this.emailControl = new FormControl(null);
    this.emailControl.setValidators([Validators.required, Validators.email]);
  }

  get email(): AbstractControl {
    return this.emailControl;
  }

  public doRecover(): void {
    if (this.emailControl.invalid) {
      this.isAuthErrorActive = true;
      return;
    }
    alert(this.email.value);
  }
}
