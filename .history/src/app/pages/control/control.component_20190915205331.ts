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
  displayedColumns: string[] = ['url', 'name', 'season',  'status', 'action'];
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
      web_id: null ,
      web_name: '' ,
      url: '',
      type: '',
      type_detail: '',
      web_status: '',
      season: '',
      base_url: '',
      detail: ''
    };
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (form.value.web_id == null) {
      // this.insertRecord(form , this.memberId);
    } else {
      // this.updateRecord(form , this.memberId);
    }
  }

  onChanged(event, id: number ) {
    if (event.checked) { // open
      const objOpen = {
        web_status: '1'
      };
      const objOpenStr = JSON.stringify(objOpen); // create json
      this.service.updateWebStatus(id, objOpenStr).subscribe((res: Response) => {
        if (res.status === 200) {
          this.toastr.success(res.message, 'Update status success.');
        }
        this.getWebController();
      }, err => {
      });
    } else {  // close
      const objClose = {
        web_status: '0'
      };
      const objCloseStr = JSON.stringify(objClose); // create json
      this.service.updateWebStatus(id, objCloseStr).subscribe((res: Response) => {
        if (res.status === 200) {
          this.toastr.success(res.message, 'Update status success.');
        }
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

  onDelete() {
    this.dialogService
      .confirm(
        'ยืนยันการลบรายการ..',
        'ต้องการลบรายการหรือไม่ ?'
      )
      .then(confirmed => {  // กดok => confirmed = true , กดcancel => confirmed = false
        if (confirmed) {
          console.log('ok');
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
