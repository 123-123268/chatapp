import React from 'react'
import Search from './Search'
import Users from './Users'
import Logout from './Logout'
import Messages from './../Rightpart/Messages'

const Left = () => {
  return (
    <div className='w-[30%] text-gray-300 bg-black'>
      <Search/>
      <div className= ' overflow-y-auto' style={{minHeight:"calc(84vh - 10vh)"}}>
      <Users/>
      </div>
      <Logout/>
    </div>
  )
}

export default Left
