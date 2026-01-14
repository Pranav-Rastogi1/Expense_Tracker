import React from 'react'
import { getInitials } from '../../utils/helper';

const CharAvatar = ({name}) => {
  return (
    <div className='w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-xl text-gray-800 font-medium'>
      {getInitials(name||"")}
    </div>
  )
}

export default CharAvatar;
