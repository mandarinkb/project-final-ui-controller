import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Web } from 'src/app/shared/controller/web.model';
import { ControlService } from 'src/app/shared/controller/control.service';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/shared/response.model';
import { DialogService } from 'src/app/shared/dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  webStatus = '1';

  collapedSideBar: boolean;
  displayedColumns: string[] = ['webName', 'webUrl', 'status', 'action'];
  dataSource = new MatTableDataSource<Web>();
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(public service: ControlService ,
              private toastr: ToastrService,
              private dialogService: DialogService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.getWebController();
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
    this.service.formData = {
      webId: null ,
      webName: '' ,
      webUrl: '',
      webStatus: '',
      iconUrl: ''
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.webId == null) {
      this.saveWeb(form.value);
    } else {
      this.updateWeb(form.value.webId , form.value);
    }
  }

  readWebById(id) {
    this.service.readWebById(id).subscribe((res: Web) => {
      this.service.formData = res;
    }, err => {
    });
  }

  saveWeb(form: NgForm) {
    this.service.saveWeb(form).subscribe((res: Response) => {
      this.toastr.success('', 'Save web success.');
      this.getWebController();
    }, err => {
    });
  }
  deleteWeb(id) {
    this.service.deleteWeb(id).subscribe((res: Response) => {

      this.toastr.success('', 'Delete web success.');
      this.getWebController();
    }, err => {
    });
  }

  updateWeb(id , form: NgForm) {
    this.service.updateWeb(id, form).subscribe((res: Response) => {
      this.toastr.success('', 'Update web success.');
      this.getWebController();
    }, err => {
    });
  }

  onChanged(event, id: number ) {
    if (event.checked) { // open
      const objOpen = {
        webStatus: '1'
      };
      const objOpenStr = JSON.stringify(objOpen); // create json
      this.service.updateWebStatus(id, objOpenStr).subscribe((res: Response) => {

        this.toastr.success('', 'Update status success.');

        this.getWebController();
      }, err => {
      });
    } else {  // close
      const objClose = {
        webStatus: '0'
      };
      const objCloseStr = JSON.stringify(objClose); // create json
      this.service.updateWebStatus(id, objCloseStr).subscribe((res: Response) => {
        this.toastr.success('', 'Update status success.');
        this.getWebController();
      }, err => {
      });
    }
  }

  getWebController() {
    this.service.getWeb().subscribe((res: Web[]) => {
      this.service.lisWeb = res;
      this.dataSource = new MatTableDataSource<Web>(this.service.lisWeb);  //  set datasource
      this.dataSource.paginator = this.paginator;  // set pagination
    }, err => {

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
          // console.log('ok');
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
/*
  */
  // end-modal
}
