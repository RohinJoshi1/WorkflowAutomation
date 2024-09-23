"use client"
const PrimaryButton = ({children,onClick,size="small"}:{children: React.ReactNode,onClick: ()=>void,size?:"small" | "big"}) => {
  return (
    <div className={`${size === "small" ? "text-md" : "text-xl"} ${size === "small" ? "px-10 py-2" : "px-20 py-4"} bg-zapier-orange rounded-full cursor-pointer hover:shadow-lg text-white ` } onClick={onClick}>{children}</div>
  )
}

export default PrimaryButton