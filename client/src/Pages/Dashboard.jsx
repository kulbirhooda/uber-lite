import React from 'react'
import { useAuth } from '../context/authContext'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div>
      Welcome to the Dashboard: {user?.name}
    </div>
  )
}

export default Dashboard