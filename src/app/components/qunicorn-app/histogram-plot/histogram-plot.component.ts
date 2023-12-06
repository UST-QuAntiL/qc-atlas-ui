import { Component, OnChanges, OnInit, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-histogram-plot',
  templateUrl: './histogram-plot.component.html',
  styleUrls: ['./histogram-plot.component.scss']
})
export class HistogramPlotComponent implements OnChanges {

  @ViewChild('plot', { static: true }) plotDiv;

  @Input() counts: { [props: string]: number } | null = null;

  constructor() { }

  ngOnChanges(): void {

    const labels = Object.keys(this.counts);

    const countsData = [];
    labels.forEach(label => countsData.push(this.counts[label]));

    console.log(labels, countsData);

    const data = {
      labels: labels,//Object.keys(this.counts),
      datasets: [
        {
          label: 'Counts',
          data: countsData,// Object.values(this.counts),
          backgroundColor: "#3f51b5"
        },
      ]
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          yAxes: [{
              ticks: {
              beginAtZero: true,
              min: 0,
            }
          }]
        }
      },
    }

    const div: HTMLDivElement = this.plotDiv.nativeElement;
    div.innerHTML = "";
    const canvas = document.createElement("canvas");
    canvas.setAttribute("height", "50px");
    canvas.setAttribute("width", "50px");
    canvas.width = 500;
    canvas.height = 300;
    const context = canvas.getContext('2d');
    context.scale(0.5, 0.5);
    //chartcontext.scale(50, 50);
    div.appendChild(canvas);

    new Chart(context, config);
  }

}
