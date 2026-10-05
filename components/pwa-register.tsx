"use client";

import { useEffect } from "react";

export default function PwaRegister(){
  useEffect(()=>{
    if(!("serviceWorker" in navigator))return;
    let cancelled=false;
    const register=()=>{if(!cancelled)navigator.serviceWorker.register("/sw.js",{scope:"/"}).catch(()=>undefined)};
    const timer=window.setTimeout(register,1500);
    return()=>{cancelled=true;window.clearTimeout(timer)};
  },[]);
  return null;
}
