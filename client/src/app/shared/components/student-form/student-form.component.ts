import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student/student.service';
import StudentFormFields from '../../../models/StudentFormFields';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuditsService } from 'src/app/services/audits/audits.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})

export class StudentFormComponent implements OnInit {
  constructor(
    public http: HttpClient,
    public route: Router,
    public studentService: StudentService,
    public activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar,
    public auditsService: AuditsService
  ) { }

  @Input() title: string = 'Form Title';
  @Input() subtitle: string = 'Form Subtitle';
  @Input() btnTitle: string = 'Add Student';

  public studentForm!: FormGroup;

  studentFields = StudentFormFields;

  studentForum() {
    this.studentForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      admissionDate: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.studentForum();
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      if (params['id']) {
        this.btnTitle = 'Save Changes';
        this.studentService.getStudent(params['id']).subscribe((res: any) => {
          console.log(res);
          this.studentForm.patchValue(res);
        });
      }
    });
  }

  myError = (controlName: string, errorName: string) => {
    return this.studentForm.controls[controlName].hasError(errorName);
  };

  addStudent() {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      if (params['id']) {
        this.studentService.updateStudent(params['id'], this.studentForm.value).subscribe((res: any) => {
          console.log(res);
          this.auditsService.editStudentAudit('test');
        });
        this.snackBar.open('Student Updated Successfully', 'Close', {
          duration: 2000,
        });
      }
      else {
        this.studentService.newStudent(this.studentForm.value).subscribe((res: any) => {
          console.log(res);
        });
        this.snackBar.open('Student Added Successfully', 'Close', {
          duration: 2000,
        });
      }
    });
    this.route.navigate(['/students']);
  }
}
