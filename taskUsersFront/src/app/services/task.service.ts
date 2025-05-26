import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root' 
})
export class TaskService {

  constructor(private http: HttpClient) {}

  getTasks(userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${environment.apiUrl}/task/${userId}`, { headers });
  }

  deleteTask(taskId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${environment.apiUrl}/task/${taskId}`, { headers });
  }

  createTask(taskData: any, token: string) {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  
    return this.http.post(`${environment.apiUrl}/task/`, taskData, { headers });
  }

  updateTask(taskId: string, taskData: any, token: string) {
    return this.http.put<any>(`${environment.apiUrl}/task/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
}
