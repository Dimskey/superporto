import React from "react";
import { IconType } from "react-icons";
import Image from "next/image";

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

      <div className="relative h-64 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Description */}
    </div>
  );
};

export default FeatureCard;
