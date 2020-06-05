import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/authentication.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-main',
  templateUrl: 'app.component.html'
})
export class AppComponent {
    user: any;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.authenticationService.logout();
    }
}
