import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  searchText = '';
  showModal = false;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('auth_token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) return;

    this.taskService.getTasks(userId, token).subscribe({
      next: (data) => {
        this.tasks = data.tasks;  
        this.applyFilter();
      },
      error: (err) => {
        console.error('Error al obtener tareas:', err);
      }
    });
  }

  applyFilter() {
    const search = this.searchText.toLowerCase();
    this.filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(search) ||
      task.description.toLowerCase().includes(search)
    );
  }

  onSearchChange() {
    this.applyFilter();
  }
  
  goToCreateTask() {
    this.router.navigate(['/create-task']);
  }

  deleteTask(taskId: string) {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      return; 
    }

    this.taskService.deleteTask(taskId, token).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task._id !== taskId);
        this.applyFilter(); 
      },
      error: (err) => {
        console.error('Error al eliminar tarea:', err);
        alert('No se pudo eliminar la tarea. Intenta de nuevo.');
      }
    });
  }

  updateTask(task: any) {
    const token = localStorage.getItem('auth_token');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) {
      console.error('No estás autenticado');
      return;
    }

    const updatedTask = {
      userId: userId,
      title: task.title,
      description: task.description,
      completed: !task.completed
    };

    this.taskService.updateTask(task._id, updatedTask, token).subscribe({
      next: () => {
        this.showModal = true;          
        setTimeout(() => this.showModal = false, 1000);  
        this.ngOnInit();                  
      },
      error: (err) => {
        console.error('Error al actualizar estado de tarea:', err);
      }
    });
  }
  
}
