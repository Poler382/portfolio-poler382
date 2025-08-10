"use client";

import { motion } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { TechStack } from "@/data/techStacks";

interface SelectedTechListProps {
  techs: TechStack[];
  onRemove?: (tech: TechStack) => void;
}

interface SortableItemProps {
  tech: TechStack;
  index: number;
}

const SortableItem = ({ tech, index }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: tech.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 1,
  };

  const TechIcon = tech.icon;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`card bg-base-100 shadow-md hover:shadow-lg select-none transition-all duration-300 ${
        isDragging
          ? "shadow-2xl ring-2 ring-primary rotate-3 scale-105 opacity-90"
          : "hover:bg-base-200/50"
      }`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05, type: "spring" }}
      whileHover={{ scale: isDragging ? 1.05 : 1.02, y: isDragging ? 0 : -2 }}
    >
      <div className="card-body p-4">
        <div className="flex items-center gap-4">
          {/* 順番バッジ */}
          <div className="badge badge-primary badge-lg font-bold text-white min-w-[2rem]">
            {index + 1}
          </div>

          {/* ドラッグハンドル */}
          <div
            {...attributes}
            {...listeners}
            className={`btn btn-ghost btn-sm btn-square cursor-grab active:cursor-grabbing transition-colors duration-200 ${
              isDragging ? "btn-primary" : "hover:btn-primary"
            }`}
          >
            <GripVertical size={16} />
          </div>

          {/* 技術アイコン */}
          <motion.div
            className="avatar placeholder"
            animate={isDragging ? { rotate: 15, scale: 1.2 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <div className="bg-base-200 text-base-content rounded-full w-12 h-12 flex items-center justify-center">
              <TechIcon size={24} style={{ color: tech.color }} className="drop-shadow-sm" />
            </div>
          </motion.div>

          {/* 技術情報 */}
          <div className="flex-1 min-w-0">
            <h4 className="card-title text-base font-bold truncate">{tech.name}</h4>
            <div className="badge badge-outline badge-sm">{tech.category}</div>
          </div>

          {/* アクションボタン */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
            >
              <li>
                <a className="text-sm">📋 詳細</a>
              </li>
              <li>
                <a className="text-sm text-error">🗑️ 削除</a>
              </li>
            </ul>
          </div>
        </div>

        {/* ドラッグ中のエフェクト */}
        {isDragging && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl" />
        )}
      </div>
    </motion.div>
  );
};

const SelectedTechList = ({ techs }: SelectedTechListProps) => {
  if (techs.length === 0) {
    return (
      <motion.div
        className="hero bg-base-200 rounded-2xl py-20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <div className="hero-content text-center">
          <div className="max-w-md">
            <motion.div
              className="text-8xl mb-8"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              📦
            </motion.div>
            <h1 className="text-2xl font-bold">技術スタックを選択</h1>
            <p className="py-4 text-base-content/60">
              上のセクションから技術を選んで、あなたのスキルセットを構築しましょう
            </p>
            <div className="flex justify-center gap-2">
              <div className="badge badge-outline">🔍 検索</div>
              <div className="badge badge-outline">🏷️ フィルター</div>
              <div className="badge badge-outline">✨ 選択</div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー情報 */}
      <motion.div
        className="alert alert-info"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: "spring" }}
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
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <h3 className="font-bold flex items-center gap-2">
            <GripVertical size={18} />
            ドラッグ&ドロップで順番変更
          </h3>
          <div className="text-xs">技術カードをドラッグして表示順序をカスタマイズできます</div>
        </div>
      </motion.div>

      {/* 統計表示 */}
      <motion.div
        className="stats shadow bg-base-100 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <div className="stat place-items-center">
          <div className="stat-title">選択した技術</div>
          <div className="stat-value text-primary">{techs.length}</div>
          <div className="stat-desc">技術スタック</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">カテゴリ</div>
          <div className="stat-value text-secondary">
            {new Set(techs.map((t) => t.category)).size}
          </div>
          <div className="stat-desc">分野</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">完成度</div>
          <div className="stat-value text-accent">
            {Math.min(100, (techs.length / 8) * 100).toFixed(0)}%
          </div>
          <div className="stat-desc">推奨8個以上</div>
        </div>
      </motion.div>

      {/* 技術リスト */}
      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
        {techs.map((tech, index) => (
          <SortableItem key={tech.id} tech={tech} index={index} />
        ))}
      </div>

      {/* カテゴリ別の分布 */}
      <motion.div
        className="card bg-base-200 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring" }}
      >
        <div className="card-body p-4">
          <h3 className="card-title text-sm mb-3">📊 カテゴリ分布</h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(techs.map((t) => t.category))).map((category) => {
              const count = techs.filter((t) => t.category === category).length;
              return (
                <div key={category} className="badge badge-outline gap-2">
                  <span className="font-semibold">{category}</span>
                  <span className="badge badge-primary badge-xs">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SelectedTechList;
