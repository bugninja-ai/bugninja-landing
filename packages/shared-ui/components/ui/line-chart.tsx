'use client'

import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export interface LineChartDataset {
  label: string
  data: (number | null)[]
  borderColor: string
  backgroundColor: string
  spanGaps?: boolean
}

export interface LineChartProps {
  title?: string
  labels: string[]
  datasets: LineChartDataset[]
  yAxisLabel?: string
  xAxisLabel?: string
  height?: number
  yAxisMin?: number
  yAxisMax?: number
  percentageFormat?: boolean
}

export function LineChart({
  title,
  labels,
  datasets,
  yAxisLabel = 'Value',
  xAxisLabel = 'Date',
  height = 300,
  yAxisMin = -2,
  yAxisMax = 100,
  percentageFormat = true,
}: LineChartProps) {
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          boxHeight: 8,
          padding: 20,
        },
        onClick: (e, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          const ci = legend.chart;
          
          if (index !== undefined) {
            if (ci.isDatasetVisible(index)) {
              ci.hide(index);
              legendItem.hidden = true;
            } else {
              ci.show(index);
              legendItem.hidden = false;
            }
            ci.update();
          }
        },
      },
      title: {
        display: !!title,
        text: title || '',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    elements: {
      point: {
        radius: 4,
        pointStyle: 'circle',
        hoverRadius: 6,
        backgroundColor: 'white',
        borderWidth: 2,
      },
      line: {
        tension: 0.3, // Smoother curves
      }
    },
    scales: {
      y: {
        min: yAxisMin,
        max: yAxisMax,
        title: {
          display: true,
          text: yAxisLabel,
        },
        ticks: {
          callback: function(tickValue: number | string) {
            if (typeof tickValue === 'number' && tickValue < 0) {
              return percentageFormat ?  '0%' : '0'
            }
            return percentageFormat ? tickValue + '%' : tickValue
          }
        },
        grid: {
          display: false
        }
      },
      x: {
        title: {
          display: true,
          text: xAxisLabel,
        },
        grid: {
          display: false
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  }

  const data = {
    labels,
    datasets,
  }

  return (
    <div style={{ height: height }}>
      <Line options={options} data={data} />
    </div>
  )
} 