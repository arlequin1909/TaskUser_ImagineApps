import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.errorMessage = '';

    this.authService.register({ username: this.username, email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Registro exitoso', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMessage = 'El correo electrónico ya está registrado.';
        } else {
          this.errorMessage = 'Error inesperado. Intenta nuevamente.';
          console.error('Error en registro', err);
        }

        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  
}
