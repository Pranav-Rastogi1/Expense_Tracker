import React from 'react'
import { XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid,Area,AreaChart } from 'recharts'

const CustomLineChart = ({ data}) => {
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border border-gray-300 rounded-lg shadow-md">
                    <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].payload.category}</p>
                    <p className="text-sm text-gray-600">Amount: <span className="font-medium text-sm text-gray-900">${payload[0].payload.amount}</span></p>
                </div>
            );
        }
        return null;
    };

  return (
    <div className='bg-white w-full h-[300px]'>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
         <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#875cf5" stopOpacity={0}/>
            </linearGradient>
         </defs>
         <CartesianGrid stroke='none'/>
            <XAxis dataKey="month" tick={{fontSize:12,fill:"#555"}} stroke="none"/>
            <YAxis tick={{fontSize:12,fill:'#555'}} stroke="none"/>
            <Tooltip content={<CustomTooltip />}/>
            <Area type="monotone" dataKey="amount" stroke="#875cf5" strokeWidth={3} fill="url(#colorAmount)" dot={{r:3,fill:'#ab8df8'}} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart
