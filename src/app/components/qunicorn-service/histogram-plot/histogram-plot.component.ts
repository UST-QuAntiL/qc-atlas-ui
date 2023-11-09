import { Component, OnChanges, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-histogram-plot',
  templateUrl: './histogram-plot.component.html',
  styleUrls: ['./histogram-plot.component.scss']
})
export class HistogramPlotComponent implements OnChanges {

  @ViewChild('plot', {static: true}) plotDiv;

  @Input() counts: {[props: string]: number}|null = null;

  constructor() { }

  ngOnChanges(): void {

    const labels = Object.keys(this.counts);

    const countsData = [];
    labels.forEach(label => countsData.push(this.counts[label]));

    console.log(labels, countsData);

    const data = {
      labels:  labels,//Object.keys(this.counts),
      datasets: [
        {
          label: 'Counts',
          data: countsData,// Object.values(this.counts),
          backgroundColor: "#33aa33"
        },
      ]
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          x: {
              grid: {
                offset: true
              }
          },
          y: {
            beginAtZero: true,
            min: 0
          }
        }
      },
    }

    const div: HTMLDivElement = this.plotDiv.nativeElement;
    div.innerHTML = "";
    const canvas = document.createElement("canvas");
    canvas.setAttribute("height", "100");
    canvas.setAttribute("width", "100");
    div.appendChild(canvas);

    new Chart(canvas, config);
  }

}
