import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Shop from "../Components/Shop";
import BGSweetBannerTailwind from "../Components/BGSweetBannerTailwind";

export default function HomePage() {
  return (
    <>
      <Navbar />
     <Hero/>
     <BGSweetBannerTailwind/>
     <Shop/>
    </>
  );
}
