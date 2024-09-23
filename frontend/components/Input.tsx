

const Input = ({type="text", label, placeholder, onChange}:{type?: "text"|"password", label:string,placeholder:string,onChange:(e:any)=>void}) => {
  return (
    <div className="flex flex-col px-2 py-1">
        <label className="py-2 font-semibold "><div className="flex"><div className="text-red-600 justify-center align-bottom">* </div><div className="px-1">{label}</div></div></label>
        <input type={type} placeholder={placeholder} className="border-opacity-45 border border-black w-80 px-2 py-2 font-light" onChange={onChange} />
    </div>
  )
}

export default Input