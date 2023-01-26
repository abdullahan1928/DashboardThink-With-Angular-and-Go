import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import StudentFormFields from 'src/app/models/StudentFormFields';

@Injectable({
  providedIn: 'root'
})

export class StudentService implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.getStudents();
  }

  displayedColumns: string[] = StudentFormFields.map((field) => field.formControlName);

  getStudents() {
    this.displayedColumns.push('admissionDate');
    return this.http.get('http://localhost:3000/students');
  }

  newStudent(data: any) {
    return this.http.post('http://localhost:3000/students', data);
  }

  deleteStudent(id: any) {
    return this.http.delete(`http://localhost:3000/student/${id}`);
  }

  updateStudent(id: any, data: any) {
    return this.http.put(`http://localhost:3000/student/${id}`, data);
  }

  getStudent(id: any) {
    return this.http.get(`http://localhost:3000/student/${id}`);
  }
}
  