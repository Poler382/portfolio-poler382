"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, User, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import type { Profile } from "@/types";

interface ProfileSectionProps {
  profile: Profile;
  onProfileChange: (profile: Partial<Profile>) => void;
}

const ProfileSection = ({ profile, onProfileChange }: ProfileSectionProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    <div className="space-y-6">
      {/* 画像アップロード */}
      <div className="space-y-2">
        <label className="label">
          <span className="label-text font-medium">プロフィール画像</span>
          <span className="label-text-alt text-xs">JPG, PNG, GIF (最大5MB)</span>
        </label>

        {!profile.image ? (
          <motion.div
            className={`upload-area border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragOver
                ? "border-primary bg-primary/5 scale-105"
                : "border-base-300 hover:border-primary/50 hover:bg-base-50"
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onClick={() => fileInputRef.current?.click()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={isDragOver ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Upload className="w-12 h-12 text-base-content/40 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-lg font-semibold text-base-content mb-2">
              {isDragOver ? "画像をドロップ" : "画像をアップロード"}
            </h3>
            <p className="text-base-content/60 text-sm">
              クリックして選択、またはドラッグ&ドロップ
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="relative group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-32 h-32 mx-auto">
              <Image
                src={profile.image}
                alt="プロフィール"
                width={128}
                height={128}
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
              <motion.button
                className="absolute -top-2 -right-2 w-8 h-8 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={removeImage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} />
              </motion.button>
            </div>

            <motion.button
              className="mt-4 btn btn-outline btn-sm gap-2 mx-auto block"
              onClick={() => fileInputRef.current?.click()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ImageIcon size={16} />
              画像を変更
            </motion.button>
          </motion.div>
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
      <div className="space-y-2">
        <label className="label">
          <span className="label-text font-medium">お名前</span>
          <span className="label-text-alt text-xs">必須</span>
        </label>
        <motion.div
          className="relative"
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5" />
          <motion.input
            type="text"
            placeholder="山田太郎"
            value={profile.name}
            onChange={(e) => onProfileChange({ name: e.target.value })}
            className="input input-bordered w-full pl-12 transition-all duration-200 focus:scale-105"
            whileFocus={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)" }}
          />
        </motion.div>

        <AnimatePresence>
          {profile.name && (
            <motion.div
              className="flex items-center gap-2 text-success text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="w-2 h-2 bg-success rounded-full"></div>
              名前が設定されました
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfileSection;
