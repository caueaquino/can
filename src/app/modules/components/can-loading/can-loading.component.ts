import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'can-loading',
  templateUrl: './can-loading.component.html',
  styleUrls: ['./can-loading.component.scss']
})
export class CanLoadingComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
  }
  
}
