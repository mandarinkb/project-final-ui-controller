import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Web } from 'src/app/shared/controller/web.model';
import { ControlService } from 'src/app/shared/controller/control.service';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/shared/response.model';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  collapedSideBar: boolean;

  displayedColumns: string[] = ['link', 'name', 'season',  'status', 'action'];
  dataSource = new MatTableDataSource<Web>();
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(public service: ControlService ,
              private toastr: ToastrService,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.getWebController();
  }
  receiveCollapsed($event) {
    this.collapedSideBar = $event;
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
}
