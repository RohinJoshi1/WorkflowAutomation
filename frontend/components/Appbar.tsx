"use client"
import LinkButton from "./buttons/LinkButton"
import {useRouter} from "next/navigation"
import PrimaryButton from "./buttons/PrimaryButton"
const Appbar = () => {
  const router = useRouter()
  return (
    <div className="flex border-b-2 justify-between bg-zapier-white">
        <div className="flex items-center font-extrabold text-2xl px-4 py-2 hover:cursor-pointer" onClick={()=> router.push("/")}>
            ZAPIER
        </div>
        <div className="flex justify-between items-center py-2 px-2">
            <LinkButton onClick={()=>{console.log("")}}> Globe </LinkButton>
            <LinkButton onClick={()=>{router.push("/sales")}}> Contact Sales </LinkButton>
            <LinkButton onClick={()=>{router.push("/login")}}> Login </LinkButton>
            <div className="flex items-center px-4 py-2">
            <PrimaryButton onClick={()=>{router.push("/signup")}}>Sign up </PrimaryButton>
            </div>
            
        </div>
    </div>
  )
}

export default Appbar