"use client"
import DarkButton  from "@/components/buttons/DarkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL,HOOKS_URL } from "../config";
import LinkButton  from "@/components/buttons/LinkButton";
import { useRouter } from "next/navigation";

interface Zap {
    "id": string,
    "triggerId": string,
    "userId": number,
    "actions": {
        "id": string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "id": string,
            "name": string,
            "image":string
        }
    }[],
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": string,
            "name": string,
            "image":string
        }
    }
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);
    
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/zap`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(res => {
                setZaps(res.data.zaps);
                setLoading(false)
            })
    }, []);

    return {
        loading, zaps
    }
}

export default function Dashboard() {
    
    const { loading, zaps } = useZaps();
    const router = useRouter();    
    return <div>
        <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg	 w-full">
                <div className="flex justify-between pr-8 ">
                    <div className="text-2xl font-bold">
                        My Zaps
                    </div>
                    <DarkButton onClick={() => {
                        router.push("/zap/create");
                    }}>Create</DarkButton>
                </div>
            </div>
        </div>
        {loading ? "Loading..." : <div className="flex justify-center"> <ZapTable zaps={zaps} /> </div>}
    </div>
}

const getDate = (): String =>{
  const date = new Date();
  const now = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  return now; 
}
const CopyableCell = ({ text }:{text:string}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex-1 p-3 text-sm text-gray-500 w-40 overflow-hidden relative group">
      <div className="truncate">{text}</div>
      <button
        onClick={handleCopy}
        className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1 bg-white rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
      >
        {isCopied ? '✓' : 'Copy'}
      </button>
    </div>
  );
};

function ZapTable({ zaps }: {zaps: Zap[]}) {
    const router = useRouter();
    const date = getDate(); 
    
    return (
      <div className="flex justify-center py-16 w-full">
      <div className="p-8 max-w-screen-lg w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex bg-gray-100 font-semibold text-gray-600 border-b border-gray-200">
          <div className="flex-1 p-3">Name</div>
          <div className="flex-1 p-3">ID</div>
          <div className="flex-1 p-3">Created at</div>
          <div className="flex-1 p-3">Webhook URL</div>
          <div className="flex-1 p-3">Go</div>
        </div>
        {zaps.map((z, index) => (
          <div key={index} className="flex border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
            <div className="flex-1 p-3 flex items-center space-x-2">
              <img src={z.trigger.type.image} className="w-8 h-8 object-contain" alt="Trigger" />
              {z.actions.map((x, i) => (
                <img key={i} src={x.type.image} className="w-8 h-8 object-contain" alt={`Action ${i + 1}`} />
              ))}
            </div>
            <div className="flex-1 p-3 font-mono text-sm">{z.id}</div>
            <div className="flex-1 p-3 text-gray-600">{date}</div>
            <CopyableCell text={`${HOOKS_URL}/hooks/catch/1/${z.id}`} />
            <div className="flex-1 p-3">
              <button
                onClick={() => router.push("/zap/" + z.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-150"
              >
                Go
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
    }
    
