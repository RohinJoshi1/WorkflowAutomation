"use client"
import Image from "next/image";
import Hero from "@/components/Hero";
import { HeroVideo } from "@/components/HeroVideo";
export default function Home() {
  return (
   <main> 
      <Hero/> 
      <div className="pt-8">
      <HeroVideo/>
      </div>
      {/* <Video/>  */}
    </main>
  );
}
