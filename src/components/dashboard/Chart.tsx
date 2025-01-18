import { useEffect } from 'react';
import Chart from 'chart.js/auto';

interface Props {
  labels: string[];
  data: number[];
  style: any;
}

let myChart: { destroy: () => void };

export default function ({ labels, data, style }: Props) {
  useEffect(() => {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    ctx.style.width = '100%';
    ctx.style.height = '100%';
    ctx.width = ctx.offsetWidth;
    ctx.height = ctx.offsetHeight;
    if (typeof myChart !== 'undefined') myChart.destroy();
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            backgroundColor: [
              'rgba(179, 255, 255, 0.5)',
              'rgba(251, 255, 255, 0.4)',
              'rgba(252, 255, 255, 0.3)',
              'rgba(255, 255, 255, 0)',
              'rgba(255, 255, 255, 0)',
              'rgba(255, 255, 255, 0)',
            ],
            borderColor: 'rgb(51, 204, 255)',
            data: data,
            fill: true,
            borderWidth: 2,
            pointStyle: 'circle',
            pointRadius: 2,
            pointBackgroundColor: 'rgba(255, 255, 255, 1)',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              color: 'grey',
              lineWidth: 0.12,
            },
          },
        },
      },
    });
  });
  return (
    <div style={style}>
      <canvas id="myChart"></canvas>
    </div>
  );
}
