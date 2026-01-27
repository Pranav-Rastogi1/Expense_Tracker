import React from 'react'

const Modal = ({children, isOpen, onClose, title}) => {
    if(!isOpen)return null;
//   return <div className='fixed top-0 right-0 left-0 z-50 flex items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50'>
//     <div className='relative p-4 w-full max-w-2xl max-h-full'>
//         <div className='relative bg-white rounded-lg shadow-sm dark:bg-gray-700'>
//             <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200'>
//             <h3 className='text-lg font-medium text-gray-900 dark:text-white'>{title}</h3>
//             <button onClick={onClose} className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8  h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer' type='button'>
//                 <svg className='w-3 h-3' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
//                 </svg>

//             </button>
//         </div>
//         <div className='p-4 md:p-5 space-y-4'>
//             {children}
//         </div>
//         </div>
//     </div>
//   </div>
return(
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
            {/* Backdrop: Backdrop-blur aur smooth opacity add ki hai */}
            <div 
                className='fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity' 
                onClick={onClose}
            ></div>

            {/* Modal Content: Animation aur Shadow improve kiya gaya hai */}
            <div className='relative w-full max-w-lg mx-auto my-6 z-`60` animate-in fade-in zoom-in duration-300'>
                <div className='relative flex flex-col w-full bg-white border-none rounded-2xl shadow-2xl outline-none focus:outline-none dark:bg-gray-800'>
                    
                    {/* Header */}
                    <div className='flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700 rounded-t'>
                        <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>
                            {title}
                        </h3>
                        <button 
                            onClick={onClose} 
                            className='p-2 ml-auto bg-transparent border-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'
                        >
                            <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Body */}
                    <div className='relative p-6 flex-auto text-gray-600 dark:text-gray-300'>
                        {children}
                    </div>

                    {/* Footer (Optional): Agar Buttons chahiye toh yahan add kar sakte hain */}
                </div>
            </div>
        </div>
    );
}

export default Modal;
