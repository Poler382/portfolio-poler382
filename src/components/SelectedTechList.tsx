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
      className={`group relative bg-base-100 rounded-xl p-4 border-2 shadow-sm transition-all duration-200 ${
        isDragging
          ? "border-primary shadow-lg scale-105 rotate-2 opacity-80"
          : "border-base-300 hover:border-primary/50 hover:shadow-md"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: isDragging ? 1.05 : 1.02, y: isDragging ? 0 : -2 }}
    >
      {/* ドラッグハンドル */}
      <div
        {...attributes}
        {...listeners}
        className={`absolute left-2 top-1/2 transform -translate-y-1/2 p-1 rounded cursor-grab active:cursor-grabbing transition-colors duration-200 ${
          isDragging ? "text-primary" : "text-base-content/40 hover:text-primary"
        }`}
      >
        <GripVertical size={16} />
      </div>

      {/* 順番表示 */}
      <div className="absolute top-2 left-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
        {index + 1}
      </div>

      {/* 技術アイコンと名前 */}
      <div className="flex items-center space-x-4 ml-8">
        <motion.div
          className="flex-shrink-0"
          animate={isDragging ? { rotate: 10 } : { rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          <TechIcon size={28} style={{ color: tech.color }} className="drop-shadow-sm" />
        </motion.div>

        <div className="min-w-0 flex-1">
          <h4 className="font-medium text-base-content truncate">{tech.name}</h4>
          <p className="text-sm text-base-content/60">{tech.category}</p>
        </div>
      </div>

      {/* ドラッグ中の視覚効果 */}
      {isDragging && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl" />
      )}
    </motion.div>
  );
};

const SelectedTechList = ({ techs }: SelectedTechListProps) => {
  if (techs.length === 0) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-lg font-semibold text-base-content mb-2">技術を選択してください</h3>
        <p className="text-base-content/60">上のセクションから技術スタックを選んでください</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 説明 */}
      <motion.div
        className="p-4 bg-info/10 border border-info/20 rounded-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <p className="text-sm text-info-content flex items-center gap-2">
          <GripVertical size={16} />
          ドラッグして技術の順番を変更できます
        </p>
      </motion.div>

      {/* 技術リスト */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {techs.map((tech, index) => (
          <SortableItem key={tech.id} tech={tech} index={index} />
        ))}
      </div>

      {/* 統計表示 */}
      <motion.div
        className="grid grid-cols-2 gap-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-center p-4 bg-base-200 rounded-lg">
          <div className="text-2xl font-bold text-primary">{techs.length}</div>
          <div className="text-sm text-base-content/60">選択した技術</div>
        </div>
        <div className="text-center p-4 bg-base-200 rounded-lg">
          <div className="text-2xl font-bold text-secondary">
            {new Set(techs.map((t) => t.category)).size}
          </div>
          <div className="text-sm text-base-content/60">カテゴリ数</div>
        </div>
      </motion.div>
    </div>
  );
};

export default SelectedTechList;
