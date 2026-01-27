import React from 'react'
import  Input from '../Inputs/Input';
import EmojiPickerPopup from "../EmojiPickerPopUp"

const AddExpenseForm = ({onAddExpense}) => {
    const [income,setIncome]=React.useState({category:"", amount:"",date:"",icon:""});
    const handleChange=(key,value)=>setIncome ({...income,[key]:value});
  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon} onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}/>
        <Input label="Category" value={income.category} onChange={(e)=>handleChange("category",e.target.value)} placeholder="Rent,Groceries etc" type="text"/>
        <Input label="Amount" value={income.amount} onChange={(e)=>handleChange("amount",e.target.value)} placeholder="Enter amount" type="number"/>
        <Input label="Date" value={income.date} onChange={(e)=>handleChange("date",e.target.value)} placeholder="" type="date"/>
        <div className='flex justify-end mt-6'>
            <button onClick={()=>onAddExpense(income)} className='add-btn add-btn-fill' type="button">
                Add Expense
            </button>
        </div>
    </div>
  )
}

export default AddExpenseForm
