/*
 Created by Ahmer Khan on 02-Mar-17.
 */

import { Routes } from '@angular/router';

import { AuthguardService } from '../services/authguard.service';

import { HomeComponent } from '../components/home/home.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { LoginComponent } from '../components/login/login.component';
import {RegisterComponent} from "../components/register/register.component";
import { ProfileComponent } from '../components/profile/profile.component';

export const clientRoutes : Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthguardService]}
];
