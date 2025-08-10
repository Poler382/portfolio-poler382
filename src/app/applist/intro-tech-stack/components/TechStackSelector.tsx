"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Check } from "lucide-react";
import { techStacks, categories, getCategoryColor } from "@/data/techStacks";
import type { TechStack } from "@/data/techStacks";
import IconParts from "./IconParts";

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
    <div className="space-y-8">
      {/* 検索とフィルター */}
      <div className="space-y-6">
        {/* 検索バー */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-lg">🔍 技術を検索</span>
            <span className="label-text-alt badge badge-info badge-sm">
              {filteredTechs.length}件
            </span>
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5 z-10" />
            <motion.input
              type="text"
              placeholder="React, TypeScript, Node.js..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered input-primary w-full pl-12 text-lg transition-all duration-300 focus:input-primary focus:shadow-lg"
              whileFocus={{ scale: 1.02, boxShadow: "0 0 0 3px hsl(var(--p) / 0.2)" }}
            />
          </div>
        </div>

        {/* カテゴリフィルター */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="dropdown dropdown-bottom">
            <motion.div
              tabIndex={0}
              role="button"
              className="btn btn-outline btn-primary gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter size={16} />
              {selectedCategory === "All" ? "🌟 すべて" : selectedCategory}
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </motion.div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 max-h-64 overflow-auto"
            >
              {allCategories.map((category) => (
                <li key={category}>
                  <motion.button
                    className={`justify-start gap-3 ${
                      selectedCategory === category ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedCategory(category);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {category === "All" ? (
                      <>
                        <span className="text-lg">🌟</span>
                        <span>すべて</span>
                      </>
                    ) : (
                      <>
                        <div
                          className="w-4 h-4 rounded-full border-2 border-base-content/20"
                          style={{ backgroundColor: getCategoryColor(category) }}
                        />
                        <span>{category}</span>
                      </>
                    )}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {selectedCategory !== "All" && (
            <motion.button
              className="btn btn-ghost btn-sm gap-2"
              onClick={() => setSelectedCategory("All")}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✕ クリア
            </motion.button>
          )}
        </div>
      </div>

      {/* 技術一覧 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-h-96 overflow-y-auto p-2">
        <AnimatePresence mode="popLayout">
          {filteredTechs.map((tech, index) => {
            const selected = isSelected(tech.id);
            const TechIcon = tech.icon;

            return (
              <motion.div
                key={tech.id}
                className={`card cursor-pointer transition-all duration-300 ${
                  selected
                    ? "bg-primary text-primary-content shadow-xl ring-2 ring-primary ring-offset-2"
                    : "bg-base-100 hover:bg-base-200 shadow-md hover:shadow-lg"
                }`}
                onClick={() => onTechSelect(tech)}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.03,
                  type: "spring",
                  layout: { duration: 0.3 },
                }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                layout
              >
                <div className="card-body items-center text-center p-4">
                  {/* 選択チェック */}
                  <AnimatePresence>
                    {selected && (
                      <motion.div
                        className="absolute -top-2 -right-2 badge badge-success badge-lg p-1"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <Check size={16} className="text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* アイコン */}
                  <motion.div
                    className="mb-2"
                    animate={selected ? { rotate: 5, scale: 1.1 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconParts
                      icon={<TechIcon color={tech.color} size={32} />}
                      name={tech.name}
                      shapeSetting={{
                        shapeSize: 64,
                        className: `${selected ? "bg-primary-content/20" : "bg-base-200"} `,
                      }}
                      iconSetting={{
                        iconSize: 64,
                        iconColor: `bg-[#${tech.color}]`,
                      }}
                      textSetting={{
                        textColor: "text-black",
                        textSize: 8,
                      }}
                    />
                  </motion.div>

                  {/* カテゴリバッジ */}
                  <div
                    className={`badge badge-sm ${
                      selected ? "badge-primary-content" : "badge-ghost"
                    }`}
                  >
                    {tech.category}
                  </div>
                </div>

                {/* ホバーエフェクト */}
                {!selected && (
                  <div className="absolute inset-0 opacity-0 hover:opacity-5 bg-gradient-to-br from-primary to-secondary rounded-2xl transition-opacity duration-300" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 検索結果が空の場合 */}
      {filteredTechs.length === 0 && (
        <motion.div
          className="hero bg-base-200 rounded-2xl py-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="hero-content text-center">
            <div className="max-w-md">
              <div className="text-6xl mb-4">🔍</div>
              <h1 className="text-2xl font-bold">技術が見つかりません</h1>
              <p className="py-4 text-base-content/60">
                検索条件を変更するか、カテゴリフィルターをクリアしてお試しください
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                🔄 リセット
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 選択済み技術の統計 */}
      {selectedTechs.length > 0 && (
        <motion.div
          className="alert alert-success"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
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
          <div>
            <h3 className="font-bold">選択完了！</h3>
            <div className="text-xs">
              ✨ {selectedTechs.length}個の技術を選択中 | 📊{" "}
              {new Set(selectedTechs.map((t) => t.category)).size}カテゴリ
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TechStackSelector;
