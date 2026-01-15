import React from 'react'
import moment from 'moment';
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard';

const RecentTransactions = ({transactions, onSeeMore}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Recent Transactions</h5>
            <button className='card-btn' onClick={onSeeMore}>See All<LuArrowRight className='text-base'/></button>
        </div>
        <div className='mt-6'>
            {transactions?.slice(0,5)?.map((txn)=>(
                <TransactionInfoCard key={txn._id}
                   title={txn.type=='expense'? txn.category: txn.source}
                   icon={txn.icon}
                   date={moment(txn.date).format("DD MMM, YYYY")}
                     amount={txn.amount}
                        type={txn.type}
                        hideDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default RecentTransactions
