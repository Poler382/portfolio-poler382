"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader, CheckCircle, AlertCircle } from "lucide-react";
import html2canvas from "html2canvas";
import type { TechStack } from "@/data/techStacks";
import type { Profile } from "@/types";

interface DownloadButtonProps {
  profile: Profile;
  techs: TechStack[];
  disabled?: boolean;
}

const DownloadButton = ({ profile, disabled }: DownloadButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<"idle" | "generating" | "success" | "error">("idle");

  const generateAndDownload = async () => {
    if (disabled || isGenerating) return;

    setIsGenerating(true);
    setStatus("generating");

    try {
      // カード要素を取得
      const cardElement = document.getElementById("tech-card");

      if (!cardElement) {
        throw new Error("カード要素が見つかりません");
      }

      // html2canvasの設定
      const canvas = await html2canvas(cardElement, {
        backgroundColor: "#ffffff",
        scale: 2, // 高解像度で生成
        useCORS: true,
        allowTaint: true,
        width: 400,
        height: Math.max(500, cardElement.scrollHeight),
        scrollX: 0,
        scrollY: 0,
        windowWidth: 400,
        windowHeight: Math.max(500, cardElement.scrollHeight),
      });

      // Canvas を Blob に変換
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // ダウンロード用のリンクを作成
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            // ファイル名を生成（名前_techstack_日付.png）
            const fileName = `${profile.name || "techstack"}_${
              new Date().toISOString().split("T")[0]
            }.png`;

            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // メモリクリーンアップ
            URL.revokeObjectURL(url);

            setStatus("success");
            setTimeout(() => setStatus("idle"), 2000);
          } else {
            throw new Error("Blob の生成に失敗しました");
          }
        },
        "image/png",
        0.9
      );
    } catch (error) {
      console.error("カード生成エラー:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    } finally {
      setIsGenerating(false);
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case "generating":
        return (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            生成中...
          </>
        );
      case "success":
        return (
          <>
            <CheckCircle className="w-5 h-5" />
            ダウンロード完了
          </>
        );
      case "error":
        return (
          <>
            <AlertCircle className="w-5 h-5" />
            エラーが発生
          </>
        );
      default:
        return (
          <>
            <Download className="w-5 h-5" />
            PNG でダウンロード
          </>
        );
    }
  };

  const getButtonClass = () => {
    if (disabled) {
      return "btn btn-disabled w-full gap-2";
    }

    switch (status) {
      case "generating":
        return "btn btn-primary w-full gap-2 loading";
      case "success":
        return "btn btn-success w-full gap-2";
      case "error":
        return "btn btn-error w-full gap-2";
      default:
        return "btn btn-primary w-full gap-2";
    }
  };

  return (
    <div className="space-y-6">
      {/* メインダウンロードボタン */}
      <motion.button
        className={`${getButtonClass()} select-none text-lg font-bold shadow-lg`}
        onClick={generateAndDownload}
        disabled={disabled || isGenerating}
        whileHover={!disabled && status === "idle" ? { scale: 1.05, y: -4 } : {}}
        whileTap={!disabled && status === "idle" ? { scale: 0.95 } : {}}
        transition={{ duration: 0.3, type: "spring" }}
      >
        {getButtonContent()}
      </motion.button>

      {/* ステータスアラート */}
      {status === "generating" && (
        <motion.div
          className="alert alert-info"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring" }}
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
            <h3 className="font-bold">画像生成中</h3>
            <div className="text-xs">高品質なPNG画像を作成しています...</div>
          </div>
          <div>
            <progress className="progress progress-info w-20"></progress>
          </div>
        </motion.div>
      )}

      {status === "success" && (
        <motion.div
          className="alert alert-success"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: "spring", stiffness: 200 }}
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
            <h3 className="font-bold">✨ ダウンロード完了！</h3>
            <div className="text-xs">カードが正常に保存されました</div>
          </div>
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          className="alert alert-error"
          initial={{ opacity: 0, scale: 0.95, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.95, x: 20 }}
          transition={{ type: "spring", stiffness: 200 }}
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
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-bold">エラーが発生</h3>
            <div className="text-xs">もう一度お試しください</div>
          </div>
        </motion.div>
      )}

      {/* 機能説明カード */}
      {!disabled && status === "idle" && (
        <motion.div
          className="card bg-base-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <div className="card-body p-4">
            <h3 className="card-title text-sm">📸 ダウンロード機能</h3>
            <div className="space-y-2 text-xs text-base-content/70">
              <div className="flex items-center gap-2">
                <div className="badge badge-primary badge-xs"></div>
                <span>高解像度PNG画像 (2倍スケール)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="badge badge-secondary badge-xs"></div>
                <span>SNS投稿に最適なサイズ</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="badge badge-accent badge-xs"></div>
                <span>透明背景に対応</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* クイックアクション */}
      {!disabled && status === "idle" && (
        <motion.div
          className="flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="tooltip tooltip-top" data-tip="Twitter用最適化">
            <button className="btn btn-circle btn-outline btn-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="LinkedIn用最適化">
            <button className="btn btn-circle btn-outline btn-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
          </div>
          <div className="tooltip tooltip-top" data-tip="Instagram用最適化">
            <button className="btn btn-circle btn-outline btn-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DownloadButton;
