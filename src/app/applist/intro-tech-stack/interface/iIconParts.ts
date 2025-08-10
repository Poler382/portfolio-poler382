interface iShapeSetting {
  shapeSize?: number; // シェイプサイズ
  backgroundColor?: string; // 背景色
  borderColor?: string; // 枠線色
  borderWidth?: number; // 枠線幅
  borderStyle?: string; // 枠線スタイル
  borderDasharray?: string; // 枠線ダッシュ配列
  borderDashoffset?: number; // 枠線ダッシュオフセット
  className?: string;
}

interface iIconSetting {
  iconSize?: number; // アイコンサイズ
  iconColor?: string; // アイコン色
  className?: string;
}

interface iTextSetting {
  textColor?: string; // テキスト色
  textSize?: number; // テキストサイズ
  textWeight?: number; // テキスト太さ
  className?: string;
}

interface iIconPartsProps {
  icon?: React.ReactNode;
  name?: string;
  iconSetting?: iIconSetting;
  shapeSetting?: iShapeSetting;
  textSetting?: iTextSetting;
}

export default iIconPartsProps;
