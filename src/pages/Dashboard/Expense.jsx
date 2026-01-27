import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import ExpenseOverView from '../../components/Expense/ExpenseOverView';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import { toast } from 'react-hot-toast';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

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

  const deleteExpense=async(id)=>{
  if (!id) {
    toast.error("Error: No ID found for this record.");
    return;
  }
    try{
      await axiosInstance.delete(`${API_PATHS.EXPENSE.DELETE_EXPENSE(id)}`);
      setOpenDeleteAlert({show:false,data:null});
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    }catch(err){
      console.error("Error deleting expense:",err.response?.data?.message||err.message);
    }
  };

  // Download expense details
  const handleDownloadExpenseDetails=async()=>{};

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
          <ExpenseList
            transactions={expenseData}
            onDelete={(id)=>{
              setOpenDeleteAlert({show:true,data:id});
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>
        <Modal isOpen={openAddExpenseModal} onClose={()=>setOpenAddExpenseModal(false)} title="Add New Expense"><AddExpenseForm onAddExpense={handleAddExpense}/></Modal>
        <Modal isOpen={openDeleteAlert.show} onClose={()=>setOpenDeleteAlert({show:false,data:null})} title="Delete Expense">
          <DeleteAlert content="Are you sure you want to delete this expense?" onDelete={()=>deleteExpense(openDeleteAlert.data)} id={openDeleteAlert.data}></DeleteAlert>
        </Modal>
      </div>
    </DashboardLayout>

  )
}

export default Expense
