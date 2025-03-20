import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Home_fin from "./pages/Home_fin";
import Login_fin from './pages/Users/Login_fin';
import Register_fin from './pages/Users/Register_fin';
import Wlcm_fin from './pages/Wlcm_fin';
import Profile from './pages/Users/Profile';
import Income from './pages/income/income';
import Expense from './pages/expense/expenses';
import ExpensesList from './pages/expense/ExpensesList';
import AllExpenseList from './pages/expense/AllExpenseList';
import EditContent from './pages/expense/EditExpenses';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Wlcm_fin />} /> 
        <Route exact path="/home_fin" element={<Home_fin />} />
        <Route exact path="/login" element={<Login_fin />} />
        <Route exact path="/register" element={<Register_fin />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/new-income" element={<Income />}/>
        <Route exact path="/new-expense" element={<Expense />}/> 
        <Route exact path="/expenses" element={<ExpensesList />} />
        <Route exact path="/expenses-list" element={<AllExpenseList />} />
        <Route exact path="/update-expense/:id" element={<EditContent />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;