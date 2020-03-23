import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Web } from 'src/app/shared/controller/web.model';
import { ControlService } from 'src/app/shared/controller/control.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource = new MatTableDataSource<Web>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public service: ControlService) { }

  ngOnInit() {
    this.getWebController();
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource);
  }

  onChanged(event, id: number ) {
    if (event.checked) {
      console.log(id + 'open : true');
    } else {
      console.log(id + 'close : false');
    }
  }

  getWebController() {
    this.service.getWeb().subscribe((res: Web[]) => {
      this.service.lisWeb = res;
      this.dataSource = new MatTableDataSource<Web>(this.service.lisWeb);
    }, err => {
    });
  }
}