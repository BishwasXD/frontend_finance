import UserForm from "./components/UserForm"
import NavBar from "./components/Navbar"
import FinanceForm from "./components/FinanceForm"
import Graph from "./components/Graph"
import IncomeChart from "./components/IncomeChart"
import ExpenseChart from "./components/ExpenseChart"
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function Dashboard() {
    return (
      <>
        <NavBar/> 
        <FinanceForm />
        <IncomeChart />
        <ExpenseChart />
        <Graph />
      </>
    );
  }
  


function App() {
    return (
      <Router>
        
          <Routes>
            <Route path="/dashboard" element={<Dashboard/>}/>
            
            <Route path="/user" element={<UserForm/>}/>
              
          </Routes>
        
      </Router>
    );
  }
  
export default App
