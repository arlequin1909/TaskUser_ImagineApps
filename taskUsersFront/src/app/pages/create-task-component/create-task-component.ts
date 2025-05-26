import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  standalone: true,
  selector: 'app-create-task',
  templateUrl: './create-task-component.html',
  styleUrls: ['./create-task-component.css'],
  imports: [CommonModule, FormsModule]
})
export class CreateTaskComponent {
  title = '';
  description = '';
  errorMessage = '';
  completed = false;

  constructor(private taskService: TaskService, private router: Router) {}

  createTask() {
    const token = localStorage.getItem('auth_token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      this.errorMessage = 'No estás autenticado';
      return;
    }

    this.taskService.createTask({
      userId,
      title: this.title,
      description: this.description,
      completed: this.completed
    }, token).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => this.errorMessage = 'Error al crear la tarea'
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
