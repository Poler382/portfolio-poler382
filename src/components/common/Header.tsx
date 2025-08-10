"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Link from "next/link";
import { navigationLinks } from "@/data/sitemap";

const Header = () => {
  const closeDrawer = () => {
    const drawer = document.getElementById("main-drawer") as HTMLInputElement;
    if (drawer) drawer.checked = false;
  };

  return (
    <div className="drawer">
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <motion.header
          className="navbar bg-base-100 shadow-sm"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex-none">
            <label htmlFor="main-drawer" className="btn btn-square btn-ghost">
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
                />
              </svg>
            </label>
          </div>
          <Link href="/" className="flex-1">
            <p className="btn btn-ghost text-2xl">WelCome My Page @Poler382</p>
          </Link>

          <div className="flex-none">
            <button className="btn btn-neutral btn-outline rounded-full flex flex-col gap-1">
              <Github size={20} />
              <span className="hidden sm:inline text-xs p-0 m-0">GitHub</span>
            </button>
          </div>
        </motion.header>
      </div>
      <div className="drawer-side">
        <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay" />
        <aside className="menu bg-base-200 min-h-full w-80 p-4 pt-16">
          <ul className="menu-vertical gap-3">
            {navigationLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="btn btn-ghost justify-start text-base py-3 px-6"
                    onClick={closeDrawer}
                  >
                    <IconComponent size={20} className="mr-2" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Header;
