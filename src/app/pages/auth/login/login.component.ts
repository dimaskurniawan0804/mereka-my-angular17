import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from '../../../../services/navigation-service/navigation.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { SignInService } from '../../../../services/auth-service/signIn.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string;
  password: string;
  hide: boolean;
  userForm: UntypedFormGroup;
  disableSubmit: boolean;
  formChangesSubs: Subscription;
  signInSubs: Subscription;
  snackBarSubs: Subscription;
  constructor(
    private navigationService: NavigationService,
    private cookieService: SsrCookieService,
    private snackbar: MatSnackBar,
    private formBuilder: UntypedFormBuilder,
    private signInService: SignInService
  ) {
    this.email = '';
    this.password = '';
    this.hide = false;
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.disableSubmit = true;
    this.formChangesSubs = this.userForm.valueChanges.subscribe(() => {
      if (!this.userForm.invalid) {
        this.disableSubmit = false;
      } else {
        this.disableSubmit = true;
      }
    });
    this.signInSubs = new Subscription();
    this.snackBarSubs = new Subscription();
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.formChangesSubs.unsubscribe();
    this.signInSubs.unsubscribe();
    this.snackBarSubs.unsubscribe();
  }

  openSnackBar(message: string, action: string, duration: number = 2000) {
    return new Promise((resolve) => {
      const config = new MatSnackBarConfig();
      config.verticalPosition = 'top';
      config.duration = duration;
      let snackBar = this.snackbar.open(message, action, config);
      this.snackBarSubs.add(
        snackBar.afterDismissed().subscribe({
          next: () => resolve(''),
          complete: () => resolve(''),
        })
      );
    });
  }

  submitLogin() {
    const emailControl = this.userForm.get('email');
    const email = emailControl ? emailControl.value : '';
    const passwordControl = this.userForm.get('password');
    const password = passwordControl ? passwordControl.value : '';

    this.signInSubs = this.signInService.signIn(email, password).subscribe({
      next: (res) => {
        console.log(res);
        this.cookieService.set('user_uid', res.user._delegate.uid);
        this.signInService.updateIsLoggedIn(true);
        this.cookieService.set(
          'user_displayName',
          res.user._delegate.displayName
        );

        this.openSnackBar('Login Success', 'ok!', 2000).then(() => {
          this.navigationService.navigateByUrlTree(['/todo']);
        });
      },
      error: (err) => {
        this.openSnackBar('Invalid Email or Password', 'ok!', 2000);
      },
    });
  }

  get f() {
    return this.userForm.controls;
  }

  directToRegister() {
    this.navigationService.navigateByUrlTree(['/register']);
  }

  removeEmail() {
    this.f['email'].setValue('');
  }
}
