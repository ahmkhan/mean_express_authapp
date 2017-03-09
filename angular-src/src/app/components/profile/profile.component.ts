import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loginUserProfile: Object;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authService.gerUserProfile()
    .subscribe(userProfile => {
      this.loginUserProfile = userProfile.user;
    },
    err => {
      console.log('error is ' + err);
      return false;
    })
  };

}
