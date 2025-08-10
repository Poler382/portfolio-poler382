"use client";

import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const sectionVariants = {
    hidden: { y: 40, opacity: 0 },
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
        <motion.div className="text-center mb-12" variants={sectionVariants}>
          <h1 className="text-4xl sm:text-5xl font-bold text-base-content mb-4">自己紹介</h1>
          <p className="text-base sm:text-lg text-base-content/70 max-w-3xl mx-auto leading-relaxed">
            Webエンジニアとしての実務経験をベースに、現在はプロダクト志向で価値創出に取り組んでいます。
            技術とユーザー体験の交点で、よりよいプロダクトを育てていくことが関心領域です。
          </p>
        </motion.div>

        <motion.div variants={sectionVariants}>
          <AboutSection />
        </motion.div>

        <motion.section className="mt-16 max-w-5xl mx-auto" variants={sectionVariants}>
          <h2 className="text-2xl sm:text-3xl font-bold text-base-content mb-4">略歴</h2>
          <div className="bg-base-100 rounded-xl shadow-lg p-6">
            <ul className="list-disc pl-6 space-y-2 text-base-content/80">
              <li>大学時代は機械学習を専攻</li>
              <li>2019年に新卒入社。人材育成制度によりPGとしてロールスタート</li>
              <li>
                Web/ネイティブエンジニアを経験しつつ、スクラムマスター（SM）としてチームをリード
              </li>
              <li>昨年度は開発部と事業部を兼任し、調査PJをSMとしてリード</li>
              <li>
                本年度は新規事業開発のプロダクトオーナー（PO）。立ち上がり期にSM的な動きやPGとのコミュニケーション、
                営業との折衝も担い、全セグメントと連携して推進
              </li>
            </ul>
          </div>
        </motion.section>

        <motion.section
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
          variants={sectionVariants}
        >
          <div className="bg-base-100 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-base-content mb-3">転職理由・志望経緯</h2>
            <div className="space-y-3 text-base-content/80 leading-relaxed">
              <p>
                新卒で事業会社のシステム部門に入社し、Webアプリを担当。そこでスクラムと出会い、
                スクラムマスターとして試行錯誤を重ねてきました。WF・事業部兼務を経て、今年度はPOとして舵取りを担当しています。
              </p>
              <p>
                ロールが変わる中で、チームを支えパフォーマンスを最大化するSM業務に強い充実感を再確認。
                自身がScrum
                Masterとしてさらに成長できる、変化に適応し続けるアジャイルな環境を求めています。
              </p>
              <p>
                変化を歓迎し、仕組みから整えようとする組織でこそ磨かれる——そう確信し、
                その挑戦機会を求めて志望しました。
              </p>
            </div>
          </div>

          <div className="bg-base-100 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-base-content mb-3">強み</h2>
            <ul className="list-disc pl-6 space-y-2 text-base-content/80">
              <li>自ら考え、形にできる実装力と、役割間のハブになれる翻訳力</li>
              <li>PG/SM/POの経験を基盤に、共通言語で素早く合意形成を進められる</li>
              <li>サーバントリーダーシップによる伴走と障害除去へのコミット</li>
              <li>対人関係構築に長け、信頼関係と透明性を高めるファシリテーション</li>
            </ul>
          </div>
        </motion.section>

        <motion.section className="mt-16 max-w-6xl mx-auto" variants={sectionVariants}>
          <h2 className="text-2xl sm:text-3xl font-bold text-base-content mb-6">Q&amp;A</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-base-100 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-base-content mb-2">なぜPGではないのか？</h3>
              <p className="text-base-content/80 leading-relaxed">
                「作る」だけでなく「支える」に徹し、チームの力を最大化したいからです。
                パフォーマンスが上がる提案を具体化し、成果に変えていく瞬間に最もやりがいを感じます。
              </p>
            </div>

            <div className="bg-base-100 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-base-content mb-2">
                スクラムで大事にしている観点
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-base-content/80">
                <li>
                  透明性（状態）：現在地と次の一歩、そして到達したい先を全員で共有できていること
                </li>
                <li>
                  透明性（判断）：判断の背景が見えない状態を作らず、意思決定理由を明確に伝えること
                </li>
              </ul>
            </div>

            <div className="bg-base-100 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-base-content mb-2">
                どうやってチームビルドするか
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-base-content/80">
                <li>小さく早く間違える文化を醸成（心理的安全性の担保）</li>
                <li>PO・Dev間の信頼を前提に、現場が判断できる仕組みを整備</li>
                <li>意思決定と学びを可視化し、反復の速度を上げる</li>
              </ul>
            </div>

            <div className="bg-base-100 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-base-content mb-2">スクラムのKPI</h3>
              <p className="text-base-content/80 leading-relaxed">
                「どれだけ雑談ができているか」。信頼関係と透明性の指標であり、良いフィードバックを生む土壌です。
              </p>
            </div>

            <div className="bg-base-100 rounded-xl shadow-lg p-6 md:col-span-2">
              <h3 className="text-lg font-semibold text-base-content mb-2">
                なぜスクラムマスターなのか
              </h3>
              <p className="text-base-content/80 leading-relaxed">
                システム開発に限定されず、全員で一歩先に進むための仕組みを機能させる役割にこそ価値を感じます。
                障害を取り除き、メンバーがより力を発揮できる状態を作ることが、私の報酬です。
                サーバントリーダーシップが最も効果的だと信じています。
              </p>
            </div>

            <div className="bg-base-100 rounded-xl shadow-lg p-6 md:col-span-2">
              <h3 className="text-lg font-semibold text-base-content mb-2">
                どんな風に活躍したいか
              </h3>
              <p className="text-base-content/80 leading-relaxed">
                フットワーク軽く「小さく早く間違える」を実践し、許容する雰囲気を作ります。
                現場が判断できずにスピードを失う事態を避けるため、POもDevも互いを信じ、
                失敗から素早く学ぶサイクルをデザインします。私は先頭で手を動かし、誰よりも早く小さく失敗します。
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-16 max-w-6xl mx-auto" variants={sectionVariants}>
          <h2 className="text-2xl sm:text-3xl font-bold text-base-content mb-6">活動事例（PoC）</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-base-100 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-base-content mb-2">企画段階の定量検証</h3>
              <ul className="list-disc pl-6 space-y-2 text-base-content/80">
                <li>検証用アプリを内製し、画面全体でタップを収集してヒートマップ的に可視化</li>
                <li>
                  アプリ内にABテスト機構を内製。群ごとの集計と、入会年月・利用頻度での切り口分析を実施
                </li>
                <li>どの会員でも利用しやすいことを確認し、本開発への意思決定を後押し</li>
              </ul>
            </div>
            <div className="bg-base-100 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-base-content mb-2">
                ST直前の実機持ち帰り調査
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-base-content/80">
                <li>
                  新たに検証環境を構築し、ST相当の資産を配置。社員のご家族に協力頂きドッグフーディングを実施
                </li>
                <li>事前検証で不確実性を低減し、安全に本調査を遂行</li>
                <li>準備の丁寧化・巻き取りの加速、基盤知識のチーム内共有など副次効果を創出</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section className="mt-16 max-w-5xl mx-auto" variants={sectionVariants}>
          <h2 className="text-2xl sm:text-3xl font-bold text-base-content mb-4">何を成したいか</h2>
          <div className="bg-base-100 rounded-xl shadow-lg p-6">
            <p className="text-base-content/80 leading-relaxed">
              業界の枠にとらわれず挑戦し、デバイスや市場の変化速度に適応できる開発を実践します。
              コアコンセプトは「困った時に助けるのではなく、困る前に助ける」。
              世界が少しでも良くなったと実感できるプロダクトを生み出し、
              「自分の家族に使ってほしい」と胸を張れるサービスづくりを続けます。
            </p>
          </div>
        </motion.section>
      </motion.div>

      <Footer />
    </div>
  );
};

export default AboutPage;
