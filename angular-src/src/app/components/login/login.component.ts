import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  UserName: string;
  UserPassword: string;

  constructor(private authService: AuthenticationService, private router: Router, private flashMessages: FlashMessagesService) { }

  ngOnInit() {
  }

  loginUser () {
    const loginUserData = {
      UserName: this.UserName,
      UserPassword: this.UserPassword
    }

    this.authService.authenticateAndLoginUser(loginUserData)
    .subscribe(loginSuccessData => {

      if (loginSuccessData.status) {
        this.authService.storeLoginDataToLocalStorage(loginSuccessData.token, loginSuccessData.userData);
        this.flashMessages.show('You are successfully Logged In', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard']);
      }

      else {
        if (loginSuccessData.message == 'User Not Found') {
          this.flashMessages.show('User Not Found, Please Enter correct Username!!!', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/login']);
        }
        if (loginSuccessData.message == 'Wrong Password!!!!') {
          this.flashMessages.show('Wrong Password, Please Enter correct Password!!!!', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/login']);
        }
      }
    })
  };

}
