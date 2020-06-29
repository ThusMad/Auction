import { Component } from '@angular/core';
import { UserService } from './_services/user.service';
import { AuthenticationService } from './_services/authentication.service';
import { RoutingState } from './_helpers/routing.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Auction';

  constructor (private _authService: AuthenticationService, routingState: RoutingState) {
    routingState.loadRouting();
  }
}
