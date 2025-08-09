"use client";

import { motion } from "framer-motion";
import { Sparkles, Github, Share2 } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <motion.header
      className="navbar bg-base-100 shadow-sm "
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl">WelCome My Page @Poler382</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-neutral btn-outline rounded-full flex flex-col gap-1">
          <Github size={20} />
          <span className="hidden sm:inline text-xs p-0 m-0">GitHub</span>
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
