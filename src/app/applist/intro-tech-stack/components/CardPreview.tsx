"use client";

import { forwardRef } from "react";
import { User, Github, Twitter, Instagram, ExternalLink, RotateCcw } from "lucide-react";
import Image from "next/image";
import type { TechStack } from "@/data/techStacks";
import type { Profile } from "@/types";
import IconParts from "./IconParts";

interface CardPreviewProps {
  profile: Profile;
  techs: TechStack[];
  orientation?: "vertical" | "horizontal";
  onOrientationChange?: (orientation: "vertical" | "horizontal") => void;
  captureId?: string;
}

const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(
  ({ profile, techs, orientation = "vertical", onOrientationChange, captureId }, ref) => {
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

    const isHorizontal = orientation === "horizontal";
    const horizontalColumns = techs.length > 18 ? 6 : 5;
    const verticalColumns = 3;
    const columns = isHorizontal ? horizontalColumns : verticalColumns;
    const maxRows = isHorizontal ? 3 : 5; // デザイナー推奨: 横は3行、縦は5行に制限
    const maxVisibleTechs = columns * maxRows;
    const displayedTechs = techs.slice(0, maxVisibleTechs);
    const extraCount = Math.max(0, techs.length - displayedTechs.length);

    return (
      <div className={`w-full mx-auto ${isHorizontal ? "max-w-[960px]" : "max-w-[360px]"}`}>
        {onOrientationChange && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => onOrientationChange(isHorizontal ? "vertical" : "horizontal")}
              className="btn btn-ghost btn-sm gap-2"
              title={`${isHorizontal ? "縦向き" : "横向き"}に切り替え`}
            >
              <RotateCcw size={16} />
              {isHorizontal ? "縦向き" : "横向き"}
            </button>
          </div>
        )}

        <div
          className={`relative w-full max-h-[85vh]`}
          style={{ aspectRatio: isHorizontal ? "16 / 9" : "9 / 16" }}
        >
          <div
            ref={ref}
            id={captureId || "tech-card"}
            data-orientation={orientation}
            className={`absolute inset-0 card bg-base-100 shadow-2xl border border-base-200 rounded-2xl overflow-hidden flex ${
              isHorizontal ? "flex-row" : "flex-col"
            }`}
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {/* ヘッダー部分 */}
            <div
              className={`hero min-h-0 bg-gradient-to-br from-primary to-secondary text-primary-content ${
                isHorizontal ? "basis-1/3 h-full" : ""
              }`}
            >
              <div className={`hero-content ${isHorizontal ? "py-6 px-6" : "py-4"}`}>
                <div
                  className={`flex items-center ${
                    isHorizontal ? "flex-col space-y-4" : "space-x-6"
                  }`}
                >
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
                  <div className={`flex-1 min-w-0 text-center ${isHorizontal ? "w-full" : ""}`}>
                    <h1
                      className={`${isHorizontal ? "text-2xl" : "text-xl"} font-bold truncate mb-1`}
                    >
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

            {/* 右サイド（本文+フッター） */}
            <div className={`flex flex-1 min-w-0 ${isHorizontal ? "flex-col" : "flex-col"}`}>
              {/* 技術スタック部分 */}
              <div className={`card-body ${isHorizontal ? "flex-1 p-8" : "p-6"} overflow-hidden`}>
                {techs.length > 0 ? (
                  <div className="space-y-6">
                    {/* タイトル */}
                    <div className="text-center">
                      <h2
                        className={`${
                          isHorizontal ? "text-xl" : "text-lg"
                        } font-bold text-base-content mb-2`}
                      >
                        🚀 My Tech Stack
                      </h2>
                      <div
                        className={`badge badge-primary ${isHorizontal ? "badge-md" : "badge-sm"}`}
                      >
                        {techs.length} 技術選択済み
                      </div>
                    </div>

                    {/* 技術アイコングリッド */}
                    <div
                      className={`grid ${isHorizontal ? "gap-4" : "gap-3"} ${
                        isHorizontal
                          ? techs.length > 18
                            ? "grid-cols-6"
                            : "grid-cols-5"
                          : "grid-cols-3"
                      }`}
                    >
                      {displayedTechs.map((tech) => {
                        const TechIcon = tech.icon;

                        return (
                          <div
                            key={tech.id}
                            className="card card-compact bg-base-200 hover:bg-base-300 shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            <div className="card-body items-center text-center p-2">
                              <IconParts
                                name={tech.name}
                                icon={
                                  <TechIcon
                                    size={isHorizontal ? 32 : 28}
                                    style={{ color: tech.color }}
                                  />
                                }
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
                    {extraCount > 0 && (
                      <div className="flex justify-center">
                        <div className="badge badge-outline">+{extraCount} more</div>
                      </div>
                    )}

                    {/* カテゴリ別統計（溢れがある場合は省略） */}
                    {extraCount === 0 && (
                      <>
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
                      </>
                    )}
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
              <div
                className={`mt-auto card-actions justify-between ${
                  isHorizontal ? "p-8 pt-0" : "p-6 pt-0"
                }`}
              >
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
        </div>
      </div>
    );
  }
);

CardPreview.displayName = "CardPreview";

export default CardPreview;
