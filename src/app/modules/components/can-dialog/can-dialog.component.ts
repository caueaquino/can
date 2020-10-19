import { Component, OnInit } from '@angular/core';

import { Ngxalert } from 'ngx-dialogs';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'can-dialog',
  templateUrl: './can-dialog.component.html',
  styleUrls: ['./can-dialog.component.scss']
})
export class CanDialogComponent implements OnInit {

  private alert: Ngxalert = new Ngxalert();

  constructor() { }

  public ngOnInit(): void {
  }



}
