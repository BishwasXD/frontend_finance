import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import "../styles/Chart.css"

const MyChart = () => {
    const [expenseData, setExpenseData] = useState<any>(null);
    const [incomeData, setIncomeData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const expenseResponse = await axios.get('http://127.0.0.1:8000/core/get-expense-details');
                const incomeResponse = await axios.get('http://127.0.0.1:8000/core/get-income-details');
                const expenseData = expenseResponse.data;
                const incomeData = incomeResponse.data
                
                if (expenseData) {
                    const expenseChartData = generateChartData(expenseData, "Expense");
                    const incomeChartData = generateChartData(incomeData, "Income")
                    setIncomeData(incomeChartData)
                    setExpenseData(expenseChartData);
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        
        fetchData();
    }, []);

    const generateChartData = (expenseData: any, label:string) => {
        const labels = Object.keys(expenseData);
        const data = Object.values(expenseData);
        const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#33FF86', '#FF5733'];

        return {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: backgroundColors,
            }]
        };
    };
    const options = {
        plugins: {
            legend: {
                position: 'right' as const, 
                labels: {
                    font: {
                        size: 13
                    },
                  
                    
                }
            }
        }
    };

    return (
        <div id='doughnut-area'>
            <div id='income-doughnut'> {incomeData && <Doughnut data={incomeData} options={options}/>}</div>
            <div id='expense-doughnut'>{expenseData && <Doughnut data={expenseData} options={options}/>}</div>
             
        </div>
    );
};

export default MyChart;