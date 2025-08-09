"use client";

import { useState, useMemo } from "react";
import { Menu, X, Home, Code, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const navItems = useMemo(
    () => [
      { id: "home", label: "ホーム", icon: Home, path: "/" },
      { id: "blog", label: "ブログ", icon: FileText, path: "/blog" },
      { id: "apps", label: "アプリ", icon: Code, path: "/app" },
    ],
    []
  );

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/">
              <motion.h1
                className="text-xl font-bold text-primary cursor-pointer select-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Poler382
              </motion.h1>
            </Link>
          </motion.div>

          {/* デスクトップナビゲーション */}
          <div className="hidden md:block">
            <motion.div
              className="ml-10 flex items-baseline space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {navItems.map(({ id, label, icon: Icon, path }) => (
                <motion.div key={id}>
                  <Link
                    href={path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 select-none ${
                      pathname === path || (path === "/app" && pathname.startsWith("/app"))
                        ? "bg-primary text-white"
                        : "text-base-content hover:bg-base-300 hover:text-primary"
                    }`}
                  >
                    <motion.div
                      animate={
                        pathname === path || (path === "/app" && pathname.startsWith("/app"))
                          ? { rotate: 360 }
                          : { rotate: 0 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      <Icon size={16} />
                    </motion.div>
                    {label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* モバイルメニューボタン */}
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost btn-sm select-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* モバイルメニュー */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" as const }}
            >
              <motion.div
                className="px-2 pt-2 pb-3 space-y-1 bg-base-100 border-t border-base-300 overflow-hidden"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {navItems.map(({ id, label, icon: Icon, path }) => (
                  <motion.div key={id}>
                    <Link
                      href={path}
                      className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center gap-2 select-none ${
                        pathname === path || (path === "/app" && pathname.startsWith("/app"))
                          ? "bg-primary text-white"
                          : "text-base-content hover:bg-base-300 hover:text-primary"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.div
                        animate={
                          pathname === path || (path === "/app" && pathname.startsWith("/app"))
                            ? { rotate: 360 }
                            : { rotate: 0 }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        <Icon size={16} />
                      </motion.div>
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navigation;
