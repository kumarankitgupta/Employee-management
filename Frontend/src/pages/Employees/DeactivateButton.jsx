import React, { useState } from 'react'
import { apiUrl } from '../../Api/api_url';
import { toast } from 'react-toastify';
import { Box, Switch } from '@mui/joy';
import apiCaller from '../../Api/apiCaller';

function DeactivateButton({employeeId , isActive , refetch}) {  
    const [isChecked, setIsChecked] = useState(isActive);
    console.log({employeeId, isActive})
    async function handleChange(e){
        // if the employee is active, deactivate it otherwise we cannot activate it again
        if(!isActive){
            toast.error('You cannot activate a user Please contact superAdmin')
            return;
        }
        try{
            await apiCaller.put(`${apiUrl}/deactivate-employee`,{
                user_id: employeeId
            })
            toast.success('Employee deactivated successfully')
            setIsChecked(!isChecked);
            refetch();
        }
        catch(error){
            console.log({res:error.response})
            const errorMessage = error.response?.data?.message || 'Error deactivating employee'
            toast.error(errorMessage)
        }
    }

  return (
    <Box>
        <Switch color={isActive ? 'success' : 'danger'} checked={isChecked} onChange={handleChange} />
    </Box>
  )
}

export default DeactivateButton