import React from 'react'
import Input from '../Inputs/Input';
import EmojiPickerPopUp from '../EmojiPickerPopUp';

const AddIncomeForm = ({onAddIncome}) => {
    const [income,setIncome]=React.useState({
        source: '',
        amount: '',
        date: '',
        icon:''
    });
  
  const handleChange=(key,value)=>{setIncome({...income,[key]:value});}
  return (
    <div>
        <EmojiPickerPopUp icon={income.icon} onSelect={(selectIcon)=>handleChange('icon',selectIcon)}/>
      <Input value={income.source} onChange={({target})=>handleChange('source',target.value)} label="Income Source" placeholder="Enter Income Source" type="text" />
      <Input value={income.amount} onChange={({target})=>handleChange('amount',target.value)} label="Amount" placeholder="Enter Amount" type="number" />
      <Input value={income.date} onChange={({target})=>handleChange('date',target.value)} label="Date" placeholder="Enter Date" type="date" />
      {/* <Input value={income.icon} onChange={({target})=>handleChange('icon',target.value)} label="Icon" placeholder="Enter Icon URL" type="text" /> */}
      <div className='flex justify-end mt-6'>
        <button className='add-btn add-btn-fill' type="button"onClick={()=>onAddIncome(income)}>Add Income</button>
      </div>
    </div>
  )
}

export default AddIncomeForm
