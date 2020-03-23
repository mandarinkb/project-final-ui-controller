import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  list2: any = [
    {
        'password': '1234',
        'id': 1,
        'email': 'man@se.com'
    },
    {
        'password': 'test',
        'id': 2,
        'email': 'test@se.com'
    },
    {
        'password': 'test2',
        'id': 3,
        'email': 'test2@se.com'
    },
    {
        'password': '1234',
        'id': 13,
        'email': 'demo@se.com'
    },
    {
        'password': '1234',
        'id': 14,
        'email': 'demo2@se.com'
    }
]
  ;
  constructor(private service: EmployeeService) { }

  ngOnInit() {
    this.service.refreshList();
  }

}
