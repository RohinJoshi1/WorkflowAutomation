"use client"
import PrimaryButton from "@/components/buttons/PrimaryButton"
import Input from "@/components/Input"
import { BACKEND_URL } from "../config";

import { useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react"
const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <div className="items-center flex justify-center py-10"> 
        <div className="flex flex-col items-center justify-center w-full h-2/3 py-5 px-10 ">
        <div className="font-bold text-2xl">Log in</div>
            <Input type="text" placeholder="abc@gmail.com" label="Email" onChange={(e)=>{setEmail(e.target.value)}} />
            <Input type="password" placeholder="Password" label="Password" onChange={(e)=>{setPassword(e.target.value)}} />   
            <div className="px-2 py-3">
            <PrimaryButton onClick={ async ()=>{
                try {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,{
                        email:email, 
                        password:password
                    })
                    localStorage.setItem("token",response.data.token)
                    router.push("/dashboard")
                } catch (error) {

                    alert("Incorrect credentials, try again")
                    console.log(error)  
                }
            }} size="big"> Login  </PrimaryButton>
            </div>    
        </div>
    </div>
  )
}

export default Login