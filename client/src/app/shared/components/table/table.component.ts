import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  Input,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { IStudent } from 'src/app/models/StudentFormFields';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public http: HttpClient,
    public dialog: MatDialog,
    public route: Router
  ) { }

  @Input() dataSource = new MatTableDataSource<IStudent>();
  @Input() displayedColumns: string[] = [];
  @Input() list: any;

  // studentListSubscription() {
  //   this.list.subscribe((res: any) => {
  //     this.dataSource = new MatTableDataSource(res.data);
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;
  //   });
  // }

  ngOnInit(): void {
    this.displayedColumns.push('actions');
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    row: any
  ): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id: row._id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  delete(row: any) {
    console.log('delete');
    console.log(row);
    this.openDialog('200ms', '200ms', row);
  }

  view(row: any) {
    console.log('view');
    this.route.navigate(['/students/view', row._id]);
  }

  edit(row: any) {
    console.log('edit');
    this.route.navigate(['/students/edit', row._id]);
  }
}
