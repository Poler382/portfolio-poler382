import React, { FC } from "react";
import iIconPartsProps from "../interface/iIconParts";
import { cn } from "@/utils/classNameUtils";

const IconParts: FC<iIconPartsProps> = ({ icon, name, shapeSetting, textSetting, iconSetting }) => {
  const iconShapeClassName = cn(
    `w-${shapeSetting?.shapeSize} h-${shapeSetting?.shapeSize} rounded-full flex items-center justify-center`,
    shapeSetting?.backgroundColor, // 背景色
    shapeSetting?.borderColor, // 枠線色
    shapeSetting?.borderWidth, // 枠線幅
    shapeSetting?.borderStyle, // 枠線スタイル
    shapeSetting?.borderDasharray, // 枠線ダッシュ配列
    shapeSetting?.borderDashoffset, // 枠線ダッシュオフセット
    shapeSetting?.className
  );
  const iconClassName = cn(
    `-${iconSetting?.iconSize} h-${iconSetting?.iconSize} rounded-full `,
    iconSetting?.iconColor, // アイコン色
    iconSetting?.className
  );
  const iconTextClassName = cn(
    textSetting?.textColor,
    textSetting?.textSize,
    textSetting?.textWeight,
    textSetting?.className
  );
  return (
    <div className={`flex flex-col  items-center justify-center gap-2`}>
      <div className={iconShapeClassName}>
        <div className={iconClassName}>{icon}</div>
      </div>
      {name && <div className={iconTextClassName}>{name}</div>}
    </div>
  );
};

export default IconParts;
