import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/shared/response.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleService } from 'src/app/shared/schedule/schedule.service';
import { Schedule } from 'src/app/shared/schedule/schedule.model';
import { NgForm } from '@angular/forms';
import { DialogService } from 'src/app/shared/dialog.service';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  minutes = [];
  hourly = [{'hourly': '1'}, {'hourly': '2'}, {'hourly': '3'}, {'hourly': '4'},
            {'hourly': '6'}, {'hourly': '12'}];
  dHour = [{'dHour': '00'}, {'dHour': '01'}, {'dHour': '02'}, {'dHour': '03'},
          {'dHour': '04'}, {'dHour': '05'}, {'dHour': '06'}, {'dHour': '07'},
          {'dHour': '08'}, {'dHour': '09'}];
  dMinutes = [{'dMinutes': '00'}, {'dMinutes': '01'}, {'dMinutes': '02'}, {'dMinutes': '03'},
          {'dMinutes': '04'}, {'dMinutes': '05'}, {'dMinutes': '06'}, {'dMinutes': '07'},
          {'dMinutes': '08'}, {'dMinutes': '09'}];

  minutesValue = '1';
  hourlyValue = '1';
  dHourValue = '00';
  dMinutesValue = '00';

  radioValue: any;
  collapedSideBar: boolean;
  displayedColumns: string[] = ['schedule_name', 'cron_expression', 'project_name', 'action'];
  dataSource = new MatTableDataSource<Schedule>();
  @ViewChild('paginator') paginator: MatPaginator;
  constructor(public service: ScheduleService ,
              private toastr: ToastrService ,
              private dialogService: DialogService,
              private modalService: NgbModal,
              public login: LoginService) {}

  ngOnInit() {
    this.readSchedule();
    this.resetForm();
    this.setMinutes();
    this.setDHour();
    this.setDMinutes();
    this.login.checkAdmin();
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

  // set value when start
  setMinutes() {
    for (let i = 1; i < 60; i++ ) {
    // tslint:disable-next-line:no-construct
    const num = new Number(i);
    const m = [{'minute': num.toString()}];
    this.minutes = this.minutes.concat(m);
    }
  }
  setDHour() {
    for (let i = 10; i < 24; i++ ) {
    // tslint:disable-next-line:no-construct
    const num = new Number(i);
    const m = [{'dHour': num.toString()}];
    this.dHour = this.dHour.concat(m);
    }
  }
  setDMinutes() {
    for (let i = 10; i < 60; i++ ) {
    // tslint:disable-next-line:no-construct
    const num = new Number(i);
    const m = [{'dMinutes': num.toString()}];
    this.dMinutes = this.dMinutes.concat(m);
    }
  }

  // set event
  setMinutesValue(event: any) {
    this.minutesValue = event.target.value;
  }

  setHourlyValue(event: any) {
    this.hourlyValue = event.target.value;
  }

  setdHourValue(event: any) {
    this.dHourValue = event.target.value;
  }

  setdMinutesValue(event: any) {
    this.dMinutesValue = event.target.value;
  }

  // call api
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

  saveSchedule(form) {
    this.service.saveSchedule(form).subscribe((res: Response) => {
      this.toastr.success('บันทึกข้อมูลสำเร็จ');
      this.readSchedule();
    }, err => {
    });
  }

  updateSchedule(id , form) {
    this.service.updateSchedule(id, form).subscribe((res: Response) => {
      this.toastr.success('แก้ไขข้อมูลสำเร็จ');
      this.readSchedule();
    }, err => {
    });
  }

  deleteSchedule(id) {
    this.service.deleteSchedule(id).subscribe((res: Response) => {
      this.toastr.success('ลบข้อมูลสำเร็จ');
      this.readSchedule();
    }, err => {
    });
  }

  // submit
  async onSubmit(form: NgForm) {
    if (form.value.scheduleId == null) {
      const newFormStr = this.addCronExpressionToForm(form);
      await this.saveSchedule(newFormStr);
      this.radioValue = null; // clear radio button
    } else {
      const newFormStr = this.addCronExpressionToForm(form);
      await this.updateSchedule(form.value.scheduleId , newFormStr);
      this.radioValue = null; // clear radio button
    }
    // restart app
    this.service.restartWebScrapping(form.value).subscribe();
  }

  // modal
  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  // modal confirm dialog
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

  // cron expression
  setCronExpressionMinutes(m) {
    return '0 0/' + m + ' * 1/1 * ?';
  }

  setCronExpressionHourly(h) {
    return '0 0 0/' + h + ' 1/1 * ?';
  }

  setCronExpressionDaily(h, m) {
    let newH ;
    if (h.substring(0, 1) === '0') { // เช็คตัวแรก
      newH = h.replace('0', '');
    } else {
      newH = h;
    }

    let newM ;
    if (m.substring(0, 1) === '0') {
      newM = m.replace('0', '');
    } else {
      newM = m;
    }

    return '0 ' + newM + ' ' + newH + ' 1/1 * ?';
  }

  // add cron expression to form
  addCronExpressionToForm(form: NgForm) {
      // generate cron expression
      let cronExpressionvalue;
      if (this.radioValue === 'minutes') {
        cronExpressionvalue = this.setCronExpressionMinutes(this.minutesValue);
      } else if (this.radioValue === 'hourly') {
        cronExpressionvalue = this.setCronExpressionHourly(this.hourlyValue);
      } else if (this.radioValue === 'daily') {
        cronExpressionvalue = this.setCronExpressionDaily(this.dHourValue, this.dMinutesValue);
      }
      // สร้าง json ใหม่เพื่อ add cronExpressionvalue เข้าไป
      const newForm = {
        scheduleName: form.value.scheduleName,
        methodName: form.value.methodName,
        projectName: form.value.projectName,
        cronExpression: cronExpressionvalue
      };
      return JSON.stringify(newForm);
  }
}

