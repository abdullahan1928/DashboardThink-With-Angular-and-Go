import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  constructor(public http: HttpClient) {}

  public taskForm!: FormGroup;

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      dueDate: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
    });
  }

  statuses = ['To Do', 'In Progress', 'Done'];

  priorities = ['Low', 'Medium', 'High'];

  myError = (controlName: string, errorName: string) => {
    return this.taskForm.controls[controlName].hasError(errorName);
  };

  addTask() {
    this.http
      .post('http://localhost:3000', this.taskForm.value)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
