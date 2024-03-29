import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Web } from 'src/app/shared/controller/web.model';
import { ControlService } from 'src/app/shared/controller/control.service';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/shared/response.model';
import { DialogService } from 'src/app/shared/dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  constructor(public service: ControlService ,
              private toastr: ToastrService,
              private dialogService: DialogService,
              private modalService: NgbModal,
              public login: LoginService) {}
  webStatus = '1';

  collapedSideBar: boolean;
  displayedColumns: string[] = ['webName', 'webUrl', 'status', 'action'];
  dataSource = new MatTableDataSource<Web>();
  @ViewChild('paginator') paginator: MatPaginator;
  ngOnInit() {
    this.getWebController();
    this.resetForm();
    this.login.checkAdmin();

    if (!this.login.isAdmin) {
      this.displayedColumns = ['webName', 'webUrl', 'status'];
    }
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
      webId: null ,
      webName: '' ,
      webUrl: '',
      // webStatus: '',
      webStatus: null,
      iconUrl: ''
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.webId == null) {
      this.saveWeb(form.value);
    } else {
      this.updateWeb(form.value);
    }
  }

  readWebById(id) {
    this.service.readWebById(id).subscribe((res: Web) => {
      this.service.formData = res;
    }, err => {
      this.toastr.error(err.error.message);
    });
  }

  saveWeb(form: NgForm) {
    this.service.saveWeb(form).subscribe((res: Response) => {
      this.toastr.success('บันทึกข้อมูลสำเร็จ');
      this.getWebController();
    }, err => {
      this.toastr.error(err.error.message);
    });
  }
  deleteWeb(id) {
    this.service.deleteWeb(id).subscribe((res: Response) => {
      this.toastr.success('ลบข้อมูลสำเร็จ');
      this.getWebController();
    }, err => {
      this.toastr.error(err.error.message);
    });
  }

  updateWeb(form: NgForm) {
    this.service.updateWeb(form).subscribe((res: Response) => {
      this.toastr.success('แก้ไขข้อมูลสำเร็จ');
      this.getWebController();
    }, err => {
      this.toastr.error(err.error.message);
    });
  }
  // ปุ่มเปลี่ยนสถานะเว็บ
  onChanged(event, id: number ) {
    if (event.checked) { // open
      const objOpen = {
        webId: id,
        webStatus: '1'
      };
      const objOpenStr = JSON.stringify(objOpen); // create json
      this.service.updateWebStatus(objOpenStr).subscribe((res: Response) => {
        this.toastr.success('แก้ไขข้อมูลสำเร็จ');
        this.getWebController();
      }, err => {
        this.toastr.error(err.error.message);
      });
    } else {  // close
      const objClose = {
        webId: id,
        webStatus: '0'
      };
      const objCloseStr = JSON.stringify(objClose); // create json
      this.service.updateWebStatus(objCloseStr).subscribe((res: Response) => {
        this.toastr.success('แก้ไขข้อมูลสำเร็จ');
        this.getWebController();
      }, err => {
        this.toastr.error(err.error.message);
      });
    }
  }

  getWebController() {
    this.service.getWeb().subscribe((res: Web[]) => {
      this.service.lisWeb = res;
      this.dataSource = new MatTableDataSource<Web>(this.service.lisWeb);  //  set datasource
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
          this.deleteWeb(id);
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
  // end-modal
}
function elseif(arg0: boolean) {
  throw new Error('Function not implemented.');
}

