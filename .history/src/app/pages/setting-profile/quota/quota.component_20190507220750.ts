import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-quota',
  templateUrl: './quota.component.html',
  styleUrls: ['./quota.component.scss']
})
export class QuotaComponent implements OnInit {

  constructor() { }
    // Pie
    public pieChartOptions: ChartOptions = {
      responsive: true,
      legend: {
        position: 'top',
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return label;
          },
        },
      }
    };
    public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
    public pieChartData: number[] = [300, 500, 100];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [pluginDataLabels];
    public pieChartColors = [
      {
        backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
      },
    ];

  // Doughnut
  public doughnutChartLabels: Label[] = ['File Upload (MB)', 'Free Space (MB)'];
  public doughnutChartData: MultiDataSet = [
    [7, 13]
  ];
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartDataShareFile: MultiDataSet = [
    [5, 15]
  ];
  public doughnutChartTypeShareFile: ChartType = 'doughnut';

  ngOnInit() {
  }

}
