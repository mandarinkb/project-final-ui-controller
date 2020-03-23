import { Component, OnInit, ViewChild } from '@angular/core';
import { ShareFileMemberService } from 'src/app/shared/share-file/share-file-member.service';
import { AuthenService } from 'src/app/shared/authen.service';
import { ShareFileMember } from 'src/app/shared/share-file/share-file-member.model';
import { ShareFileMemberActivity } from 'src/app/shared/share-file/share-file-member-activity.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  onChanged(event, id: number ) {
    if (event.checked) {
      console.log('open : ' + id);
    } else {
      console.log('close');
    }
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: boolean;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', status: true},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', status: false},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', status: false},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', status: true},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', status: true},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', status: false},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', status: true},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', status: true},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', status: false},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', status: false},
  /*{position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  */
// tslint:disable-next-line:eofline
];