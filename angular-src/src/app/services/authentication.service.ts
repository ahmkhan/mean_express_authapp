import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  authToken: any;
  authUserData: any;
  showUserFullNameInNavBar: Subject<any>;

  constructor(private http: Http) {
    this.showUserFullNameInNavBar = new Subject();
  }


  //REGISTER NEW USER
  registerNewUserToDatabase (newUserData) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/register', newUserData, {headers: headers}) //(without heroku use this) http://localhost:3000/users/register
    .map(res => res.json());
  };
  //REGISTER NEW USER


  //LOGIN USER
  authenticateAndLoginUser (loginUserData) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/authenticate', loginUserData, {headers: headers})  //(without heroku use this) http://localhost:3000/users/authenticate
      .map(res => res.json());
  };
  //LOGIN USER


  //STORE LOGIN USER DATA TO LOCAL STORAGE
  storeLoginDataToLocalStorage (loginToken, loginUserData) {
    localStorage.setItem('id_token', loginToken);
    localStorage.setItem('loginUserData', JSON.stringify(loginUserData));
    this.authToken = loginToken;
    this.authUserData = loginUserData;
    this.showUserFullNameInNavBar.next(loginUserData);
  };
  //STORE LOGIN USER DATA TO LOCAL STORAGE


  //LOGOUT USER
  logoutUser () {
    this.authToken = null;
    this.authUserData = null;
    localStorage.clear();
  };
  //LOGOUT USER


  //GET USER PROFILE
  gerUserProfile () {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('users/profile', {headers: headers})    //(without heroku use this) http://localhost:3000/users/profile
      .map(res => res.json());
  };

  loadToken () {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  };
  //GET USER PROFILE


  //FOR NAVBAR BUTTONS
  loggedIn () {
    return tokenNotExpired();
  };

  showUserFullNameInNavBarSubject () {
    return this.showUserFullNameInNavBar;
  };
  //FOR NAVBAR BUTTONS


}
