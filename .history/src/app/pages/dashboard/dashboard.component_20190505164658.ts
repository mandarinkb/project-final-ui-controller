import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from 'src/app/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {
  }
  collapedSideBar: boolean;

    // bar chart
    public barChartOptions: any = {
      scaleShowVerticalLines: false,
      responsive: true
  };
  public barChartLabels: string[] = [
      '2006',
      '2007',
      '2008',
      '2009',
      '2010',
      '2011',
      '2012'
  ];
  public barChartType: string;
  public barChartLegend: boolean;

  public barChartData: any[] = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

      // Pie
      public pieChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales'
    ];
    public pieChartData: number[] = [300, 500, 100];
    public pieChartType: string;





public randomize(): void {
  // Only Change 3 values
  const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.random() * 100,
      56,
      Math.random() * 100,
      40
  ];
  const clone = JSON.parse(JSON.stringify(this.barChartData));
  clone[0].data = data;
  this.barChartData = clone;

}


public chartHovered(e: any): void {
  // console.log(e);
}
    // events
    public chartClicked(e: any): void {
      // console.log(e);
  }


  ngOnInit() {
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
}
