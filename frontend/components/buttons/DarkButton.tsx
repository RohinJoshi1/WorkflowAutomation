"use client"
const DarkButton = ({children,onClick}:{children: React.ReactNode,onClick: ()=>void}) => {
  return (
    <div className="font-weight-50 px-2 py-2 cursor-pointer hover:shadow-md bg-slate-800 rounded w-52 text-zapier-white text-center justify-items-center" onClick={onClick}>{children}</div>
  )
}

export default DarkButton