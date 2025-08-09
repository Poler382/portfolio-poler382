"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import Image from "next/image";
import type { TechStack } from "@/data/techStacks";
import type { Profile } from "@/types";

interface CardPreviewProps {
  profile: Profile;
  techs: TechStack[];
}

const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(({ profile, techs }, ref) => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        ref={ref}
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 select-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
        style={{
          width: "400px",
          minHeight: "500px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
        id="tech-card"
      >
        {/* ヘッダー部分 */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-4">
            {/* プロフィール画像 */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {profile.image ? (
                <Image
                  src={profile.image}
                  alt="プロフィール"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/30 shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
                  <User size={32} className="text-white/70" />
                </div>
              )}
            </motion.div>

            {/* プロフィール情報 */}
            <div className="flex-1 min-w-0">
              <motion.h1 className="text-xl font-bold truncate" variants={itemVariants}>
                {profile.name || "お名前を入力してください"}
              </motion.h1>
              <motion.p className="text-white/80 text-sm" variants={itemVariants}>
                Tech Stack
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* 技術スタック部分 */}
        <motion.div className="p-6" variants={itemVariants}>
          {techs.length > 0 ? (
            <div className="space-y-4">
              <motion.h2
                className="text-lg font-semibold text-gray-800 mb-4"
                variants={itemVariants}
              >
                技術スタック ({techs.length})
              </motion.h2>

              {/* 技術アイコングリッド */}
              <div className="grid grid-cols-4 gap-3">
                {techs.slice(0, 12).map((tech) => {
                  const TechIcon = tech.icon;

                  return (
                    <motion.div
                      key={tech.id}
                      className="group relative"
                      variants={itemVariants}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center space-y-2 h-20 justify-center hover:bg-gray-100 transition-colors duration-200">
                        <TechIcon
                          size={24}
                          style={{ color: tech.color }}
                          className="drop-shadow-sm"
                        />
                        <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                          {tech.name}
                        </span>
                      </div>

                      {/* ツールチップ */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {tech.category}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* 追加の技術がある場合 */}
              {techs.length > 12 && (
                <motion.div
                  className="text-center mt-4 p-3 bg-gray-50 rounded-lg"
                  variants={itemVariants}
                >
                  <span className="text-sm text-gray-600 font-medium">
                    +{techs.length - 12} その他の技術
                  </span>
                </motion.div>
              )}

              {/* カテゴリ別統計 */}
              <motion.div className="mt-6 pt-4 border-t border-gray-200" variants={itemVariants}>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(techs.map((t) => t.category))).map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div className="text-center py-12" variants={itemVariants}>
              <div className="text-4xl mb-3">🛠️</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">技術スタックを追加</h3>
              <p className="text-gray-500 text-sm">左側から技術を選択してください</p>
            </motion.div>
          )}
        </motion.div>

        {/* フッター */}
        <motion.div className="px-6 pb-6" variants={itemVariants}>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Generated by Intro TechStack</span>
              <span>{new Date().toLocaleDateString("ja-JP")}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
});

CardPreview.displayName = "CardPreview";

export default CardPreview;
