"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { TechStack } from "@/data/techStacks";
import IconParts from "./IconParts";

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
    <div
      ref={setNodeRef}
      style={style}
      className={`card bg-base-100 shadow-md hover:shadow-lg select-none transition-all duration-300 cursor-pointer ${
        isDragging
          ? "shadow-2xl ring-2 ring-primary rotate-3 scale-105 opacity-90 z-50"
          : "hover:bg-base-200/50 hover:scale-[1.02] hover:-translate-y-0.5"
      }`}
    >
      <div className="card-body p-3">
        <div className="flex items-center gap-3">
          {/* 順番バッジ */}
          <div className="badge badge-primary badge-lg font-bold text-white min-w-[2rem]">
            {index + 1}
          </div>

          {/* ドラッグハンドル */}
          <div
            {...attributes}
            {...listeners}
            className={`btn btn-ghost btn-sm btn-square cursor-grab active:cursor-grabbing transition-colors duration-200 touch-none ${
              isDragging ? "btn-primary" : "hover:btn-primary"
            }`}
          >
            <GripVertical size={16} />
          </div>

          {/* 技術アイコン */}
          <div
            className={`transition-transform duration-300 ${
              isDragging ? "rotate-[15deg] scale-110" : ""
            }`}
          >
            <IconParts
              icon={<TechIcon size={16} style={{ color: tech.color }} />}
              shapeSetting={{
                shapeSize: 24,
                className: "bg-base-200",
              }}
              iconSetting={{
                iconSize: 24,
              }}
            />
          </div>

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
    </div>
  );
};

const SelectedTechList = ({ techs }: SelectedTechListProps) => {
  if (techs.length === 0) {
    return (
      <div className="hero bg-base-200 rounded-2xl py-20">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="text-8xl mb-8 animate-pulse">📦</div>
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー情報 */}
      <div className="alert alert-info">
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
            <GripVertical size={8} />
            ドラッグ&ドロップで順番変更
          </h3>
          <div className="text-xs">技術カードをドラッグして表示順序をカスタマイズできます</div>
        </div>
      </div>

      {/* 技術リスト */}
      <div className="space-y-2  overflow-y-auto pr-2">
        {techs.map((tech, index) => (
          <SortableItem key={tech.id} tech={tech} index={index} />
        ))}
      </div>

      {/* カテゴリ別の分布 */}
      <div className="card bg-base-200 shadow-md">
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
      </div>
    </div>
  );
};

export default SelectedTechList;
