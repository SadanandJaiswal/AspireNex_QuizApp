import React from 'react'

const SubmitQuizMsg = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Thank You!</h1>
        <p className="text-center mb-4">Thank you for taking the quiz. We are saving your responses.</p>
        <div className="flex justify-center">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default SubmitQuizMsg
