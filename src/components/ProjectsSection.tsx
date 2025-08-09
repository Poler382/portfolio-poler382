"use client";

import { ExternalLink, Github, Calendar, Code2, Star } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Next.js と TypeScript を使用したモダンなECサイト。Stripe決済、ユーザー認証、在庫管理機能を実装。レスポンシブデザインとパフォーマンス最適化に重点を置いて開発。",
      image: "/api/placeholder/400/250",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL"],
      githubUrl: "https://github.com/Poler382/ecommerce-platform",
      liveUrl: "https://ecommerce-demo.vercel.app",
      status: "Production",
      year: "2023",
      features: ["決済機能", "在庫管理", "ユーザー認証", "レスポンシブデザイン"],
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "React と Firebase を使用したタスク管理アプリケーション。リアルタイム同期、チーム協業機能、カスタマイズ可能なワークフローを提供。",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Firebase", "Material-UI", "TypeScript"],
      githubUrl: "https://github.com/Poler382/task-management",
      liveUrl: "https://taskapp-demo.web.app",
      status: "Active",
      year: "2022",
      features: ["リアルタイム同期", "チーム機能", "カスタムワークフロー", "プッシュ通知"],
    },
    {
      id: 3,
      title: "Unity 3D Game",
      description:
        "Unityで開発した3Dアクションゲーム。C#スクリプト、物理エンジン、パーティクルシステムを活用。WebGLビルドでブラウザ上でプレイ可能。",
      image: "/api/placeholder/400/250",
      technologies: ["Unity", "C#", "Blender", "WebGL"],
      githubUrl: "https://github.com/Poler382/unity-3d-game",
      liveUrl: "https://poler382.itch.io/adventure-game",
      status: "Released",
      year: "2021",
      features: ["3Dアクション", "物理演算", "パーティクル", "WebGL対応"],
    },
    {
      id: 4,
      title: "Python Data Analysis Tool",
      description:
        "Pandas と Matplotlib を使用したデータ分析・可視化ツール。CSV/JSON形式のデータを読み込み、統計分析とグラフ生成を自動化。",
      image: "/api/placeholder/400/250",
      technologies: ["Python", "Pandas", "Matplotlib", "Streamlit", "NumPy"],
      githubUrl: "https://github.com/Poler382/data-analysis-tool",
      liveUrl: "https://data-tool-demo.streamlit.app",
      status: "Active",
      year: "2022",
      features: ["データ可視化", "統計分析", "CSV/JSON対応", "インタラクティブUI"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Production":
        return "badge-success";
      case "Active":
        return "badge-primary";
      case "Released":
        return "badge-secondary";
      default:
        return "badge-neutral";
    }
  };

  return (
    <section id="projects" className="py-20 bg-base-200" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* セクションヘッダー */}
          <motion.div className="text-center mb-16" variants={cardVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">作成物紹介</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Web開発、ゲーム開発、データ分析など、様々な技術領域での制作物をご紹介します。
            </p>
          </motion.div>

          {/* プロジェクトグリッド */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-base-100 rounded-2xl shadow-lg overflow-hidden group"
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                transition={{ duration: 0.3 }}
              >
                {/* プロジェクト画像 */}
                <motion.div
                  className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 5 }}
                  >
                    <Code2 size={48} className="text-primary/40" />
                  </motion.div>
                  <div className="absolute top-4 left-4">
                    <motion.span
                      className={`badge ${getStatusColor(project.status)} badge-sm`}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {project.status}
                    </motion.span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 text-base-content/60">
                    <Calendar size={14} />
                    <span className="text-sm">{project.year}</span>
                  </div>
                </motion.div>

                {/* プロジェクト詳細 */}
                <div className="p-6">
                  <motion.h3
                    className="text-xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    className="text-base-content/70 mb-4 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* 主要機能 */}
                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <h4 className="font-semibold text-base-content mb-2 flex items-center gap-2">
                      <Star size={16} className="text-primary" />
                      主要機能
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, featureIndex) => (
                        <motion.span
                          key={featureIndex}
                          className="px-2 py-1 bg-accent text-base-content text-xs rounded-md"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                          transition={{ delay: 0.9 + index * 0.1 + featureIndex * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* 技術スタック */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <h4 className="font-semibold text-base-content mb-2 flex items-center gap-2">
                      <Code2 size={16} className="text-secondary" />
                      技術スタック
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="px-3 py-1 bg-base-300 text-base-content text-sm rounded-full font-medium"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                          transition={{ delay: 1.1 + index * 0.1 + techIndex * 0.05 }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "var(--primary)",
                            color: "white",
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* アクションボタン */}
                  <motion.div
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm flex-1 gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} />
                      Code
                    </motion.a>
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm flex-1 gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16} />
                      Demo
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* GitHub プロフィールへのリンク */}
          <motion.div className="text-center mt-16" variants={cardVariants}>
            <motion.div
              className="bg-accent rounded-lg p-8 max-w-2xl mx-auto"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-base-content mb-4 flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Github size={24} className="text-primary" />
                </motion.div>
                その他のプロジェクト
              </h3>
              <p className="text-base-content/70 mb-6">
                GitHubでは、これ以外にも多くのプロジェクトを公開しています。
                実験的なコードやライブラリの検証なども含まれています。
              </p>
              <motion.a
                href="https://github.com/Poler382"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
                GitHub プロフィールを見る
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
