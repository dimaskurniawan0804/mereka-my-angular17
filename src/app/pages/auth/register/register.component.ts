import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationService } from '../../../../services/navigation-service/navigation.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { SignUpService } from '../../../../services/auth-service/signUp.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  email: string;
  password: string;
  hide: boolean;
  userForm: UntypedFormGroup;
  disableSubmit: boolean;
  formChangesSubs: Subscription;
  registerSubs: Subscription;
  snackBarSubs: Subscription;
  constructor(
    private navigationService: NavigationService,
    private snackbar: MatSnackBar,
    private formBuilder: UntypedFormBuilder,
    private signUpService: SignUpService
  ) {
    this.email = '';
    this.password = '';
    this.hide = false;
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      displayname: ['', Validators.required],
    });
    this.disableSubmit = true;
    this.formChangesSubs = this.userForm.valueChanges.subscribe(() => {
      if (!this.userForm.invalid) {
        this.disableSubmit = false;
      } else {
        this.disableSubmit = true;
      }
    });
    this.registerSubs = new Subscription();
    this.snackBarSubs = new Subscription();
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.formChangesSubs.unsubscribe();
    this.registerSubs.unsubscribe();
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

  submitRegister() {
    const displaynameControl = this.userForm.get('displayname');
    const displayname = displaynameControl ? displaynameControl.value : '';
    const emailControl = this.userForm.get('email');
    const email = emailControl ? emailControl.value : '';
    const passwordControl = this.userForm.get('password');
    const password = passwordControl ? passwordControl.value : '';

    this.registerSubs = this.signUpService.signUp(email, password).subscribe({
      next: (result) => {
        result.user.updateProfile({ displayName: displayname });
        let snackBarShow = this.snackbar.open(
          'Success! You will direct to Login Page',
          'ok!',
          {
            duration: 2000,
          }
        );
        snackBarShow.afterDismissed().subscribe({
          next: () => {
            this.navigationService.navigateByUrlTree(['/login']);
          },
        });
      },
      error: (err) => window.alert(err.message),
    });
  }

  directToLogin() {
    this.navigationService.navigateByUrlTree(['/login']);
  }

  get f() {
    return this.userForm.controls;
  }

  removeField(field: string) {
    if (field === 'email') {
      this.f['email'].setValue('');
    }
    if (field === 'displayname') {
      this.f['displayname'].setValue('');
    }
  }
}
