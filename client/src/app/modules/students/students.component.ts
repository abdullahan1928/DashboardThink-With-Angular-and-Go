import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IStudent } from 'src/app/models/StudentFormFields';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  constructor(public studentService: StudentService) { }

  dataSource = new MatTableDataSource<IStudent>();
  displayedColumns = this.studentService.displayedColumns;
  studentList = this.studentService.getStudents();

  ngOnInit(): void {
    this.studentList.subscribe((data: any) => {
      this.dataSource.data = data;
    });
  }
}
