import React from 'react'

const DeleteAlert = ({content,onDelete}) => {
  return (
    <div>
      <p className='text-sm'>{content}</p>
      <div className="flex justify-end mt-6">
        <button type='button' onClick={onDelete} className="add-btn add-btn-fill">Delete</button>
        {/* <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button> */}
      </div>
    </div>
  )
}
export default DeleteAlert;
