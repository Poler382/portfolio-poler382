"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Check } from "lucide-react";
import { techStacks, categories, getCategoryColor } from "@/data/techStacks";
import type { TechStack } from "@/data/techStacks";

interface TechStackSelectorProps {
  selectedTechs: TechStack[];
  onTechSelect: (tech: TechStack) => void;
}

const TechStackSelector = ({ selectedTechs, onTechSelect }: TechStackSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCategories, setShowCategories] = useState(false);

  const filteredTechs = useMemo(() => {
    return techStacks.filter((tech) => {
      const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || tech.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const isSelected = (techId: string) => {
    return selectedTechs.some((tech) => tech.id === techId);
  };

  const allCategories = ["All", ...categories];

  return (
    <div className="space-y-6">
      {/* 検索とフィルター */}
      <div className="space-y-4">
        {/* 検索バー */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5" />
          <motion.input
            type="text"
            placeholder="技術名で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full pl-12 transition-all duration-200"
            whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)" }}
          />
        </div>

        {/* カテゴリフィルター */}
        <div className="flex items-center gap-2">
          <motion.button
            className="btn btn-outline btn-sm gap-2"
            onClick={() => setShowCategories(!showCategories)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter size={16} />
            {selectedCategory === "All" ? "すべて" : selectedCategory}
          </motion.button>

          <div className="text-sm text-base-content/60">{filteredTechs.length}件の技術</div>
        </div>

        {/* カテゴリ選択 */}
        <AnimatePresence>
          {showCategories && (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 bg-base-200 rounded-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {allCategories.map((category) => (
                <motion.button
                  key={category}
                  className={`btn btn-sm justify-start ${
                    selectedCategory === category ? "btn-primary" : "btn-ghost"
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowCategories(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category === "All" ? (
                    <span>すべて</span>
                  ) : (
                    <>
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: getCategoryColor(category) }}
                      />
                      {category}
                    </>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 技術一覧 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {filteredTechs.map((tech, index) => {
            const selected = isSelected(tech.id);
            const TechIcon = tech.icon;

            return (
              <motion.div
                key={tech.id}
                className={`relative p-4 rounded-xl border-2 cursor-pointer select-none transition-all duration-200 ${
                  selected
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-base-300 hover:border-primary/50 hover:shadow-md"
                }`}
                onClick={() => onTechSelect(tech)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  layout: { duration: 0.3 },
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                layout
              >
                {/* 選択チェック */}
                <AnimatePresence>
                  {selected && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <Check size={14} className="text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* アイコンと名前 */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <motion.div
                    animate={selected ? { rotate: 5 } : { rotate: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TechIcon size={32} style={{ color: tech.color }} className="drop-shadow-sm" />
                  </motion.div>
                  <span className="text-xs font-medium text-base-content leading-tight">
                    {tech.name}
                  </span>
                </div>

                {/* ホバー時のグラデーション */}
                <div className="absolute inset-0 opacity-0 hover:opacity-10 bg-gradient-to-br from-primary to-secondary rounded-xl transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 検索結果が空の場合 */}
      {filteredTechs.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-base-content mb-2">技術が見つかりません</h3>
          <p className="text-base-content/60">検索条件を変更してお試しください</p>
        </motion.div>
      )}

      {/* 選択済み技術の数 */}
      {selectedTechs.length > 0 && (
        <motion.div
          className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-success-content">✨ {selectedTechs.length}個の技術を選択中</p>
        </motion.div>
      )}
    </div>
  );
};

export default TechStackSelector;
