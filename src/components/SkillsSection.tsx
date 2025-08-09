"use client";

import { Code, Database, Gamepad2, BarChart3, Lightbulb, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiPython,
  SiNodedotjs,
  SiPostgresql,
  SiFirebase,
  SiUnity,
  SiGit,
  SiDocker,
  SiFigma,
  SiNotion,
  SiVercel,
  SiSupabase,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const categoryVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      scale: 0.98,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      skills: [
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
        { name: "CSS3", icon: SiCss3, color: "#1572B6" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      ],
    },
    {
      title: "Backend & Database",
      icon: Database,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      skills: [
        { name: "Python", icon: SiPython, color: "#3776AB" },
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
        { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
        { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      ],
    },
    {
      title: "Game Development",
      icon: Gamepad2,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      skills: [
        { name: "Unity", icon: SiUnity, color: "#000000" },
        { name: "C#", icon: TbBrandCSharp, color: "#239120" },
      ],
    },
    {
      title: "Tools & Platform",
      icon: Users,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      skills: [
        { name: "Git", icon: SiGit, color: "#F05032" },
        { name: "Docker", icon: SiDocker, color: "#2496ED" },
        { name: "Figma", icon: SiFigma, color: "#F24E1E" },
        { name: "Notion", icon: SiNotion, color: "#000000" },
        { name: "Vercel", icon: SiVercel, color: "#000000" },
      ],
    },
    {
      title: "Product Management",
      icon: Lightbulb,
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      skills: [
        { name: "Product Strategy", icon: BarChart3, color: "#6366F1" },
        { name: "User Research", icon: Users, color: "#8B5CF6" },
        { name: "Data Analysis", icon: BarChart3, color: "#06B6D4" },
        { name: "Agile/Scrum", icon: Code, color: "#10B981" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-base-100" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* セクションヘッダー */}
          <motion.div className="text-center mb-16" variants={categoryVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">技術スタック</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Webエンジニアとして培った技術力と、プロダクトマネージャーとして身につけたスキルを紹介します。
            </p>
          </motion.div>

          {/* スキルカテゴリー */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => {
              const Icon = category.icon;

              return (
                <motion.div
                  key={categoryIndex}
                  className={`${category.bgColor} rounded-2xl p-8 shadow-lg border border-gray-100`}
                  variants={categoryVariants}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* カテゴリーヘッダー */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 + categoryIndex * 0.1 }}
                  >
                    <motion.div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 shadow-lg`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon size={28} className="text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-800">{category.title}</h3>
                  </motion.div>

                  {/* スキルアイコングリッド */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {category.skills.map((skill, skillIndex) => {
                      const SkillIcon = skill.icon;

                      return (
                        <motion.div
                          key={skillIndex}
                          className="group"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                          transition={{
                            delay: 0.4 + categoryIndex * 0.1 + skillIndex * 0.05,
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                          }}
                        >
                          <motion.div
                            className="bg-white rounded-xl p-4 shadow-md group-hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center h-20 relative overflow-hidden"
                            whileHover={{
                              scale: 1.05,
                              y: -2,
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {/* アイコン */}
                            <motion.div whileHover={{ rotate: 5 }} transition={{ duration: 0.2 }}>
                              <SkillIcon
                                size={28}
                                style={{ color: skill.color }}
                                className="mb-1"
                              />
                            </motion.div>

                            {/* スキル名 */}
                            <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                              {skill.name}
                            </span>

                            {/* ホバー時のグラデーション */}
                            <motion.div
                              className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-blue-500 to-purple-500 transition-opacity duration-300"
                              initial={false}
                            />
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 学習継続への取り組み */}
          <motion.div className="mt-16" variants={categoryVariants}>
            <motion.div
              className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center max-w-4xl mx-auto border border-primary/20"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3
                className="text-3xl font-bold text-base-content mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 1.5 }}
              >
                継続的な学習とスキルアップ
              </motion.h3>
              <motion.p
                className="text-base-content/70 leading-relaxed mb-8 text-lg"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.7 }}
              >
                技術の進歩が速い業界において、常に新しい技術やトレンドをキャッチアップすることを心がけています。
                <br />
                エンジニア経験を活かしたプロダクトマネジメントスキルの向上と、新興技術領域への理解を深めています。
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                {[
                  {
                    title: "技術トレンド",
                    desc: "AI/ML、Next.js 15、React 19",
                    icon: "🚀",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    title: "PM スキル",
                    desc: "デザイン思考、データドリブン",
                    icon: "💡",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    title: "ビジネス",
                    desc: "戦略立案、マーケット分析",
                    icon: "📊",
                    color: "from-green-500 to-emerald-500",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 1.9 + index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                    }}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 mx-auto`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
