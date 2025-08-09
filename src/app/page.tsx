"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code, FileText, Sparkles } from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/Footer";

interface AppCard {
  title: string;
  description: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  features: string[];
}

const HomePage = () => {
  const apps: AppCard[] = [
    {
      title: "IntroTechStack",
      description: "技術スタックをカード形式で美しく表示し、PNG画像として保存できるツールです。",
      path: "/app/intro-tech-stack",
      icon: Code,
      color: "from-blue-500 to-purple-600",
      features: [
        "技術スタックの視覚化",
        "カスタマイズ可能なデザイン",
        "PNG形式でのエクスポート",
        "ドラッグ&ドロップ対応",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Header />

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* ヒーローセクション */}
        <motion.div className="text-center mb-16" variants={cardVariants}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-base-content mb-6">
            Welcome to My Apps
          </h1>
          <p className="text-lg sm:text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
            便利なWebアプリケーションを作成しています。
            <br />
            各アプリは独自の機能を持ち、日々の作業を効率化します。
          </p>
        </motion.div>

        {/* アプリケーション一覧 */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
        >
          {apps.map((app) => {
            const IconComponent = app.icon;

            return (
              <motion.div
                key={app.path}
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -10 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default HomePage;
