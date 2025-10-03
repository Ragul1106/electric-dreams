import React, { useEffect, useState } from "react";
import CallbackLanding from "../components/CallbackLanding";
import CallbackSection2 from "../components/CallbackSection2";
import CallbackSection3 from "../components/CallbackSection3";
export default function Emergency() {
    return (
    <div className="w-full mt-10">
      <CallbackLanding />
      <CallbackSection2 />
      <CallbackSection3 />
    </div>
  );
}