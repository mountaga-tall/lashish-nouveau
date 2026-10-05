"use client";

import { useEffect } from "react";

export default function PwaRegister(){
  useEffect(()=>{
    if(!("serviceWorker" in navigator))return;
    let cancelled=false;
    const register=()=>{if(!cancelled)navigator.serviceWorker.register("/sw.js",{scope:"/"}).catch(()=>undefined)};
    const handle=()=>register();
    if("requestIdleCallback" in window){
      const id=window.requestIdleCallback(register,{timeout:2500});
      return()=>{cancelled=true;window.cancelIdleCallback?.(id)};
    }
    const id=window.setTimeout(handle,1500);
    return()=>{cancelled=true;window.clearTimeout(id)};
  },[]);
  return null;
}
