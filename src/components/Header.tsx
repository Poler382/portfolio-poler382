"use client";

import { motion } from "framer-motion";
import { Sparkles, Github, Share2 } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      className="bg-base-100 shadow-sm border-b border-base-300"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* ロゴとタイトル */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-base-content">Poler382</h1>
            </div>
          </motion.div>

          {/* ナビゲーション */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              className="btn btn-ghost btn-sm gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={16} />
              <span className="hidden sm:inline">GitHub</span>
            </motion.button>
            <motion.button
              className="btn btn-primary btn-sm gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={16} />
              <span className="hidden sm:inline">シェア</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
