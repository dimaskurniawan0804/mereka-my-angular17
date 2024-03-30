import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
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
  constructor(
    private authService: AuthService,
    private navigationService: NavigationService,
    private cookieService: SsrCookieService,
    private snackbar: MatSnackBar,
    private formBuilder: UntypedFormBuilder
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
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.formChangesSubs.unsubscribe();
  }

  openSnackBar(message: string, action: string, duration: number = 2000) {
    return new Promise((resolve) => {
      const config = new MatSnackBarConfig();
      config.verticalPosition = 'top';
      config.duration = duration;
      let snackBar = this.snackbar.open(message, action, config);
      snackBar.afterDismissed().subscribe({
        next: () => resolve(''),
        complete: () => resolve(''),
      });
    });
  }

  submitLogin() {
    const emailControl = this.userForm.get('email');
    const email = emailControl ? emailControl.value : '';
    const passwordControl = this.userForm.get('password');
    const password = passwordControl ? passwordControl.value : '';

    this.authService.signIn(email, password).subscribe({
      next: (res) => {
        console.log(res);
        this.cookieService.set('user_uid', res.user._delegate.uid);
        this.authService.updateIsLoggedIn(true);
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

  removeEmail() {
    this.f['email'].setValue('');
  }
}
