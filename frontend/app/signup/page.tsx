"use client"
import PrimaryButton from "@/components/buttons/PrimaryButton"
import Input from "@/components/Input"
import { useState } from "react"
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation"
import axios from "axios"
const SignUp = () => {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  return (
    <div className="items-center flex justify-center py-10"> 
        <div className="flex flex-col items-center justify-center w-full h-2/3 py-5 px-10 ">
            <div className="font-bold text-2xl">Sign Up</div>
            <Input type="text" placeholder="John Doe" label="Name" onChange={(e)=>{setName(e.target.value)}} />
            <Input type="text" placeholder="abc@gmail.com" label="Email" onChange={(e)=>{setEmail(e.target.value)}} />
            <Input type="password" placeholder="Password" label="Password" onChange={(e)=>{setPassword(e.target.value)}} />   
            <div className="px-2 py-3">
            <PrimaryButton onClick={async ()=>{
                console.log("####")
                console.log(name,email,password)
                try {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
                        name: name, 
                        email: email,
                        password: password
                    })
                    router.push("/login")
                } catch (error) {
                    <div>INCORRECT DATA</div>
                    console.log(error)  
                }
            }} size="big">Get Started Free </PrimaryButton>
            </div>    
        </div>
    </div>
  )
}

export default SignUp