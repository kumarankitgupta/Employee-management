import React, { useEffect, useState } from 'react'
import apiCaller from '../../Api/apiCaller';
import { apiUrl } from '../../Api/api_url';

function useEmployee() {
    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setIsLoading] = useState(false)

    async function getEmployeeData(){
        setIsLoading(true);
        try {
            const response = await apiCaller.get(`${apiUrl}/users`)
            setEmployeeData(response.data || [])
        } catch (error) {
            console.error('Error fetching employee data:', error)
            setEmployeeData([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getEmployeeData()
    },[])

    return {
        employeeData:employeeData.data,
        loading,
        getEmployeeData
    }

}

export default useEmployee