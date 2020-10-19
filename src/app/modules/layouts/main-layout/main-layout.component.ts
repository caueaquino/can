import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  private readonly HOME = 'home';
  private readonly VIDEOS = 'videos';
  private readonly PROFILE = 'profile';

  public isSideNavVisible = false;

  constructor(
    public router: Router,
    public authService: AuthService,
  ) { }

  public get activeRoute(): string {
    if (this.router.url.includes(this.HOME)) {
      return 'Home';
    } else if (this.router.url.includes(this.VIDEOS)) {
      return 'Videos';
    } else if (this.router.url.includes(this.PROFILE)) {
      return 'Profile';
    }
  }

  public changeSideNavVisibility(): void {
    this.isSideNavVisible = !this.isSideNavVisible;
  }

  public openProfile(): void {
    const userId = 1;
    this.router.navigate([`/can/profile/${userId}`]);
  }
}
