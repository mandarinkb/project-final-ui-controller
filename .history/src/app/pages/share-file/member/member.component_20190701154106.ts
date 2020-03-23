import { Component, OnInit, ViewChild } from '@angular/core';
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
      console.log(id + 'open : true');
    } else {
      console.log(id + 'close : false');
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
];
