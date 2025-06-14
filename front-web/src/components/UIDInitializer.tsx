"use client";

import { useEffect } from "react";

function generateUID(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export default function UIDInitializer() {
  useEffect(() => {
    if (!localStorage.getItem('uid')) {
      localStorage.setItem('uid', generateUID());
    }
  }, []);

  return null;
}