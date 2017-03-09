import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateNewUserForm (newUserData) {
    if (newUserData.FullName == undefined || newUserData.UserEmail == undefined || newUserData.UserName == undefined || newUserData.UserPassword == undefined) {
      return false;
    }
    else {
      return true;
    }
  };

  validateNewUserEmail (UserEmail) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(UserEmail);
  };

}
