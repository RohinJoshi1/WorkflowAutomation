"use client"
const LinkButton = ({children,onClick}:{children: React.ReactNode,onClick: ()=>void}) => {
  return (
    <div className="font-weight-50 px-2 py-2 cursor-pointer hover:bg-hover-color rounded" onClick={onClick}>{children}</div>
  )
}

export default LinkButton