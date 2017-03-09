import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showUserNameInNavBar: string;

  constructor(private authService: AuthenticationService, private router: Router, private flashMessages: FlashMessagesService) {

    this.authService.showUserFullNameInNavBarSubject()
      .subscribe(getFullNameForNavBar => {
        this.showUserNameInNavBar = getFullNameForNavBar;
      });

    if (this.authService.loggedIn()) {
      this.showUserNameInNavBar = JSON.parse(localStorage.getItem('loginUserData'));
    }

  }

  ngOnInit() {

  }

  logoutUser () {
    this.authService.logoutUser();
    this.flashMessages.show('You are successfully Logged Out', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  };

}
