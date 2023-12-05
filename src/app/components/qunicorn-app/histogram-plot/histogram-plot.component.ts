import { Component, OnChanges, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-histogram-plot',
  templateUrl: './histogram-plot.component.html',
  styleUrls: ['./histogram-plot.component.scss'],
})
export class HistogramPlotComponent implements OnChanges {
  @ViewChild('plot', { static: true }) plotDiv;

  @Input() counts: { [props: string]: number } | null = null;

  constructor() {}

  ngOnChanges(): void {
    const labels = Object.keys(this.counts);

    const countsData = [];
    labels.forEach((label) => countsData.push(this.counts[label]));

    console.log(labels, countsData);

    const data = {
      labels, // Object.keys(this.counts),
      datasets: [
        {
          label: 'Counts',
          data: countsData, // Object.values(this.counts),
          backgroundColor: '#0000ff',
        },
      ],
    };

    const config = {
      type: 'line',
      data: {},
      options: {},
      plugins: [],
    };

    const div: HTMLDivElement = this.plotDiv.nativeElement;
    div.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.setAttribute('height', '50px');
    canvas.setAttribute('width', '50px');
    canvas.width = 500;
    canvas.height = 500;
    const context = canvas.getContext('2d');
    context.scale(0.5, 0.5);
    // chartcontext.scale(50, 50);
    div.appendChild(canvas);

    // new Chart(canvas, config)

    // new Chart(context, config);

    const DATA_COUNT = 7;
    const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };
  }
}
