"use client";

import { forwardRef } from "react";
import { User, Github, Twitter, Instagram, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { TechStack } from "@/data/techStacks";
import type { Profile } from "@/types";
import IconParts from "./IconParts";

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
      case "X":
        return `${value}`;
      case "instagram":
        return `${value}`;
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
      <div
        ref={ref}
        className="card bg-base-100 shadow-2xl border border-base-200 select-none"
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
        id="tech-card"
      >
        {/* ヘッダー部分 */}
        <div className="hero bg-gradient-to-br from-primary to-secondary text-primary-content rounded-t-2xl">
          <div className="hero-content py-8">
            <div className="flex items-center space-x-6">
              {/* プロフィール画像 */}
              <div className="avatar online">
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
                  <IconParts
                    icon={<User size={36} />}
                    shapeSetting={{
                      shapeSize: 64,
                      className: "bg-primary-content/20 border-primary-content",
                    }}
                  />
                )}
              </div>

              {/* プロフィール情報 */}
              <div className="flex-1 min-w-0 text-center">
                <h1 className="text-2xl font-bold truncate mb-1">
                  {profile.name || "お名前を入力してください"}
                </h1>

                {/* ソーシャルメディアリンク */}
                <div className="space-y-2">
                  {profile.socialMedia.github && (
                    <div className="flex items-center justify-center gap-2 text-primary-content/90">
                      <Github size={14} />
                      <a
                        href={generateSocialUrl("github", profile.socialMedia.github)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs hover:underline truncate max-w-48"
                      >
                        {profile.socialMedia.github}
                      </a>
                      <ExternalLink size={10} className="opacity-60" />
                    </div>
                  )}
                  {profile.socialMedia.twitter && (
                    <div className="flex items-center justify-center gap-2 text-primary-content/90">
                      <Twitter size={14} />
                      <a
                        href={generateSocialUrl("twitter", profile.socialMedia.twitter)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs hover:underline truncate max-w-48"
                      >
                        @{profile.socialMedia.twitter}
                      </a>
                      <ExternalLink size={10} className="opacity-60" />
                    </div>
                  )}
                  {profile.socialMedia.instagram && (
                    <div className="flex items-center justify-center gap-2 text-primary-content/90">
                      <Instagram size={14} />
                      <a
                        href={generateSocialUrl("instagram", profile.socialMedia.instagram)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs hover:underline truncate max-w-48"
                      >
                        @{profile.socialMedia.instagram}
                      </a>
                      <ExternalLink size={10} className="opacity-60" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 技術スタック部分 */}
        <div className="card-body p-6">
          {techs.length > 0 ? (
            <div className="space-y-6">
              {/* タイトル */}
              <div className="text-center">
                <h2 className="text-xl font-bold text-base-content mb-2">🚀 My Tech Stack</h2>
                <div className="badge badge-primary badge-lg">{techs.length} 技術選択済み</div>
              </div>

              {/* 技術アイコングリッド */}
              <div className="grid grid-cols-4 gap-3">
                {techs.map((tech, index) => {
                  const TechIcon = tech.icon;

                  return (
                    <div
                      key={tech.id}
                      className="card card-compact bg-base-200 hover:bg-base-300 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="card-body items-center text-center p-2">
                        <IconParts
                          name={tech.name}
                          icon={<TechIcon size={32} style={{ color: tech.color }} />}
                          textSetting={{
                            textColor: "text-base-content",
                            textSize: 4,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* カテゴリ別統計 */}
              <div className="divider divider-primary">📊 分野</div>
              <div className="flex flex-wrap justify-center gap-2">
                {Array.from(new Set(techs.map((t) => t.category))).map((category) => (
                  <div key={category} className="badge badge-outline badge-lg gap-2">
                    <span className="font-semibold">{category}</span>
                    <div className="badge badge-primary badge-xs">
                      {techs.filter((t) => t.category === category).length}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="hero py-16">
              <div className="hero-content text-center">
                <div className="max-w-md">
                  <div className="text-6xl mb-6">🛠️</div>
                  <h1 className="text-xl font-bold">技術スタックを追加</h1>
                  <p className="py-4 text-base-content/60">
                    左側から技術を選択して
                    <br />
                    あなたのスキルを表示しましょう
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="card-actions justify-between p-6 pt-0">
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
        </div>
      </div>
    </div>
  );
});

CardPreview.displayName = "CardPreview";

export default CardPreview;
