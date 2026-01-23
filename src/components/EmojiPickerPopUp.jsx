import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX, LuSmilePlus } from 'react-icons/lu';

const EmojiPickerPopUp = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const pickerRef = useRef(null);

    // Click outside to close the picker
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='relative mb-6' ref={pickerRef}>
            <div 
                className='flex items-center gap-3 w-fit group cursor-pointer' 
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Icon Preview Box */}
                <div className='w-14 h-14 flex items-center justify-center text-3xl bg-slate-50 border-2 border-dashed border-slate-200 group-hover:border-purple-400 group-hover:bg-purple-50 rounded-2xl transition-all duration-200 overflow-hidden'>
                    {icon ? (
                        <img src={icon} alt="selected-icon" className='w-10 h-10 object-contain' />
                    ) : (
                        <LuSmilePlus className='text-slate-400 group-hover:text-purple-500 transition-colors' />
                    )}
                </div>

                <div className='flex flex-col'>
                    <p className='text-sm font-medium text-slate-700'>
                        {icon ? 'Transaction Icon' : 'Add an Icon'}
                    </p>
                    <p className='text-xs text-slate-400'>
                        {icon ? 'Click to change' : 'Make it recognizable'}
                    </p>
                </div>
            </div>

            {/* Floating Picker */}
            {isOpen && (
                <div className='absolute z-[100] mt-3 animate-in fade-in slide-in-from-top-2 duration-200'>
                    <div className='relative shadow-2xl rounded-xl border border-slate-100 overflow-hidden bg-white'>
                        {/* Close Button Header */}
                        <div className='flex justify-end p-2 bg-slate-50 border-b border-slate-100'>
                            <button 
                                className='p-1 hover:bg-slate-200 rounded-full transition-colors text-slate-500'
                                onClick={() => setIsOpen(false)}
                            >
                                <LuX size={18} />
                            </button>
                        </div>
                        
                        <EmojiPicker 
                            open={isOpen} 
                            skinTonesDisabled={true}
                            searchPlaceholder="Search icon..."
                            width={300}
                            height={400}
                            onEmojiClick={(emojiObject) => {
                                // Tip: Use .emoji for actual character, .imageUrl for SVG
                                onSelect(emojiObject.imageUrl || ""); 
                                setIsOpen(false);
                            }} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmojiPickerPopUp;