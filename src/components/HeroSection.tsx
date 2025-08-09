"use client";

import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "backOut" as const,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
      },
    },
  };

  const profileVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "backOut" as const,
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      rotate: 360,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* プロフィール画像エリア */}
          <motion.div className="mb-8" variants={itemVariants}>
            <motion.div
              className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-xl cursor-pointer"
              variants={profileVariants}
              whileHover="hover"
            >
              <span className="text-4xl font-bold text-white">P</span>
            </motion.div>
          </motion.div>

          {/* メインコンテンツ */}
          <motion.div variants={itemVariants}>
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-base-content mb-6"
              variants={itemVariants}
            >
              <motion.span
                className="text-primary inline-block"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Web Engineer
              </motion.span>
              <br />
              <motion.span
                className="text-secondary inline-block"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                to
              </motion.span>
              <br />
              <motion.span
                className="text-primary inline-block"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                Product Manager
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-base-content/70 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              2019年からWebエンジニアとしてキャリアをスタートし、
              <br />
              2024年からProduct Managerとして新たな挑戦を続けています。
              <br />
              技術とビジネスの架け橋となるプロダクト作りを目指しています。
            </motion.p>

            {/* ソーシャルリンク */}
            <motion.div className="flex justify-center gap-4 mb-12" variants={itemVariants}>
              <motion.a
                href="https://github.com/Poler382"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-lg bg-base-100 border-2 border-base-300 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="GitHub"
                variants={iconVariants}
                whileHover="hover"
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href="mailto:contact@example.com"
                className="btn btn-circle btn-lg bg-base-100 border-2 border-base-300 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Email"
                variants={iconVariants}
                whileHover="hover"
              >
                <Mail size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/poler382"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-circle btn-lg bg-base-100 border-2 border-base-300 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
                variants={iconVariants}
                whileHover="hover"
              >
                <Linkedin size={24} />
              </motion.a>
            </motion.div>

            {/* CTAボタン */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
              variants={itemVariants}
            >
              <motion.button
                onClick={scrollToAbout}
                className="btn btn-primary btn-lg px-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                経歴を見る
              </motion.button>
              <motion.a
                href="#contact"
                className="btn btn-outline btn-lg px-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                お問い合わせ
              </motion.a>
            </motion.div>

            {/* スクロールインジケーター */}
            <motion.div
              variants={itemVariants}
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.button
                onClick={scrollToAbout}
                className="text-base-content/50 hover:text-primary transition-colors duration-300"
                aria-label="下にスクロール"
                whileHover={{ scale: 1.2 }}
              >
                <ArrowDown size={32} />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
