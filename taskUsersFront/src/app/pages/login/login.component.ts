import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.errorMessage = '';
  
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login exitoso', response);
  
        const token = response.token;
        const userId = response.user?.id;
  
        if (token && userId) {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('userId', userId);
        }
  
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMessage = 'Usuario o contraseña inválidos';
        } else {
          this.errorMessage = 'Error inesperado. Intenta de nuevo más tarde.';
          console.error('Error en login', err);
        }
        setTimeout(() => {
          this.errorMessage = '';
        }, 4000);
      },
    });
  }
  
  
  goToRegister() {
    this.router.navigate(['/register']);
  }
  
  
}
