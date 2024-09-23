"use client"
import PrimaryButton from "./buttons/PrimaryButton"
import SecondaryButton from "./buttons/SecondaryButton"
import { useRouter } from "next/navigation"
const Hero = () => {
   const router = useRouter(); 
  return (
    <div> 
        <div className="flex justify-center py-2 pt-4">
            <div className="flex justify-center text-5xl font-semibold pt-8 max-w-xl text-center">
                Automate as fast as you can type
            </div>
        </div>
        
        <div className="flex justify-center py-2">
            <div className="flex justify-center text-2xl font-light pt-4 max-w-md text-center">
                Automation workflow tool 
            </div>
        </div>
        <div>
        <div className="flex justify-center pt-4">
            <div className="px-2">
            <PrimaryButton onClick={()=>router.push("/login")} size="big">Start Free with Email</PrimaryButton>
            </div>
            <div className="px-2">
            <SecondaryButton onClick={()=>{}} size="big">Start Free with Gmail</SecondaryButton>
            </div>
        </div>
        </div>
        
    </div>
  )
}

export default Hero