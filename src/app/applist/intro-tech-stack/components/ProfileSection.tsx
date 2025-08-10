"use client";

import { useState, useRef } from "react";
import { Upload, User, X, Image as ImageIcon, Github, Twitter, Instagram } from "lucide-react";
import Image from "next/image";
import type { Profile } from "@/types";
import IconParts from "./IconParts";

interface ProfileSectionProps {
  profile: Profile;
  onProfileChange: (profile: Partial<Profile>) => void;
}

const ProfileSection = ({ profile, onProfileChange }: ProfileSectionProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [urlErrors, setUrlErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // バリデーション関数
  const validateInput = (value: string, platform: string): string => {
    if (!value.trim()) return ""; // 空の場合はエラーなし

    switch (platform) {
      case "github":
        try {
          new URL(value);
          if (!value.includes("github.com")) {
            return "GitHub URLを入力してください";
          }
          return ""; // 正常
        } catch {
          return "正しいURL形式で入力してください";
        }
      case "twitter":
        // アカウント名形式のバリデーション
        const twitterPattern = /^[a-zA-Z0-9_]{1,15}$/;
        if (!twitterPattern.test(value)) {
          return "有効なX(Twitter)アカウント名を入力してください（@なし、英数字と_のみ、15文字以内）";
        }
        return ""; // 正常
      case "instagram":
        // アカウント名形式のバリデーション
        const instagramPattern = /^[a-zA-Z0-9_.]{1,30}$/;
        if (!instagramPattern.test(value)) {
          return "有効なInstagramアカウント名を入力してください（@なし、英数字と._のみ、30文字以内）";
        }
        return ""; // 正常
      default:
        return "";
    }
  };

  // ソーシャルメディア変更ハンドラー
  const handleSocialMediaChange = (platform: string, value: string) => {
    const error = validateInput(value, platform);
    setUrlErrors((prev) => ({ ...prev, [platform]: error }));

    onProfileChange({
      socialMedia: { ...profile.socialMedia, [platform]: value },
    });
  };

  const handleImageUpload = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onProfileChange({ image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const removeImage = () => {
    onProfileChange({ image: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-8">
      {/* 画像アップロード */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-lg">📸 プロフィール画像</span>
          <span className="label-text-alt badge badge-ghost badge-sm">JPG, PNG, GIF</span>
        </label>

        {!profile.image ? (
          <div
            className={`upload-area border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragOver
                ? "border-primary bg-primary/10 shadow-lg transform scale-105"
                : "border-base-300 hover:border-primary/60 hover:bg-base-200/50"
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="mb-6">
              <IconParts
                icon={<Upload />}
                iconSetting={{
                  iconSize: 8,
                  iconColor: "text-primary",
                }}
                shapeSetting={{
                  backgroundColor: "bg-primary/20",
                  borderColor: "border-primary",
                  shapeSize: 16,
                }}
              />
            </div>
            <h3 className="text-xl font-bold text-base-content mb-3">
              {isDragOver ? "画像をドロップ！" : "画像をアップロード"}
            </h3>
            <p className="text-base-content/70">クリックして選択、またはドラッグ&ドロップ</p>
            <div className="divider divider-primary my-4">OR</div>
            <div className="btn btn-outline btn-primary btn-sm gap-2">
              <Upload size={16} />
              ファイルを選択
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="avatar online placeholder group relative mb-6">
              <div className="w-40 h-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 shadow-xl relative overflow-hidden">
                <Image
                  src={profile.image}
                  alt="プロフィール"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <button
                  className="absolute top-2 right-2 btn btn-circle btn-error btn-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
                  onClick={removeImage}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <button
              className="btn btn-outline btn-primary gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon size={16} />
              画像を変更
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* 名前入力 */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-lg">👤 お名前</span>
          <span className="label-text-alt badge badge-error badge-sm">必須</span>
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5 z-10" />
          <input
            type="text"
            placeholder="山田太郎"
            value={profile.name}
            onChange={(e) => onProfileChange({ name: e.target.value })}
            className="input input-bordered input-primary w-full pl-12 text-lg font-medium transition-all duration-300 focus:input-primary focus:shadow-lg"
          />
        </div>

        {profile.name && (
          <div className="alert alert-success mt-3">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">✨ 素晴らしい！名前が設定されました</span>
          </div>
        )}
      </div>

      {/* ソーシャルメディア */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold text-lg">🌐 ソーシャルメディア</span>
          <span className="label-text-alt badge badge-ghost badge-sm">任意</span>
        </label>

        <div className="space-y-4">
          {/* GitHub */}
          <div className="relative">
            <Github className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5 z-10" />
            <input
              type="text"
              placeholder="https://github.com/username"
              value={profile.socialMedia.github}
              onChange={(e) => handleSocialMediaChange("github", e.target.value)}
              className={`input input-bordered w-full pl-12 transition-all duration-300 focus:shadow-lg ${
                urlErrors.github ? "input-error" : "focus:input-primary"
              }`}
            />
            {urlErrors.github && (
              <div className="label">
                <span className="label-text-alt text-error text-xs">⚠️ {urlErrors.github}</span>
              </div>
            )}
          </div>

          {/* Twitter/X */}
          <div className="relative">
            <Twitter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5 z-10" />
            <input
              type="text"
              placeholder="username"
              value={profile.socialMedia.twitter}
              onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
              className={`input input-bordered w-full pl-12 transition-all duration-300 focus:shadow-lg ${
                urlErrors.twitter ? "input-error" : "focus:input-primary"
              }`}
            />
            {urlErrors.twitter && (
              <div className="label">
                <span className="label-text-alt text-error text-xs">⚠️ {urlErrors.twitter}</span>
              </div>
            )}
          </div>

          {/* Instagram */}
          <div className="relative">
            <Instagram className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5 z-10" />
            <input
              type="text"
              placeholder="username"
              value={profile.socialMedia.instagram}
              onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
              className={`input input-bordered w-full pl-12 transition-all duration-300 focus:shadow-lg ${
                urlErrors.instagram ? "input-error" : "focus:input-primary"
              }`}
            />
            {urlErrors.instagram && (
              <div className="label">
                <span className="label-text-alt text-error text-xs">⚠️ {urlErrors.instagram}</span>
              </div>
            )}
          </div>
        </div>

        {/* ソーシャルメディア入力完了表示 */}
        {(profile.socialMedia.github ||
          profile.socialMedia.twitter ||
          profile.socialMedia.instagram) &&
          !Object.values(urlErrors).some((error) => error) && (
            <div className="alert alert-info mt-4">
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
              <div>
                <h3 className="font-bold">📱 ソーシャルメディア設定完了</h3>
                <div className="text-xs flex gap-2">
                  {profile.socialMedia.github && (
                    <span className="badge badge-ghost badge-xs">GitHub</span>
                  )}
                  {profile.socialMedia.twitter && (
                    <span className="badge badge-ghost badge-xs">X</span>
                  )}
                  {profile.socialMedia.instagram && (
                    <span className="badge badge-ghost badge-xs">Instagram</span>
                  )}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProfileSection;
