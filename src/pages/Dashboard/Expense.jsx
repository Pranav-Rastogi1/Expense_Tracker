import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import ExpenseOverView from '../../components/Expense/ExpenseOverView';

const Expense = () => {
  useUserAuth();
  const [expenseData,setExpenseData]=useState([]);
    const [loading,setLoading]=useState(false);
    const [openDeleteAlert,setOpenDeleteAlert]=useState({
      show:false,
      data:null,
    });
    const [openAddExpenseModal,setOpenAddExpenseModal]=useState(false);

  const fetchExpenseDetails = async () => {
  if (loading) return;
  setLoading(true);
  try {
    const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
    console.log("Full API Response:", response.data);

    // 1. Make sure to use 'expense' (singular) based on your previous log
    // 2. IMPORTANT: Use setExpenseData, NOT setIncomeData
    if (response.data && Array.isArray(response.data.expense)) {
        setExpenseData(response.data.expense); 
    } else if (Array.isArray(response.data)) {
        setExpenseData(response.data);
    }
  } catch (err) {
    console.error("Error fetching expense details:", err);
  } finally {
    setLoading(false);
  }
};

  // Handle Add Expense 
  const handleAddExpense=async(expense)=>{
    const {category,amount ,date,icon}=expense;
    if(!category.trim()){
      toast.error("Expense category is required");
      return;
    }
  
    if(!amount||isNaN(amount)||Number(amount)<=0){
      toast.error("Valid amount is required");
      return;
    }
    if(!date){
      toast.error("Date is required");
      return;
    }
    try{
        await axiosInstance.post(`${API_PATHS.EXPENSE.ADD_EXPENSE}`,{ 
        category,amount,date,icon});
        setOpenAddExpenseModal(false);
        toast.success("Expense added successfully");
        fetchExpenseDetails();
    }catch(err){
      console.error("Error adding expense:",err.response?.data?.message||err.message);
    }
  };

  useEffect(()=>{
    fetchExpenseDetails();
    return()=>{};
  },[]);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverView
                transactions={expenseData}
                onExpenseIncome={()=>setOpenAddExpenseModal(true)} 
            />
          </div>
        </div>
      </div>
    </DashboardLayout>

  )
}

export default Expense
