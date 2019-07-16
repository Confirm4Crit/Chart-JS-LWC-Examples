import { api, LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/chart';
import myNewFunction from '@salesforce/apex/ChartJsSoqlRetriever.myNewFunction';

const generateRandomNumber = () => Math.round(Math.random() * 100);

export default class LibsChartjs extends LightningElement {
  @track error;
  chart;
  chartjsInitialized = false;
  @api soqlquery;
  @api label;
  @api value;

  renderedCallback() {
    console.log(this.soqlquery);
    myNewFunction({ iQuery: this.soqlquery })
      .then((result) => {
        console.log(result);
        const newData = [];
        const newLabel = [];
        result.forEach((element) => {
          newData.push(element[this.value]);
          newLabel.push(element[this.label]);
        });
        const config = {
          type: 'doughnut',
          data: {
            datasets: [
              {
                data: newData,
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                ],
                label: 'Dataset 1',
              },
            ],
            labels: newLabel,
          },
          options: {
            responsive: true,
            legend: {
              position: 'right',
            },
            animation: {
              animateScale: true,
              animateRotate: true,
            },
          },
        };
        console.log(config);
        if (this.chartjsInitialized) {
          return;
        }
        this.chartjsInitialized = true;
        loadScript(this, chartjs)
          .then(() => {
            const ctx = this.template.querySelector('canvas.donut').getContext('2d');
            this.chart = new window.Chart(ctx, config);
          })
          .catch((error) => {
            this.error = error;
          });
      })
      .catch((error) => {
        // TODO Error handling
      });
    console.log(this.config);
  }
}
