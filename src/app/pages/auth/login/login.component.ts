import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  hide: boolean;

  constructor(private authService: AuthService) {
    this.email = '';
    this.password = '';
    this.hide = false;
  }

  ngOnInit(): void {
    // this.hide = true;
    // this.authService.signUp('yahaudin@mail.com', 'yaha1234!');
  }

  submitLogin() {
    console.log(this.email, this.password, 'submitLogin');
    this.authService.signIn(this.email, this.password).subscribe({
      next: () => {
        sessionStorage.setItem('email', this.email);
      },
    });
  }
}
