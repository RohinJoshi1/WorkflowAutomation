
export const ZapCell = ({
    name,
    index,
    onClick
}: {
    name?: string, 
    index: number,
    onClick: () => void

}) => {
    return <div className="border border-black py-7 px-7 flex w-80 justify-center cursor-pointer" onClick={onClick}>
        <div className="flex text-xl">
            <div className="font-bold">
                {index}. 
            </div>
            <div>
                {name}
            </div>
        </div>
    </div>
}