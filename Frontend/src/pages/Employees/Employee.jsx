import React from 'react'
import { RoleBasedWrapper } from '../Auth/Register'

function Employee() {
  return (
    <RoleBasedWrapper>
        <h2>Employee Table</h2>
    </RoleBasedWrapper>
  )
}



export default Employee