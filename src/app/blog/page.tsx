"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "WebエンジニアからProduct Managerへの転身体験記",
      excerpt:
        "エンジニアリング経験を活かしたプロダクトマネジメントへの挑戦について、実際の経験を踏まえて詳しく解説します。",
      date: "2024-12-01",
      readTime: "8分",
      category: "キャリア",
      slug: "engineer-to-pm-journey",
      featured: true,
    },
    {
      id: 2,
      title: "Next.js 15とFramer Motionで作るモダンポートフォリオ",
      excerpt:
        "最新のNext.js 15とFramer Motionを使用して、インタラクティブなポートフォリオサイトを構築する方法を解説します。",
      date: "2024-11-15",
      readTime: "12分",
      category: "技術",
      slug: "nextjs-framer-motion-portfolio",
      featured: false,
    },
    {
      id: 3,
      title: "プロダクトマネージャーが知っておくべき技術トレンド2024",
      excerpt:
        "2024年にプロダクトマネージャーとして押さえておきたい技術トレンドとその活用方法について考察します。",
      date: "2024-10-30",
      readTime: "10分",
      category: "PM",
      slug: "pm-tech-trends-2024",
      featured: false,
    },
    {
      id: 4,
      title: "UnityでWebGLゲーム開発：パフォーマンス最適化のコツ",
      excerpt:
        "UnityでWebGLビルドを行う際のパフォーマンス最適化テクニックと実践的なノウハウを紹介します。",
      date: "2024-10-10",
      readTime: "15分",
      category: "ゲーム開発",
      slug: "unity-webgl-optimization",
      featured: false,
    },
  ];

  const categories = ["全て", "技術", "キャリア", "PM", "ゲーム開発"];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "技術":
        return "bg-primary/10 text-primary";
      case "キャリア":
        return "bg-secondary/10 text-secondary";
      case "PM":
        return "bg-blue-100 text-blue-600";
      case "ゲーム開発":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-base-200 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* ヘッダー */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              ホームに戻る
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold text-base-content mb-4">ブログ</h1>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              技術、プロダクトマネジメント、キャリアについての考察や学びを発信しています
            </p>
          </motion.div>

          {/* カテゴリーフィルター */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  index === 0
                    ? "bg-primary text-white"
                    : "bg-base-100 text-base-content hover:bg-base-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* 注目記事 */}
          {blogPosts
            .filter((post) => post.featured)
            .map((post) => (
              <motion.div
                key={post.id}
                className="bg-base-100 rounded-2xl shadow-lg overflow-hidden mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                      注目記事
                    </span>
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(
                        post.category
                      )}`}
                    >
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-base-content mb-3">
                    {post.title}
                  </h2>
                  <p className="text-base-content/70 text-lg leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/60 mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(post.date).toLocaleDateString("ja-JP")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      {post.readTime}
                    </div>
                  </div>
                  <motion.button
                    className="btn btn-primary gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    記事を読む
                    <ExternalLink size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}

          {/* 記事一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post, index) => (
                <motion.article
                  key={post.id}
                  className="bg-base-100 rounded-xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <div className="p-6">
                    <div className="mb-4">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(
                          post.category
                        )}`}
                      >
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-base-content mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-base-content/70 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-base-content/60 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(post.date).toLocaleDateString("ja-JP")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </div>
                    </div>
                    <motion.button
                      className="btn btn-outline btn-sm w-full gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      記事を読む
                      <ExternalLink size={14} />
                    </motion.button>
                  </div>
                </motion.article>
              ))}
          </div>

          {/* ページネーション（将来的に実装） */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <p className="text-base-content/60">その他の記事は準備中です...</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
