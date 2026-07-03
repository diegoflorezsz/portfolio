"use client";

import { useEffect, useState } from "react";

const MOBILE_WIDTH = 768;

function getIsPortraitMobile() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.innerWidth <= MOBILE_WIDTH || window.matchMedia("(orientation: portrait)").matches;
}

export function useIsPortraitMobile() {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);

  useEffect(() => {
    const orientationQuery = window.matchMedia("(orientation: portrait)");
    const updatePortraitMobile = () => setIsPortraitMobile(getIsPortraitMobile());

    updatePortraitMobile();
    window.addEventListener("resize", updatePortraitMobile);
    orientationQuery.addEventListener("change", updatePortraitMobile);

    return () => {
      window.removeEventListener("resize", updatePortraitMobile);
      orientationQuery.removeEventListener("change", updatePortraitMobile);
    };
  }, []);

  return isPortraitMobile;
}