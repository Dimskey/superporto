import React from "react";
import { IconType } from "react-icons";

interface Props {
  title: string;
  icon: IconType;
  image: string;
  className?: string;
}

export const FeatureCard: React.FC<Props> = ({
  title,
  icon: Icon,
  image,
  className = "",
}) => {
  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden rounded-xl bg-black text-white shadow-xl ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-black/70 px-4 py-2">
        <Icon className="h-4 w-4 text-purple-400" />
        <h1 className="text-sm font-medium">{title}</h1>
      </div>

      {/* Image area */}
      <div className="flex flex-1 items-center justify-center bg-black">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>

      {/* Description */}
    </div>
  );
};

export default FeatureCard;
