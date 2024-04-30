import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import "../styles/ExpenseChart.css"

const ExpenseChart = () => {
    const [expenseData, setExpenseData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const expenseResponse = await axios.get('http://127.0.0.1:8000/core/get-expense-details');
                const expenseData = expenseResponse.data;
                
                if (expenseData) {
                    const expenseChartData = generateChartData(expenseData, "Expense");

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
        <div id='expense-doughnut-area'>
            
            <div id='expense-doughnut'>{expenseData && <Doughnut data={expenseData} options={options}/>}</div>
             
        </div>
    );
};

export default ExpenseChart;