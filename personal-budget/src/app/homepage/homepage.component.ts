import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {
  public dataSource = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(255, 206, 86, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(239, 148, 0, 0.7)',
          'rgba(198, 0, 33, 0.7)',
          'rgba(72, 174, 49, 0.7)',
          'rgba(108, 49, 174, 0.7)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(239, 148, 0, 1)',
          'rgba(198, 0, 33, 1)',
          'rgba(72, 174, 49, 1)',
          'rgba(108, 49, 174, 1)',
        ],
        borderWidth: 1,
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
  };

  createChart() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const myDoughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: this.dataSource,
    });
  }

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget').subscribe((res: any) => {
      for (let i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.createChart();
    });
  }
}
