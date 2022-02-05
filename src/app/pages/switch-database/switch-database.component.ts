import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from 'src/app/shared/dialog.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SwitchDatabaseService } from 'src/app/shared/switch-database/switch-database.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SwitchDatabase } from 'src/app/shared/switch-database/switch-database.model';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-switch-database',
  templateUrl: './switch-database.component.html',
  styleUrls: ['./switch-database.component.scss']
})
export class SwitchDatabaseComponent implements OnInit {
  databaseStatus = '0';
  collapedSideBar: boolean;
  displayedColumns: string[] = ['databaseName', 'databaseStatus', 'action'];
  dataSource = new MatTableDataSource<SwitchDatabase>();
  @ViewChild('paginator') paginator: MatPaginator;
  constructor(public service: SwitchDatabaseService ,
              private toastr: ToastrService,
              private dialogService: DialogService,
              private modalService: NgbModal,
              public login: LoginService) { }

  ngOnInit() {
    this.readSwitchDatabase();
    this.resetForm();
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
    this.service.formData = {
      databaseId: null ,
      databaseName: '' ,
      databaseStatus: ''
    };
  }
  readSwitchDatabase() {
    this.service.readSwitchDatabase().subscribe((res: SwitchDatabase[]) => {
      this.service.listSwitchDatabase = res;
      this.dataSource = new MatTableDataSource<SwitchDatabase>(this.service.listSwitchDatabase);  //  set datasource
      this.dataSource.paginator = this.paginator;  // set pagination
    }, err => {
      this.toastr.error(err.error.message);
    });
  }

  onDelete(id) {
    this.dialogService
      .confirm(
        'ยืนยันการลบรายการ..',
        'ต้องการลบรายการหรือไม่ ?'
      )
      .then(confirmed => {  // กดok => confirmed = true , กดcancel => confirmed = false
        if (confirmed) {
          this.deleteSwitchDatabase(id);
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

  // ปุ่มสลับ database
  onChanged(event, id: number ) {
    if (event.checked) { // open
      const objOpen = {
        databaseId: id,
        databaseStatus: '1'
      };
      const objOpenStr = JSON.stringify(objOpen); // create json
      this.service.updateSwitchDatabaseStatus(objOpenStr).subscribe((res: Response) => {
        this.toastr.success('แก้ไขข้อมูลสำเร็จ');
        this.readSwitchDatabase();
      }, err => {
        this.toastr.error(err.error.message);
      });
    } else {
       this.readSwitchDatabase();
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.databaseId == null) {
      this.saveSwitchDatabase(form.value);
    } else {
      this.updateSwitchDatabase(form.value);
    }
  }
  readSwitchDatabaseById(id) {
    this.service.readSwitchDatabaseById(id).subscribe((res: SwitchDatabase) => {
      this.service.formData = res;
    }, err => {
      this.toastr.error(err.error.message);
    });
  }
  saveSwitchDatabase(form: NgForm) {
    this.service.saveSwitchDatabase(form).subscribe((res: Response) => {
      this.toastr.success('บันทึกข้อมูลสำเร็จ');
      this.readSwitchDatabase();
    }, err => {
      this.toastr.error(err.error.message);
    });
  }
  updateSwitchDatabase(form: NgForm) {
    this.service.updateSwitchDatabase(form).subscribe((res: Response) => {
      this.toastr.success('แก้ไขข้อมูลสำเร็จ');
      this.readSwitchDatabase();
    }, err => {
      this.toastr.error(err.error.message);
    });
  }
  deleteSwitchDatabase(id) {
    this.service.deleteSwitchDatabase(id).subscribe((res: Response) => {
      this.toastr.success('ลบข้อมูลสำเร็จ');
      this.readSwitchDatabase();
    }, err => {
      this.toastr.error(err.error.message);
    });
  }
  convertToBool(str: string) {
    if (str === '0') {
      return false;
    }if (str === '1') {
      return true;
    }
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

  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
