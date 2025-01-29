import React, { forwardRef } from 'react'

function Select({
    options = [],
    label,
    labelclass = '',
    className = '',
    ...props
}, ref) {
    return (
        <div className='w-full'>
            {label && <label className={`block mb-1 ${labelclass}`}> {label} </label>}
            <select ref={ref} {...props} className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-blue-50 duration-200 border border-blue-200 w-full ${className}`}>
                {options?.map((option)=>(
                    <option key={option} value={option} >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default forwardRef(Select)
