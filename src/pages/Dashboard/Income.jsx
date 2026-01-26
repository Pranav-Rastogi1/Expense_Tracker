import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import { toast } from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

const Income = () => {
  useUserAuth();
  const [incomeData,setIncomeData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [openDeleteAlert,setOpenDeleteAlert]=useState({
    show:false,
    data:null,
  });
  const [openAddIncomeModal,setOpenAddIncomeModal]=useState(false);

  // get all income details

// {_id: "694e1f43e38b2937b601f8d7", userId: "6948ec25553ddf619e4b310b", icon: "", source: "Salary",…}
// amount: 3500
// createdAt: "2025-12-26T05:38:11.890Z"
// date: "2025-12-26T00:00:00.000Z"
// icon: ""
// source: "Salary"
// updatedAt: "2025-12-26T05:38:11.890Z"
// userId: "6948ec25553ddf619e4b310b"
// __v: 0
// _id: "694e1f43e38b2937b601f8d7"

  const fetchIncomeDetails=async()=>{
    if(loading)return;
    setLoading(true);
    // try{
    //   const response =await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
    //   if(response.data){
    //     setIncomeData(response.data);
    //   }
    // }
    try {
    const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
    console.log("Full API Response:", response.data); // Yahan check karein array kahan hai

    // Agar response structure { incomes: [...] } hai, toh response.data.incomes use karein
    if (response.data && Array.isArray(response.data.incomes)) {
        setIncomeData(response.data.incomes);
    } else if (Array.isArray(response.data)) {
        setIncomeData(response.data);
    }
  }
    catch(err){
      console.error("Error fetching income details:",err);
    }finally{
      setLoading(false);
    }
  };

  // Handle Add Income 
  const handleAddIncome=async(income)=>{
    const {source,amount ,date,icon}=income;
    if(!source.trim()){
      toast.error("Income source is required");
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
        await axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`,{ 
        source,amount,date,icon});
        setOpenAddIncomeModal(false);
        toast.success("Income added successfully");
        fetchIncomeDetails();
    }catch(err){
      console.error("Error adding income:",err.response?.data?.message||err.message);
    }
  };

  // Delete Income
  const deleteIncome=async(incomeID)=>{
    // console.log("Delete function triggered for ID:", incomeID); // CHECK THIS IN CONSOLE
  
  if (!incomeID) {
    toast.error("Error: No ID found for this record.");
    return;
  }
    try{
      await axiosInstance.delete(`${API_PATHS.INCOME.DELETE_INCOME(incomeID)}`);
      setOpenDeleteAlert({show:false,data:null});
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    }catch(err){
      console.error("Error deleting income:",err.response?.data?.message||err.message);
    }
  };

  // Download income details
  const handleDownloadIncomeDetails=async()=>{};

  useEffect(()=>{
    fetchIncomeDetails();
  },[]);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview tranactions={incomeData} onAddIncome={()=>setOpenAddIncomeModal(true)}/>
          </div>
          <IncomeList transactions={incomeData} onDelete={(id)=>setOpenDeleteAlert({show:true,data:id})} onDownload={handleDownloadIncomeDetails}/>
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={()=>setOpenAddIncomeModal(false)}
          title="Add Income">
            <AddIncomeForm onAddIncome={handleAddIncome}/>
          </Modal>

          <Modal isOpen={openDeleteAlert.show} onClose={()=>setOpenDeleteAlert({show:false,data:null})} title="Delete Income">
            <DeleteAlert content="Are you sure you want to delete this income?" onDelete={()=>deleteIncome(openDeleteAlert.data)} id={openDeleteAlert.data}></DeleteAlert>
          </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income
