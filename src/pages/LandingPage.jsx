import React from 'react'
import Landing from '../components/Landing'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

function LandingPage() {

  return (
    <div>
        <Landing/>
    </div>
  )
}

export default LandingPage