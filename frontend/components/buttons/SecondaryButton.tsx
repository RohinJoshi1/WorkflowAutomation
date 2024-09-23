"use client"
const SecondaryButton = ({children,onClick,size="small"}:{children: React.ReactNode,onClick: ()=>void,size?:"small" | "big"}) => {
  return (
    <div className={`${size === "small" ? "text-md" : "text-xl"} ${size === "small" ? "px-10 py-2" : "px-20 py-4"} border-2 border-black bg-zapier-secondary-white rounded-full cursor-pointer hover:shadow-lg text-black font-bold ` } onClick={onClick}>{children}</div>
  )
}

export default SecondaryButton