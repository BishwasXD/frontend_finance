
import 'chart.js/auto';
import "../styles/Graph.css"
import  { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const Graph = () => {
  const [lineData, setLineData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/core/get-linechart-data');
        const linedata = generateLineData(response.data.income, response.data.expense);
        setLineData(linedata);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateLineData = (incomeData: number[], expenseData: number[]) => {
    return {
      labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      datasets: [
        {
          label: 'Income',
          borderWidth: 2,
          pointBackgroundColor: 'green',
          data: incomeData,
          fill:false,
          borderColor: 'rgba(75,192,192,1)',
        },
        {
          label: 'Expense',
          borderWidth: 2,
          pointBackgroundColor: 'red',
          fill:false,
          data: expenseData,
          borderColor: '#742774',
        },
      ],
    };
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div id="graph-container">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {lineData && <Line data={lineData} options={options} />}
      </div>
    </>
  );
};

export default Graph;
