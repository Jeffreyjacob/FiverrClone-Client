"use client"
import Authwrapper from "@/components/Authwrapper";
import Companies from "@/components/landing/Companies";
import Everything from "@/components/landing/Everything";
import FiverrBusiness from "@/components/landing/FiverrBusiness";
import HeroBanner from "@/components/landing/Herobanner";
import JoinFiverr from "@/components/landing/JoinFiverr";
import PopularServices from "@/components/landing/PopularServices";
import Services from "@/components/landing/Services";
import { useStateContext } from "@/context/StateContext";




export default function Home() {
  const {showLoginModal,showSignUpModal} = useStateContext()
  return (
    <div>
       <HeroBanner/>
       <Companies/>
       <PopularServices/>
       <Everything/>
       <Services/>
       <FiverrBusiness/>
       <JoinFiverr/>
       {
        (showLoginModal || showSignUpModal) &&  
         <Authwrapper type={showLoginModal ? "login":"signup"}/>
       }
    </div>
  );
}
