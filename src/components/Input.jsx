import React, {forwardRef} from 'react'

const Input = forwardRef(function Input({label, labelclass = '', type = 'text', className = '', ...props}, ref){
    //directly passed the ref to the children, which was assigned to it in first place
    //this is used to link this component to the place it is being used
    //sometimes parents wants to access some deep inside a child, (like input, button), without forwardRef parent won't be able to reach-in
    return (
        <div className='w-full'>

            {label && <label className={`block mb-1 ${labelclass}`}> {label} </label>}

            <input ref={ref} type={type} className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-blue-50 duration-200 border border-blue-200 w-full ${className}`} {...props} />

        </div>
    )
})


export default Input
