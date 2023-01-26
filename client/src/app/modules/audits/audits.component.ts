import { Component, OnInit } from '@angular/core';
import { AuditsService } from 'src/app/services/audits/audits.service';

@Component({
  selector: 'app-audits',
  templateUrl: './audits.component.html',
  styleUrls: ['./audits.component.scss']
})
export class AuditsComponent implements OnInit {

  constructor(public auditsService: AuditsService) { }

  auditsLog: any = [];

  ngOnInit(): void {
    this.auditsLog = this.auditsService.auditLog;
  }

}
