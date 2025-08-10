"use client";

import { Calendar, MapPin, Briefcase, TrendingUp, GraduationCap } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const timeline = [
    {
      year: "〜2019",
      title: "機械学習専攻",
      company: "大学",
      description:
        "機械学習を専攻。統計・アルゴリズム・データ分析の基礎を修得し、以後の実務の土台を形成。",
      skills: ["Machine Learning", "Python", "統計", "データ分析"],
      icon: GraduationCap,
      color: "from-primary to-secondary",
    },
    {
      year: "2019-2023",
      title: "Web/ネイティブエンジニア & スクラムマスター",
      company: "ベネッセ（進研ゼミ中学講座）",
      description:
        "進研ゼミ中学講座のサービス開発を担当。PG/SMを兼任し、Web/ネイティブ双方で開発とチームファシリテーションを推進。",
      skills: ["React", "Next.js", "TypeScript", "Unity", "iOS/Android", "Scrum"],
      icon: Briefcase,
      color: "from-secondary to-primary",
    },
    {
      year: "2023-2024",
      title: "スクラムマスター（調査PJリード）",
      company: "ベネッセ（開発部/事業部 兼務）",
      description:
        "開発部と事業部を兼務し、調査プロジェクトをSMとしてリード。透明性と学びの可視化を軸に、意思決定の質と速度を向上。",
      skills: ["Scrum Master", "調査設計", "アジリティ", "ステークホルダー調整"],
      icon: Briefcase,
      color: "from-primary to-secondary",
    },
    {
      year: "2024-現在",
      title: "プロダクトオーナー（新規事業開発）",
      company: "ベネッセ",
      description:
        "立ち上がり期の新規事業開発においてPOを担当。SM的な伴走やPGとのコミュニケーション、営業との折衝など、全セグメントと連携して推進。",
      skills: ["Product Owner", "仮説検証", "課題発見", "営業折衝", "ステークホルダー管理"],
      icon: TrendingUp,
      color: "from-secondary to-primary",
    },
  ];

  return (
    <section id="about" className="py-20 bg-base-100" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* セクションヘッダー */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">経歴紹介</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Webエンジニアからプロダクトマネージャーへの転身。技術的な深い理解を活かした
              プロダクト作りにチャレンジしています。
            </p>
          </motion.div>

          {/* タイムライン */}
          <motion.div className="relative" variants={itemVariants}>
            {/* 縦線 */}
            <motion.div
              className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary to-secondary"
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" as const, delay: 0.5 }}
            />

            <div className="space-y-12">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={index}
                    className={`relative flex ${isLeft ? "sm:justify-start" : "sm:justify-end"}`}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.3 }}
                  >
                    {/* アイコン */}
                    <motion.div
                      className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center z-10"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.4, delay: 1 + index * 0.3 }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <Icon size={16} className="text-white" />
                    </motion.div>

                    {/* コンテンツカード */}
                    <motion.div
                      className={`ml-12 sm:ml-0 sm:w-5/12 ${!isLeft ? "sm:mr-12" : "sm:ml-12"}`}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-base-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        {/* 年度とタイトル */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar size={16} className="text-primary" />
                            <span className="text-sm font-medium text-primary">{item.year}</span>
                          </div>
                          <h3 className="text-xl font-bold text-base-content mb-1">{item.title}</h3>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-secondary" />
                            <span className="text-secondary font-medium">{item.company}</span>
                          </div>
                        </div>

                        {/* 説明文 */}
                        <p className="text-base-content/70 mb-4 leading-relaxed">
                          {item.description}
                        </p>

                        {/* スキルタグ */}
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill, skillIndex) => (
                            <motion.span
                              key={skillIndex}
                              className="px-3 py-1 bg-base-300 text-base-content text-sm rounded-full font-medium"
                              initial={{ opacity: 0, scale: 0 }}
                              animate={
                                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
                              }
                              transition={{
                                duration: 0.3,
                                delay: 1.2 + index * 0.3 + skillIndex * 0.1,
                              }}
                              whileHover={{
                                scale: 1.1,
                                backgroundColor: "var(--primary)",
                                color: "white",
                              }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* 追加情報 */}
          <motion.div className="mt-16 text-center" variants={itemVariants}>
            <motion.div
              className="bg-accent rounded-lg p-8 max-w-3xl mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-base-content mb-4">現在の取り組み</h3>
              <p className="text-base-content/70 leading-relaxed">
                エンジニア時代に培った技術的な知識を活かし、ユーザーニーズと技術的制約のバランスを取りながら、
                実現可能性の高いプロダクト戦略の立案・実行に注力しています。
                データドリブンな意思決定と、開発チームとの密接なコラボレーションを重視したプロダクト開発を推進しています。
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
