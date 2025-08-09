"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

// Components
import Header from "@/components/Header";
import ProfileSection from "@/components/ProfileSection";
import TechStackSelector from "@/components/TechStackSelector";
import SelectedTechList from "@/components/SelectedTechList";
import CardPreview from "@/components/CardPreview";
import DownloadButton from "@/components/DownloadButton";

// Types
import type { TechStack } from "@/data/techStacks";
import type { Profile } from "@/types";

const IntroTechStackPage = () => {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    image: null,
  });
  const [selectedTechs, setSelectedTechs] = useState<TechStack[]>([]);

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
    <div className="min-h-screen bg-base-200">
      <Header />

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* 設定パネル */}
          <motion.div className="space-y-6" variants={sectionVariants}>
            {/* プロフィール設定 */}
            <motion.div
              className="card bg-base-100 shadow-xl"
              variants={sectionVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card-body">
                <h2 className="card-title text-xl font-bold text-primary">プロフィール設定</h2>
                <ProfileSection profile={profile} onProfileChange={handleProfileChange} />
              </div>
            </motion.div>

            {/* 技術スタック選択 */}
            <motion.div
              className="card bg-base-100 shadow-xl"
              variants={sectionVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card-body">
                <h2 className="card-title text-xl font-bold text-primary">技術スタック選択</h2>
                <TechStackSelector selectedTechs={selectedTechs} onTechSelect={handleTechSelect} />
              </div>
            </motion.div>

            {/* 選択した技術の管理 */}
            <motion.div
              className="card bg-base-100 shadow-xl"
              variants={sectionVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card-body">
                <h2 className="card-title text-xl font-bold text-primary">
                  選択した技術 ({selectedTechs.length})
                </h2>
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

          {/* プレビューパネル */}
          <motion.div className="space-y-6" variants={sectionVariants}>
            {/* カードプレビュー */}
            <motion.div
              className="card bg-base-100 shadow-xl"
              variants={sectionVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card-body">
                <h2 className="card-title text-xl font-bold text-primary">プレビュー</h2>
                <div className="flex justify-center">
                  <CardPreview profile={profile} techs={selectedTechs} />
                </div>
              </div>
            </motion.div>

            {/* ダウンロード */}
            <motion.div
              className="card bg-base-100 shadow-xl"
              variants={sectionVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card-body">
                <h2 className="card-title text-xl font-bold text-primary">ダウンロード</h2>
                <DownloadButton
                  profile={profile}
                  techs={selectedTechs}
                  disabled={!profile.name || selectedTechs.length === 0}
                />
                {(!profile.name || selectedTechs.length === 0) && (
                  <div className="alert alert-info">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="stroke-current shrink-0 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>名前を入力し、技術スタックを選択してください</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroTechStackPage;
