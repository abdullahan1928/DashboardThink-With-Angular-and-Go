import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student/student.service';
import { TableComponent } from '../table/table.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public http: HttpClient,
    public studentService: StudentService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDelete() {
    this.studentService.deleteStudent(this.data.id).subscribe((data: any) => {
      console.log(data);
      this.dialogRef.close();
      this.snackBar.open('Student Deleted Successfully', 'Close', {
        duration: 2000,
      });
    });
  }
}
