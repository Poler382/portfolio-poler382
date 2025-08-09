"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code, FileText, Sparkles } from "lucide-react";
import Header from "@/components/Header";
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

        {/* ナビゲーション */}
        <motion.div className="flex justify-center gap-6 mb-16" variants={cardVariants}>
          <Link
            href="/blog"
            className="btn btn-outline btn-lg gap-3 hover:scale-105 transition-transform"
          >
            <FileText size={24} />
            ブログ
          </Link>
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
              >
                <Link href={app.path} className="block">
                  <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* カードヘッダー */}
                    <div className={`card-body p-0 bg-gradient-to-br ${app.color} text-white`}>
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 bg-white/20 rounded-xl">
                            <IconComponent size={32} />
                          </div>
                          <h2 className="card-title text-2xl font-bold">{app.title}</h2>
                        </div>
                        <p className="text-white/90 leading-relaxed">{app.description}</p>
                      </div>
                    </div>

                    {/* カードボディ */}
                    <div className="card-body">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-base-content flex items-center gap-2">
                          <Sparkles size={18} className="text-primary" />
                          主な機能
                        </h3>
                        <ul className="space-y-2">
                          {app.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center gap-3 text-base-content/80"
                            >
                              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="card-actions justify-end mt-6">
                        <motion.button
                          className="btn btn-primary gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          アプリを開く
                          <ArrowRight size={18} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Coming Soon セクション */}
        <motion.div className="text-center mt-16" variants={cardVariants}>
          <div className="card bg-base-100 shadow-lg max-w-2xl mx-auto">
            <div className="card-body">
              <h3 className="card-title text-2xl justify-center mb-4">🚧 More Apps Coming Soon</h3>
              <p className="text-base-content/70">
                新しいアプリケーションを開発中です。
                <br />
                お楽しみにお待ちください！
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default HomePage;
