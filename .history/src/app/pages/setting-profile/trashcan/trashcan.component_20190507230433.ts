import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trashcan',
  templateUrl: './trashcan.component.html',
  styleUrls: ['./trashcan.component.scss']
})
export class TrashcanComponent implements OnInit {
  pgDepartmentActivity = 1;
  constructor() { }

  ngOnInit() {
  }

}
