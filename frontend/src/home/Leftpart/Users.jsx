import React from 'react'
import User from './User'
import usegetalluser from '../../context/usegetalluser'

const Users = () => {
  const [allusers,loading]=usegetalluser()
  return (
    <div>
      <h1 className='px-8 py-2 text-white font-semibold bg-slate-800 rounded-md'>Messages</h1>
      <div className='py-2 flex-1 overflow-y-auto' style={{maxHeight:"calc(84vh - 10vh)"}}>
      </div>
    </div>
  )
}

export default Users
