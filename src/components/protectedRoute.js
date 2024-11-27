import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUsers } from "../API/users";


function ProtectedRoute({children}){
const navigate = useNavigate();

async function ValidateUser(){
    try {
        const response = await CurrentUsers();
        console.log(response)
        return response.data;
        //debugger;
        // if(!response)
        //     navigate("/login")
        //navigate("/")
    } catch (error) {
        console.log(error)
        return {success : false}
    }

}



useEffect(()=>{
    if(localStorage.getItem('token')){
        const valid =  ValidateUser()
        if(!valid.success){
            navigate("/login")
        }
    } else{
        navigate("/login")
    } 
},[])
    return(
        <div>
            {children}
        </div>
    )
}

export default ProtectedRoute;