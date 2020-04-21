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
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  collapedSideBar: boolean;
  displayedColumns: string[] = ['schedule_name', 'cron_expression', 'project_name', 'action'];
  dataSource = new MatTableDataSource<Schedule>();
  @ViewChild('paginator') paginator: MatPaginator;
  constructor(public service: ScheduleService ,
              private toastr: ToastrService ,
              private dialogService: DialogService,
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
      scheduleId: null,
      scheduleName: '',
      cronExpression: '',
      methodName: '',
      projectName: ''
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
  saveSchedule(form: NgForm) {
    this.service.saveSchedule(form).subscribe((res: Response) => {
      this.toastr.success('', 'Save cron expression success.');
      this.readSchedule();
    }, err => {
    });
  }

  updateSchedule(id , form: NgForm) {
    this.service.updateSchedule(id, form).subscribe((res: Response) => {
      this.toastr.success('', 'Update cron expression success.');
      this.readSchedule();
    }, err => {
    });
  }

  deleteSchedule(id) {
    this.service.deleteSchedule(id).subscribe((res: Response) => {
      this.toastr.success('', 'Delete cron expression success.');
      this.readSchedule();
    }, err => {
    });
  }

  onSubmit(form: NgForm) {
    if (form.value.scheduleId == null) {
      this.saveSchedule(form.value);
    } else {
      this.updateSchedule(form.value.scheduleId , form.value);
      // restart app
      /*if (form.value.project_name === 'web scrapping') {
        this.service.restartWebScrapping(form.value).subscribe((res) => {
        }, err => {
          console.log(err);
        });
      }
*/
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

  onDelete(id) {
    this.dialogService
      .confirm(
        'ยืนยันการลบรายการ..',
        'ต้องการลบรายการหรือไม่ ?'
      )
      .then(confirmed => {  // กดok => confirmed = true , กดcancel => confirmed = false
        if (confirmed) {
          // console.log(id);
          this.deleteSchedule(id);
        } else {
        // กรณี cancel ลบ
          console.log('cancel');
        }

      })
      .catch(() =>
        // กรณี ปิด confirmed modal ด้วยวิธีอื่นๆ
        console.log('exit')
      );
  }
}
