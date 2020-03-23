import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Web } from 'src/app/shared/controller/web.model';
import { ControlService } from 'src/app/shared/controller/control.service';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/shared/response.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleService } from 'src/app/shared/schedule/schedule.service';
import { Schedule } from 'src/app/shared/schedule/schedule.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  collapedSideBar: boolean;
  displayedColumns: string[] = ['schedule name', 'cron expression', 'function name', 'project name', 'detail', 'edit'];
  dataSource = new MatTableDataSource<Schedule>();
  @ViewChild('paginator') paginator: MatPaginator;
  constructor(public service: ScheduleService ,
              private toastr: ToastrService ,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.readSchedule();
    this.resetForm();
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    // clear form
    this.service.formScheduleData = {
      schedule_id: null,
      schedule_name: '',
      cron_expression: '',
      function_name: '',
      project_name: '',
      detail: ''
    };
  }

  readSchedule() {
    this.service.readSchedule().subscribe((res: Schedule[]) => {
      this.service.listSchedule = res;
      this.dataSource = new MatTableDataSource<Schedule>(this.service.listSchedule);  //  set datasource
      this.dataSource.paginator = this.paginator;  // set pagination
    }, err => {

    });
  }

  readScheduleById(id) {
    this.service.readScheduleById(id).subscribe((res: Schedule) => {
      this.service.formScheduleData = res;
    }, err => {
    });
  }
  updateSchedule(id , form: NgForm) {
    this.service.updateSchedule(id, form).subscribe((res: Response) => {
      if (res.status === 200) {
        this.toastr.success(res.message, 'Update cron expression success.');
      }
      this.readSchedule();
    }, err => {
    });
  }
  onSubmit(form: NgForm) {
      this.updateSchedule(form.value.schedule_id , form.value);
      if (form.value.project_name === 'web scrapping') {
        this.service.restartWebScrapping(form.value).subscribe((res) => {
        }, err => {
          console.log(err);
        });
      }
      if (form.value.project_name === 'web scrapping input database') {
         this.service.restartWebScrappingInputDatabase(form.value).subscribe((res) => {
         }, err => {
          console.log(err);
         });
      }
  }
  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }
}
