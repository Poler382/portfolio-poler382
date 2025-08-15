"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

// Components
import Header from "@/components/common/Header";
import ProfileSection from "./components/ProfileSection";
import TechStackSelector from "./components/TechStackSelector";
import SelectedTechList from "./components/SelectedTechList";
import CardPreview from "./components/CardPreview";
import DownloadButton from "./components/DownloadButton";

// Types
import type { TechStack } from "@/data/techStacks";
import type { Profile } from "@/types";
import { Search } from "lucide-react";
import IconParts from "./components/IconParts";

const IntroTechStackPage = () => {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    image: null,
    socialMedia: {
      github: "",
      twitter: "",
      instagram: "",
    },
  });
  const [selectedTechs, setSelectedTechs] = useState<TechStack[]>([]);
  const [cardOrientation, setCardOrientation] = useState<"vertical" | "horizontal">("vertical");

  const handleProfileChange = useCallback((updates: Partial<Profile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleTechSelect = useCallback((tech: TechStack) => {
    setSelectedTechs((prev) => {
      const exists = prev.find((t) => t.id === tech.id);
      if (exists) {
        return prev.filter((t) => t.id !== tech.id);
      }
      return [...prev, tech];
    });
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSelectedTechs((prev) => {
        const oldIndex = prev.findIndex((tech) => tech.id === active.id);
        const newIndex = prev.findIndex((tech) => tech.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <Header />

      {/* ヒーローセクション */}
      <motion.div
        className="hero bg-gradient-to-r from-primary to-secondary text-primary-content py-12 mt-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-content text-center">
          <div className="max-w-md">
            <motion.h1
              className="text-4xl font-bold mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🚀 Tech Stack Builder
            </motion.h1>
            <p className="text-lg opacity-90">あなたの技術スタックを美しいカードで表現しよう</p>
            <div className="flex justify-center gap-2 mt-4">
              <div className="badge badge-primary-content">📸 画像生成</div>
              <div className="badge badge-primary-content">🎨 カスタマイズ</div>
              <div className="badge badge-primary-content">📱 SNS投稿</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* スマホサイズ用プレビュー（上部表示） */}
        <div className="lg:hidden mb-8">
          <motion.div
            className="card bg-base-100 shadow-2xl border border-success/20"
            variants={sectionVariants}
            whileHover={{ scale: 1.01, y: -8 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            <div className="card-body p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="avatar placeholder">
                  <div className="bg-success text-success-content rounded-full w-8 h-8">
                    <span className="text-sm">👁️</span>
                  </div>
                </div>
                <h2 className="card-title text-lg font-bold bg-gradient-to-r from-success to-info bg-clip-text text-transparent">
                  プレビュー
                </h2>
              </div>
              <div className="flex justify-center">
                <div className="transform scale-75 origin-top">
                  <CardPreview
                    profile={profile}
                    techs={selectedTechs}
                    orientation={cardOrientation}
                    onOrientationChange={setCardOrientation}
                    captureId="tech-card-mobile"
                  />
                </div>
              </div>

              {/* コンパクトダウンロードボタン */}
              <div className="flex justify-center mt-4">
                <DownloadButton
                  profile={profile}
                  techs={selectedTechs}
                  disabled={!profile.name || selectedTechs.length === 0}
                  compact={true}
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex gap-6 max-w-7xl mx-auto">
          {/* 設定パネル */}
          <motion.div className="w-2/5 space-y-6" variants={sectionVariants}>
            {/* プロフィール設定 */}
            <motion.div
              className="card bg-base-100 shadow-2xl border border-primary/20"
              variants={sectionVariants}
              whileHover={{ scale: 1.01, y: -8 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <div className="card-body p-6">
                <div className="flex items-center gap-3 mb-4"></div>
                <ProfileSection profile={profile} onProfileChange={handleProfileChange} />
              </div>
            </motion.div>

            {/* 技術スタック選択 */}
            <motion.div
              className="card bg-base-100 shadow-2xl border border-secondary/20"
              variants={sectionVariants}
              whileHover={{ scale: 1.01, y: -8 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <div className="card-body p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="avatar placeholder">
                    <IconParts
                      icon={<Search color="white" />}
                      shapeSetting={{
                        shapeSize: 10,
                        backgroundColor: "bg-secondary",
                        borderColor: "border-secondary",
                      }}
                    />
                  </div>
                  <h2 className="card-title text-xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                    技術スタック選択
                  </h2>
                </div>
                <TechStackSelector selectedTechs={selectedTechs} onTechSelect={handleTechSelect} />
              </div>
            </motion.div>

            {/* 選択した技術の管理 */}
            <motion.div
              className="card bg-base-100 shadow-2xl border border-accent/20"
              variants={sectionVariants}
              whileHover={{ scale: 1.01, y: -8 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <div className="card-body p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-accent text-accent-content rounded-full w-8 h-8">
                        <span className="text-lg">📝</span>
                      </div>
                    </div>
                    <h2 className="card-title text-xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                      選択した技術
                    </h2>
                  </div>
                  <div className="badge badge-accent badge-lg font-bold">
                    {selectedTechs.length}
                  </div>
                </div>
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext
                    items={selectedTechs.map((tech) => tech.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <SelectedTechList techs={selectedTechs} onRemove={handleTechSelect} />
                  </SortableContext>
                </DndContext>
              </div>
            </motion.div>
          </motion.div>

          {/* デスクトップ用プレビューパネル（右側固定） */}
          <motion.div className="hidden lg:block flex-1" variants={sectionVariants}>
            <div className="sticky top-24">
              <motion.div
                className="card bg-base-100 shadow-2xl border border-success/20"
                variants={sectionVariants}
                whileHover={{ scale: 1.01, y: -8 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <div className="card-body p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="avatar placeholder">
                      <div className="bg-success text-success-content rounded-full w-8 h-8">
                        <span className="text-sm">👁️</span>
                      </div>
                    </div>
                    <h2 className="card-title text-lg font-bold bg-gradient-to-r from-success to-info bg-clip-text text-transparent">
                      リアルタイムプレビュー
                    </h2>
                  </div>
                  <div className="flex justify-center">
                    <CardPreview
                      profile={profile}
                      techs={selectedTechs}
                      orientation={cardOrientation}
                      onOrientationChange={setCardOrientation}
                      captureId="tech-card-desktop"
                    />
                  </div>

                  {/* コンパクトダウンロードボタン */}
                  <div className="flex justify-center mt-4">
                    <DownloadButton
                      profile={profile}
                      techs={selectedTechs}
                      disabled={!profile.name || selectedTechs.length === 0}
                      compact={true}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* フッター情報 */}
        <motion.div
          className="text-center mt-16 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="divider divider-primary">✨ Made with daisyUI</div>
          <p className="text-base-content/60">
            美しいデザインシステムで作られた技術スタック生成ツール
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IntroTechStackPage;
