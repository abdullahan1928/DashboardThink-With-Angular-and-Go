import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuditsService {

  constructor() { }

  auditLog: any = [];

  addStudentAudit(student: any) {
    this.auditLog.push(student);
  }

  editStudentAudit(student: any) {
    this.auditLog.push(student);
  }

  deleteStudentAudit(student: any) {
    this.auditLog.push(student);
  }
}
