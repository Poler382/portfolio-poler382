"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { User, Github, Twitter, Instagram, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { TechStack } from "@/data/techStacks";
import type { Profile } from "@/types";

interface CardPreviewProps {
  profile: Profile;
  techs: TechStack[];
}

const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(({ profile, techs }, ref) => {
  // ソーシャルメディアのURL生成関数
  const generateSocialUrl = (platform: string, value: string): string => {
    if (!value) return "";

    switch (platform) {
      case "github":
        return value; // GitHubは既にURL形式
      case "twitter":
        return `https://x.com/${value}`;
      case "instagram":
        return `https://instagram.com/${value}`;
      default:
        return value;
    }
  };

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
        className="card bg-base-100 shadow-2xl border border-base-200 select-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.02, y: -8 }}
        transition={{ duration: 0.3, type: "spring" }}
        style={{
          width: "400px",
          minHeight: "500px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
        id="tech-card"
      >
        {/* ヘッダー部分 */}
        <motion.div
          className="hero bg-gradient-to-br from-primary to-secondary text-primary-content rounded-t-2xl"
          variants={itemVariants}
        >
          <div className="hero-content py-8">
            <div className="flex items-center space-x-6">
              {/* プロフィール画像 */}
              <motion.div
                className="avatar online"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                {profile.image ? (
                  <div className="w-20 h-20 rounded-full ring ring-primary-content ring-offset-base-100 ring-offset-2">
                    <Image
                      src={profile.image}
                      alt="プロフィール"
                      width={80}
                      height={80}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-primary-content/20 ring ring-primary-content ring-offset-base-100 ring-offset-2 flex items-center justify-center">
                    <User size={36} className="text-primary-content/70" />
                  </div>
                )}
              </motion.div>

              {/* プロフィール情報 */}
              <div className="flex-1 min-w-0 text-center">
                <motion.h1 className="text-2xl font-bold truncate mb-1" variants={itemVariants}>
                  {profile.name || "お名前を入力してください"}
                </motion.h1>
                <motion.div
                  className="badge badge-primary-content badge-lg mb-3"
                  variants={itemVariants}
                >
                  ✨ Tech Stack Portfolio
                </motion.div>

                {/* ソーシャルメディアリンク */}
                <motion.div className="flex justify-center gap-2" variants={itemVariants}>
                  {profile.socialMedia.github && (
                    <motion.a
                      href={generateSocialUrl("github", profile.socialMedia.github)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-circle btn-sm bg-primary-content/20 hover:bg-primary-content/30 border-none"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github size={16} className="text-primary-content" />
                    </motion.a>
                  )}
                  {profile.socialMedia.twitter && (
                    <motion.a
                      href={generateSocialUrl("twitter", profile.socialMedia.twitter)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-circle btn-sm bg-primary-content/20 hover:bg-primary-content/30 border-none"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Twitter size={16} className="text-primary-content" />
                    </motion.a>
                  )}
                  {profile.socialMedia.instagram && (
                    <motion.a
                      href={generateSocialUrl("instagram", profile.socialMedia.instagram)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-circle btn-sm bg-primary-content/20 hover:bg-primary-content/30 border-none"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Instagram size={16} className="text-primary-content" />
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 技術スタック部分 */}
        <motion.div className="card-body p-6" variants={itemVariants}>
          {techs.length > 0 ? (
            <div className="space-y-6">
              {/* タイトル */}
              <motion.div className="text-center" variants={itemVariants}>
                <h2 className="text-xl font-bold text-base-content mb-2">🚀 My Tech Stack</h2>
                <div className="badge badge-primary badge-lg">{techs.length} 技術選択済み</div>
              </motion.div>

              {/* 技術アイコングリッド */}
              <div className="grid grid-cols-4 gap-3">
                {techs.slice(0, 12).map((tech, index) => {
                  const TechIcon = tech.icon;

                  return (
                    <motion.div
                      key={tech.id}
                      className="card card-compact bg-base-200 hover:bg-base-300 shadow-sm hover:shadow-md transition-all duration-200"
                      variants={itemVariants}
                      whileHover={{ scale: 1.1, y: -4 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                    >
                      <div className="card-body items-center text-center p-3">
                        <div className="avatar placeholder mb-1">
                          <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center">
                            <TechIcon
                              size={20}
                              style={{ color: tech.color }}
                              className="drop-shadow-sm"
                            />
                          </div>
                        </div>
                        <span className="text-xs font-bold text-base-content leading-tight">
                          {tech.name}
                        </span>
                      </div>

                      {/* ツールチップ */}
                      <div className="tooltip tooltip-top absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <div className="badge badge-neutral badge-sm">{tech.category}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* 追加の技術がある場合 */}
              {techs.length > 12 && (
                <motion.div className="alert alert-info" variants={itemVariants}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium">+{techs.length - 12} その他の技術も習得済み</span>
                </motion.div>
              )}

              {/* カテゴリ別統計 */}
              <motion.div className="divider divider-primary" variants={itemVariants}>
                📊 分野
              </motion.div>
              <motion.div className="flex flex-wrap justify-center gap-2" variants={itemVariants}>
                {Array.from(new Set(techs.map((t) => t.category))).map((category) => (
                  <div key={category} className="badge badge-outline badge-lg gap-2">
                    <span className="font-semibold">{category}</span>
                    <div className="badge badge-primary badge-xs">
                      {techs.filter((t) => t.category === category).length}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          ) : (
            <motion.div className="hero py-16" variants={itemVariants}>
              <div className="hero-content text-center">
                <div className="max-w-md">
                  <motion.div
                    className="text-6xl mb-6"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🛠️
                  </motion.div>
                  <h1 className="text-xl font-bold">技術スタックを追加</h1>
                  <p className="py-4 text-base-content/60">
                    左側から技術を選択して
                    <br />
                    あなたのスキルを表示しましょう
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* フッター */}
        <motion.div className="card-actions justify-between p-6 pt-0" variants={itemVariants}>
          <div className="flex items-center gap-2 text-xs text-base-content/60">
            <div className="badge badge-ghost badge-xs">Generated by</div>
            <span className="font-semibold">Intro TechStack</span>
          </div>
          <div className="flex items-center gap-2">
            {/* ソーシャルメディア情報表示 */}
            {(profile.socialMedia.github ||
              profile.socialMedia.twitter ||
              profile.socialMedia.instagram) && (
              <div className="flex items-center gap-1">
                {profile.socialMedia.github && (
                  <div className="tooltip tooltip-top" data-tip="GitHub">
                    <Github size={12} className="text-base-content/40" />
                  </div>
                )}
                {profile.socialMedia.twitter && (
                  <div className="tooltip tooltip-top" data-tip="X">
                    <Twitter size={12} className="text-base-content/40" />
                  </div>
                )}
                {profile.socialMedia.instagram && (
                  <div className="tooltip tooltip-top" data-tip="Instagram">
                    <Instagram size={12} className="text-base-content/40" />
                  </div>
                )}
                <div className="divider divider-horizontal"></div>
              </div>
            )}
            <div className="text-xs text-base-content/60">
              {new Date().toLocaleDateString("ja-JP")}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
});

CardPreview.displayName = "CardPreview";

export default CardPreview;
