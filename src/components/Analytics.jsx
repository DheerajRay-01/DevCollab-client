import React from 'react'
import {useParams} from 'react-router'

function Analytics() {

const {id} = useParams()

  return (
    <div>Analytics of {id}</div>
  )
}

export default Analytics