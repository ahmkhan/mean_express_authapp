import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  FullName: string;
  UserEmail: string;
  UserName: string;
  UserPassword: string;

  constructor(private validateService: ValidateService, private authService: AuthenticationService, private router: Router, private flashMessages: FlashMessagesService) {

  }

  ngOnInit() {
  }

  registerNewUser () {
    const newUserData = {
      FullName: this.FullName,
      UserEmail: this.UserEmail,
      UserName: this.UserName,
      UserPassword: this.UserPassword
    }

    //Required All Fields

    if (!this.validateService.validateNewUserForm(newUserData)) {
      this.flashMessages.show('Please Fill all the required Fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    };

    if (!this.validateService.validateNewUserEmail(newUserData.UserEmail)) {
      this.flashMessages.show('Please Fill Valid Email Address', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    };

    //Save New User to Database
    this.authService.registerNewUserToDatabase(newUserData)
    .subscribe(successData => {
      if (successData.message) {
        this.flashMessages.show('You are now Registered, you can Login now', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      }
      else {
        this.flashMessages.show('You are not Registered, something went wrong!!!!', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    })
  };

}
