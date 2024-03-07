import React from 'react'

const CreateHabit = () => {
  return (
    <div className="mt-6 border border-blue-900 flex-row items-center rounded-xl p-8">
        <div className="flex-row justify-center">
            <h2 className="font-bold text-xl mt-2 mb-4 text-center">Create your habit</h2>
            <input type="text" className="border border-black rounded text-center"/>
        </div>
    </div>
  )
}

export default CreateHabit