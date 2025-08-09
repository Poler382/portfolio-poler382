"use client";

import { Github, Mail, Linkedin, Twitter, Heart, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Poler382",
      label: "GitHub",
    },
    {
      icon: Mail,
      href: "mailto:contact@poler382.dev",
      label: "Email",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/poler382",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/poler382",
      label: "Twitter",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      className="bg-base-300"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* メインフッター */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ブランディング */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.h3 className="text-2xl font-bold text-primary" whileHover={{ scale: 1.05 }}>
                Poler382
              </motion.h3>
              <p className="text-base-content/70 leading-relaxed">
                Web Engineer から Product Manager へ。
                <br />
                技術とビジネスを繋ぐプロダクト作りに情熱を注いでいます。
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target={social.href.startsWith("http") ? "_blank" : undefined}
                      rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="w-10 h-10 bg-base-100 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group"
                      aria-label={social.label}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      viewport={{ once: true }}
                    >
                      <Icon
                        size={20}
                        className="group-hover:scale-110 transition-transform duration-300"
                      />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* ナビゲーション */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-base-content">サイトマップ</h4>
              <nav className="space-y-2">
                {[
                  { label: "ホーム", href: "/#home" },
                  { label: "経歴", href: "/#about" },
                  { label: "作品", href: "/#projects" },
                  { label: "スキル", href: "/#skills" },
                  { label: "ブログ", href: "/blog" },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="block text-base-content/70 hover:text-primary transition-colors duration-200"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    viewport={{ once: true }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </motion.div>

            {/* 技術スタック */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-base-content">技術スタック</h4>
              <div className="space-y-2">
                <p className="text-base-content/70">このサイトは以下の技術で構築されています：</p>
                <div className="flex flex-wrap gap-2">
                  {["Next.js", "TypeScript", "Tailwind CSS", "DaisyUI", "Framer Motion"].map(
                    (tech, index) => (
                      <motion.span
                        key={index}
                        className="px-2 py-1 bg-base-100 text-base-content text-xs rounded-md font-medium"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "var(--primary)",
                          color: "white",
                        }}
                        viewport={{ once: true }}
                      >
                        {tech}
                      </motion.span>
                    )
                  )}
                </div>
                <p className="text-base-content/60 text-sm mt-2">
                  ソースコードは
                  <motion.a
                    href="https://github.com/Poler382/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    GitHub
                  </motion.a>
                  で公開しています。
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ボトムバー */}
      <motion.div
        className="border-t border-base-content/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <motion.div
              className="flex items-center gap-2 text-base-content/60 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              viewport={{ once: true }}
            >
              <span>© {currentYear} Poler382. Made with</span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart size={16} className="text-red-500" />
              </motion.div>
              <span>in Tokyo</span>
            </motion.div>

            <motion.button
              onClick={scrollToTop}
              className="btn btn-sm btn-outline gap-2 group"
              aria-label="トップに戻る"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowUp size={16} />
              </motion.div>
              トップに戻る
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
