"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Calendar,
  MapPin,
  Briefcase,
  TrendingUp,
  GraduationCap,
  Users2,
  Workflow,
  Rocket,
  ShieldCheck,
  Layers,
  Sparkles,
} from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // アニメーション設定
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  // データ定義
  const stats = [
    { label: "スクラム伴走", value: "15+", icon: Users2 },
    { label: "検証/PoC", value: "20+", icon: Rocket },
    { label: "改善サイクル", value: "500+", icon: Workflow },
    { label: "意思決定短縮", value: "-38%", icon: TrendingUp },
  ];

  const values = [
    {
      title: "透明性ファースト",
      desc: "判断と状態の透明性を担保し、学びの速度を最大化する。",
      icon: ShieldCheck,
    },
    {
      title: "小さく速い検証",
      desc: "仮説検証を細かく回し、意思決定のリードタイムを縮める。",
      icon: Sparkles,
    },
    {
      title: "仕組み化",
      desc: "属人化を解消し、チームが自律的に動ける土台を整備する。",
      icon: Layers,
    },
  ];

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

  const qas = [
    {
      q: "なぜPGではないのか？",
      a: "チームのパフォーマンスを最大化する仕組みづくりに価値を感じるため。提案を具体化し、成果に変えることにやりがいがあります。",
    },
    {
      q: "スクラムで大事にしている観点",
      a: "判断と状態の透明性。意思決定の背景を共有し、学びを可視化することで、速度と質を両立します。",
    },
    {
      q: "どうやってチームビルドするか",
      a: "小さく早く間違える文化を醸成し、現場が判断できる仕組みを整えます。意思決定と学びを可視化し、反復を加速します。",
    },
    {
      q: "スクラムのKPI",
      a: "『どれだけ雑談ができているか』。信頼関係と透明性の指標であり、良いフィードバックの土壌です。",
    },
    {
      q: "なぜスクラムマスターなのか",
      a: "システム開発に限定せず、仕組みで全員を一歩先へ進める役割に価値を感じるため。サーバントリーダーシップを重視します。",
    },
    {
      q: "どんな風に活躍したいか",
      a: "小さく早く失敗し、学びを仕組み化。POとDevの信頼をベースに、現場が判断できる状態を作ります。",
    },
  ];

  const cases = [
    {
      title: "企画段階の定量検証",
      points: [
        "検証用アプリを内製し、画面全体でタップを収集してヒートマップ的に可視化",
        "アプリ内ABテスト機構を内製。群ごとの集計と切り口分析を実施",
        "どの会員でも利用しやすいことを確認し、意思決定を後押し",
      ],
    },
    {
      title: "ST直前の実機持ち帰り調査",
      points: [
        "新たに検証環境を構築し、ST相当の資産を配置",
        "ドッグフーディングにより不確実性を低減し、安全に本調査を遂行",
        "準備の丁寧化・巻き取りの加速、知識のチーム内共有を促進",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-base-100 via-base-200 to-base-200">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[8%] top-[-80px] h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute right-[5%] top-[10%] h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute bottom-[-60px] left-1/3 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        </div>

        <motion.div
          className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-24 sm:px-6 md:grid-cols-2 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-100/70 px-3 py-1 text-xs font-medium text-base-content/70 backdrop-blur"
              variants={itemVariants}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              About me · 2025
            </motion.span>

            <motion.h1
              className="mt-5 text-4xl font-extrabold leading-tight text-base-content sm:text-5xl"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                プロダクト志向のスクラムマスター
              </span>
              <br />
              チームの学習速度を上げ、成果へ接続する
            </motion.h1>

            <motion.p
              className="mt-5 max-w-2xl text-base text-base-content/70 sm:text-lg"
              variants={itemVariants}
            >
              PG/SM/POの経験を横断し、透明性・自律性・学習循環を設計。小さく速い検証で不確実性を削り、
              データと対話で意思決定の質を高めます。
            </motion.p>

            <motion.div className="mt-8 flex flex-wrap items-center gap-3" variants={itemVariants}>
              <Link href="/applist/intro-tech-stack" className="btn btn-primary">
                Tech Stackを見る
              </Link>
              <a href="#about" className="btn btn-ghost">
                経歴タイムライン
              </a>
            </motion.div>
          </div>

          <motion.div
            className="relative mx-auto h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72"
            variants={itemVariants}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl" />
            <div className="relative grid h-full w-full place-items-center rounded-3xl border border-base-300 bg-base-100/80 p-4 shadow-xl backdrop-blur">
              <Image
                src="/Icon-b.png"
                alt="Profile"
                width={240}
                height={240}
                className="mask mask-squircle"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-base-100 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                className="group relative overflow-hidden rounded-2xl border border-base-300 bg-base-200 p-4 shadow hover:shadow-md"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-secondary/0 to-accent/0 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15">
                    <Icon className="text-primary" size={18} />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold tracking-tight text-base-content">
                      {s.value}
                    </div>
                    <div className="text-xs text-base-content/60">{s.label}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-base-200 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">価値観と働き方</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base-content/70">
              チームの自律性と学習速度を上げるための設計原則。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  className="group relative overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-6 shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-secondary/0 to-accent/0 opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="text-primary" size={18} />
                  </div>
                  <h3 className="text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm text-base-content/70">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="about" className="py-20 bg-base-100" ref={ref}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-6xl mx-auto"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
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
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }
                      }
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
                            <h3 className="text-xl font-bold text-base-content mb-1">
                              {item.title}
                            </h3>
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

      {/* Q&A Section */}
      <section className="bg-base-100 py-16" aria-labelledby="qa-heading">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h2 id="qa-heading" className="text-2xl sm:text-3xl font-bold">
              Q&A
            </h2>
            <p className="mt-2 text-base-content/70">クリックで開閉できます</p>
          </div>

          <div className="divide-y divide-base-300 rounded-2xl border border-base-300 bg-base-200/60">
            {qas.map((qa, i) => (
              <div key={qa.q} className="px-5 py-4">
                <button
                  className="flex w-full items-center justify-between gap-4 text-left"
                  onClick={() => setOpenIndex((prev) => (prev === i ? null : i))}
                  aria-expanded={openIndex === i}
                  aria-controls={`qa-panel-${i}`}
                >
                  <span className="text-base font-medium text-base-content">{qa.q}</span>
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full border border-base-300 text-xs transition-transform ${
                      openIndex === i ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      id={`qa-panel-${i}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 text-sm leading-relaxed text-base-content/80">
                        {qa.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="bg-base-200 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">活動事例 (PoC)</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base-content/70">
              不確実性を削るための実践例。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {cases.map((c, i) => (
              <motion.div
                key={c.title}
                className="relative overflow-hidden rounded-2xl border border-base-300 bg-base-100 p-6 shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-secondary/0 to-accent/0 opacity-0 transition-opacity duration-300 hover:opacity-40" />
                <h3 className="text-lg font-semibold text-base-content">{c.title}</h3>
                <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-base-content/80">
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
