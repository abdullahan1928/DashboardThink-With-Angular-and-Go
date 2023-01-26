import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStudent } from 'src/app/models/StudentFormFields';
import { StudentService } from 'src/app/services/student/student.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(
    public studentService: StudentService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  id = this.route.snapshot.params['id'];

  studentData: any = {};

  ngOnInit(): void {
    this.viewStudent(this.id);
  }

  unsorted() { return 0; }

  viewStudent(id: string) {
    this.studentService.getStudent(id).subscribe((res: any) => {
      console.log(res);
      const { name, email, password, phone } = res as IStudent;
      let { admissionDate } = res;
      admissionDate = this.datePipe.transform(admissionDate, 'dd-MM-yyyy');
      this.studentData = { name, email, password, phone, admissionDate };
      console.log(this.studentData);
    });
  }
}