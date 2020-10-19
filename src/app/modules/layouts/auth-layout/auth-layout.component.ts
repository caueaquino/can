import { Component } from '@angular/core';


@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {

  public actualYear: number;

  constructor() {
    this.setActualYear();
  }

  /**
   * @description Set the actual year value to the actualYear variable.
   * @returns Void.
   */
  private setActualYear(): void {
    const actualDate = new Date();
    this.actualYear = actualDate.getFullYear();
  }
}
