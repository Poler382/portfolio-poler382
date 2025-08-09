"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code, ArrowLeft } from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/Footer";

interface AppCard {
  title: string;
  description: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  features: string[];
  status: "available" | "coming-soon";
}

const AppsPage = () => {
  const apps: AppCard[] = [
    {
      title: "IntroTechStack",
      description:
        "技術スタックをカード形式で美しく表示し、PNG画像として保存できるツールです。SNSでのシェアに最適です。",
      path: "/app/intro-tech-stack",
      icon: Code,
      color: "from-blue-500 to-purple-600",
      status: "available",
      features: [
        "技術スタックの視覚化",
        "カスタマイズ可能なデザイン",
        "PNG形式でのエクスポート",
        "ドラッグ&ドロップでの並び替え",
        "プロフィール画像のアップロード",
      ],
    },
  ];

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

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
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
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* ヘッダー */}
        <motion.div className="text-center mb-12" variants={cardVariants}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6 select-none"
          >
            <ArrowLeft size={20} />
            ホームに戻る
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-base-content mb-4">
            アプリケーション一覧
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            日々の作業を効率化する便利なWebアプリケーションをご紹介します
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
              >
                {app.status === "available" ? (
                  <Link href={app.path} className="block h-full">
                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full select-none">
                      {/* カードヘッダー */}
                      <div className={`bg-gradient-to-br ${app.color} text-white p-6`}>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 bg-white/20 rounded-xl">
                            <IconComponent size={32} />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-2xl font-bold">{app.title}</h2>
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                              利用可能
                            </span>
                          </div>
                        </div>
                        <p className="text-white/90 leading-relaxed">{app.description}</p>
                      </div>

                      {/* カードボディ */}
                      <div className="card-body flex-1">
                        <div className="space-y-3 flex-1">
                          <h3 className="font-semibold text-base-content">主な機能</h3>
                          <ul className="space-y-2">
                            {app.features.map((feature, featureIndex) => (
                              <li
                                key={featureIndex}
                                className="flex items-center gap-3 text-base-content/80 text-sm"
                              >
                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="card-actions justify-end mt-6">
                          <motion.button
                            className="btn btn-primary gap-2 select-none"
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
                ) : (
                  <div className="card bg-base-100 shadow-xl overflow-hidden h-full opacity-75 select-none">
                    {/* Coming Soon カード */}
                    <div className={`bg-gradient-to-br ${app.color} text-white p-6`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                          <IconComponent size={32} />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold">{app.title}</h2>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                            開発中
                          </span>
                        </div>
                      </div>
                      <p className="text-white/90 leading-relaxed">{app.description}</p>
                    </div>

                    <div className="card-body flex-1">
                      <div className="space-y-3 flex-1">
                        <h3 className="font-semibold text-base-content">予定機能</h3>
                        <ul className="space-y-2">
                          {app.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center gap-3 text-base-content/60 text-sm"
                            >
                              <div className="w-2 h-2 bg-base-300 rounded-full flex-shrink-0"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="card-actions justify-end mt-6">
                        <button className="btn btn-disabled gap-2 select-none">Coming Soon</button>
                      </div>
                    </div>
                  </div>
                )}
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
                新しいアプリケーションを随時開発中です。
                <br />
                各アプリはオープンソースで公開予定です。
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default AppsPage;
