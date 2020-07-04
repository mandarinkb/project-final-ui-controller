import { Component, OnInit, ViewChild } from '@angular/core';
import { LogService } from 'src/app/shared/log/log.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Log } from 'src/app/shared/log/log.model';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  constructor(public service: LogService,
              private calendar: NgbCalendar) { }
  collapedSideBar: boolean;
  displayedColumns: string[] = ['timestamp', 'username', 'type', 'message'];
  dataSource = new MatTableDataSource<Log>();
  @ViewChild('paginator') paginator: MatPaginator;

  modelDate: NgbDateStruct;

  ngOnInit() {
    this.selectToday();
    this.getLog(this.dateFormat(this.modelDate));

  }
  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  getLog(date) {
    try {
      const obj = {
        datetime: date    // ต้อง format แบบนี้ 2020-06-13
      };
      const datetime = JSON.stringify(obj); // create json
      this.service.readLog(datetime).subscribe((res: Log[]) => {
        this.dataSource = new MatTableDataSource<Log>(res);  //  set datasource
        this.dataSource.paginator = this.paginator;          // set pagination
      });
    } catch (e) {
      console.log(e);
    }
  }

  selectDate() {
    this.getLog(this.dateFormat(this.modelDate));
  }

  selectToday() {
    this.modelDate = this.calendar.getToday();

  }
  dateFormat(date: any): string {
    return date.year + '-' + this.changeDate(date.month) + '-' + this.changeDate(date.day);
  }

  // แปลงเติม 0 นำหน้า กรณีหลักหน่วย
  changeDate(value): string {
    let newValue;
    switch (value) {
      case 1:
        newValue = '01';
        break;
      case 2:
        newValue = '02';
        break;
      case 3:
        newValue = '03';
        break;
      case 4:
        newValue = '04';
        break;
      case 5:
        newValue = '05';
        break;
      case 6:
        newValue = '06';
        break;
      case 7:
        newValue = '07';
        break;
      case 8:
        newValue = '08';
        break;
      case 9:
        newValue = '09';
        break;
      default :
        newValue = value;
        break;
    }
    return newValue;
  }
}
