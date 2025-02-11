import React from 'react'

const ErrorMessage : React.FC<{ message?: string }> = (props ) => {
  return (
    <div className='text-red-400'>
      {props.message}
    </div>
  )
}

export default ErrorMessage