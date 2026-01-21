import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Income = () => {
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
    try{
      const response =await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
      if(response.data){
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

  };

  // Delete Income
  const dleteIncome=async(incomeID)=>{
    
  };

  // Download income details
  const handleDownloadIncomeDetails=async()=>{};

  useEffect(()=>{
    fetchIncomeDetails();
  },[]);

  return (
    <DashboardLayout activeMenu="Income">
      <div classname="my-5 mx-auto">
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview tranactions={incomeData} onAddIncome={()=>setOpenAddIncomeModal(true)}/>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Income
