import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { parseISO, format, eachDayOfInterval, subDays } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HabitChart = ({ habitTitle, completionDates, timeRange = 30 }) => {
  // Generate date range for x-axis
  const today = new Date();
  const dateRange = eachDayOfInterval({
    start: subDays(today, timeRange - 1),
    end: today
  });

  // Create data points (1 for completion, 0 for non-completion)
  const data = dateRange.map(date => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return completionDates.includes(dateStr) ? 1 : 0;
  });

  const chartData = {
    labels: dateRange.map(date => format(date, 'MMM d')),
    datasets: [
      {
        label: habitTitle,
        data: data,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        tension: 0.1,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#8b5cf6',
        pointHoverBorderColor: '#fff'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return context.parsed.y === 1 ? 'Completed' : 'Not Completed';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: (value) => value === 1 ? 'Yes' : 'No'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{habitTitle}</h3>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default HabitChart; 