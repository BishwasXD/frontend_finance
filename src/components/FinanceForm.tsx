import "../styles/FInanceForm.css";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

import { ChangeEvent } from 'react';

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});


const defaultExpenseOptions = [
    createOption("Groceries"),
    createOption("Utilities"),
    createOption("Rent"),
    createOption("Dining Out"),
    createOption("Entertainment"),
  ];
  
  const defaultIncomeOptions = [
    createOption("Salary"),
    createOption("Freelance Income"),
    createOption("Investment"),
    createOption("Business Income"),
    createOption("Gifts"),
  ];


const FinanceForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [incomeoptions, setIncomeOptions] = useState(defaultIncomeOptions);
  const [expenseoptions, setExpenseOptions] = useState(defaultExpenseOptions);
  const [value, setValue] = useState<Option | null>();
  const [isExpense, setExpense] = useState(true)
  const [incomeData, setIncomeData] = useState({
    amount:0,
    source:"",
    description:"default value",
    user:2
  })
  const [expenseData, setExpenseData] = useState({
    amount:0,
    category:"",
    description:"default value",
    user:2
  })

  const setIncomeValue = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>{
    setIncomeData({...incomeData, [e.target.name] : e.target.value})
  }

  const setExpenseValue = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>{
    setExpenseData({...expenseData, [e.target.name] : e.target.value})
  }

  let show:string
  if(isExpense){
    show = "Expense" 
  }
  else{
    show = "Income"
  }

  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      defaultExpenseOptions.push(newOption)
      setIsLoading(false);
     
      if(isExpense){
        setExpenseOptions((prev) => [...prev, newOption]);
        
      }
      else{
        setIncomeOptions((prev) => [...prev, newOption]);
      }
      setValue(newOption);
    }, 1000);
  };

  const handleSubmit = async ()=>{
   
    console.log('i submitted')
    const incomeUrl = "http://127.0.0.1:8000/core/add-income"
    const expenseUrl = "http://127.0.0.1:8000/core/add-expense"
    try{
        const response = await axios.post(isExpense ? expenseUrl : incomeUrl, isExpense?expenseData:incomeData)
        console.log(response.data.message)

    }
    catch(error){
        console.log(error)

    }

  }

  return (
    <>
     
        <form  onSubmit={handleSubmit}>
          <div id='inc-or-exp' onClick={()=>setExpense(!isExpense)}>{show}</div>
          <input type="number" id='number' name="amount" placeholder="Enter Amount.." onChange={isExpense ? setExpenseValue:setIncomeValue} />
          <CreatableSelect
            isClearable
            isDisabled={isLoading}
            isLoading={isLoading}
            onChange={(newValue) => {
                setValue(newValue);
                if (isExpense) {
                  setExpenseData(prevData => ({ ...prevData, category: newValue?.label || "" }));
                } else {
                  setIncomeData(prevData => ({ ...prevData, source: newValue?.label || "" }));
                }
              }}
            onCreateOption={handleCreate}
            options={isExpense ? expenseoptions:incomeoptions}
            value={value}
            className="select-opt"
            name={isExpense ? "category":"source"}
          />
          
          {isExpense ? (
  <button type="submit" >
    Add Expense
  </button>
) : (
  <button type="submit" >
    Add Income
  </button>
)}
        </form>
      
    </>
  );
};

export default FinanceForm;
