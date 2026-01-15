import React from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import {IoMdCard} from 'react-icons/io';
import {LuHandCoins,LuWalletMinimal} from 'react-icons/lu';
import { addThousandSeparators } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransactions';

const Home = () => {
  
  useUserAuth();
  const navigate=useNavigate();
  const [dashboardData,setDashboardData] = useState(null);
  const [Loading,setLoading] = useState(false);
  const fetchDashboardData=async()=>{
    if(Loading) return;
    setLoading(true);
    try{
      const res=await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      // setDashboardData(res.data);
      if(res.data){
        setDashboardData(res.data);
      }
    }
    catch(err){
      console.error("Error fetching dashboard data:",err);
    } finally{
      setLoading(false);
    }
  }
  React.useEffect(()=>{
    fetchDashboardData(); 
  },[]);
  console.log("Home rendered", dashboardData);
  return (
    
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard 
            icon={<IoMdCard/>}
            label="Total Balance"
            value={addThousandSeparators(dashboardData?.totalBalance||0)}
            color="bg-primary"
          />
          <InfoCard 
            icon={<LuWalletMinimal/>}
            label="Total Income"
            value={addThousandSeparators(dashboardData?.totalIncome||0)}
            color="bg-orange-500"
          />
          <InfoCard 
            icon={<LuHandCoins/>}
            label="Total Expense"
            value={addThousandSeparators(dashboardData?.totalExpense||0)}
            color="bg-red-500"
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions transactions={dashboardData?.recentTransactions} onSeeMore={() => navigate('/expense')}></RecentTransactions>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home
