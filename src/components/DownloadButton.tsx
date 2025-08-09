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
    <div className="space-y-4">
      {/* ダウンロードボタン */}
      <motion.button
        className={`${getButtonClass()} select-none`}
        onClick={generateAndDownload}
        disabled={disabled || isGenerating}
        whileHover={!disabled && status === "idle" ? { scale: 1.02, y: -2 } : {}}
        whileTap={!disabled && status === "idle" ? { scale: 0.98 } : {}}
        transition={{ duration: 0.2 }}
      >
        {getButtonContent()}
      </motion.button>

      {/* ステータスメッセージ */}
      {status === "generating" && (
        <motion.div
          className="p-4 bg-primary/10 border border-primary/20 rounded-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p className="text-sm text-primary-content text-center">
            高品質なPNG画像を生成しています...
          </p>
        </motion.div>
      )}

      {status === "success" && (
        <motion.div
          className="p-4 bg-success/10 border border-success/20 rounded-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p className="text-sm text-success-content text-center">
            ✨ カードが正常にダウンロードされました！
          </p>
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          className="p-4 bg-error/10 border border-error/20 rounded-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p className="text-sm text-error-content text-center">
            ❌ ダウンロードに失敗しました。もう一度お試しください。
          </p>
        </motion.div>
      )}

      {/* ヘルプテキスト */}
      {!disabled && status === "idle" && (
        <motion.div
          className="text-center text-xs text-base-content/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>💡 高解像度のPNG画像が生成されます</p>
          <p className="mt-1">SNSでのシェアに最適なサイズです</p>
        </motion.div>
      )}
    </div>
  );
};

export default DownloadButton;
