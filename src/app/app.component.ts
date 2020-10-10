import { Component } from '@angular/core';

import { CanloadingService } from 'src/app/modules/components/can-loading/can-loading.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'can';

  constructor(
    public canLoadingService: CanloadingService,
  ) { }

}
