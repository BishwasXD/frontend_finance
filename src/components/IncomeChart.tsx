import { useState, useEffect } from "react"
import axios from "axios"
import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'
import "../styles/incomeChart.css"

const IncomeChart = ()=>{

   const[incomeData, setIncomeData] = useState<any>(null)

   useEffect(()=>{
    const fetchincomedata = async ()=>{
        try{
            const incomeResponse = await axios.get('http://127.0.0.1:8000/core/get-income-details')    
            const incomeData = incomeResponse.data
            if (incomeData){
             console.log(incomeData)
             const income = generateChartData(incomeData,"Income")
             setIncomeData(income)
            }     
         }
         catch(error){
            console.log(error)
         }
    }
    fetchincomedata()
   },[])

   const generateChartData = (incomeData: object, label:string) => {
    const labels = Object.keys(incomeData);
    const data = Object.values(incomeData);
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
    <div id='income-doughnut-area'>
        <div id='income-doughnut'> {incomeData && <Doughnut data={incomeData} options={options}/>}</div>

         
    </div>
);
}
export default IncomeChart