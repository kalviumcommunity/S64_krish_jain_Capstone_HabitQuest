import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { format, eachDayOfInterval, subDays } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OverallProgressChart = ({ habits, timeRange = 30 }) => {
  // Generate date range
  const today = new Date();
  const dateRange = eachDayOfInterval({
    start: subDays(today, timeRange - 1),
    end: today
  });

  // Aggregate habit completions by date
  const aggregateData = () => {
    const completionCounts = {};
    
    // Initialize all dates with 0
    dateRange.forEach(date => {
      completionCounts[format(date, 'yyyy-MM-dd')] = 0;
    });

    // Count completions for each date
    habits.forEach(habit => {
      habit.completionHistory.forEach(date => {
        if (completionCounts.hasOwnProperty(date)) {
          completionCounts[date]++;
        }
      });
    });

    return dateRange.map(date => 
      completionCounts[format(date, 'yyyy-MM-dd')]
    );
  };

  const data = {
    labels: dateRange.map(date => format(date, 'MMM d')),
    datasets: [
      {
        label: 'Habits Completed',
        data: aggregateData(),
        backgroundColor: 'rgba(139, 92, 246, 0.6)',
        borderColor: '#8b5cf6',
        borderWidth: 1,
        borderRadius: 4,
        maxBarThickness: 40
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return format(dateRange[tooltipItems[0].dataIndex], 'MMMM d, yyyy');
          },
          label: (context) => {
            const value = context.parsed.y;
            return `${value} habit${value === 1 ? '' : 's'} completed`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        title: {
          display: true,
          text: 'Habits Completed'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Overall Progress</h2>
      <div className="h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default OverallProgressChart; 