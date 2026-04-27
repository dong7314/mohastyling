"use client";

import Image from "next/image";

import Arrow from "@/public/images/icon/arrow.png";

interface Props {
  className: string;
  type: "left" | "right";
}

export function ClickIcon({ className, type }: Props) {
  return (
    <div className={"inline-flex absolute " + className}>
      {type === "left" && (
        <span className="text-3xl font-caveat font-light text-black hover:text-black absolute -left-[60px] -top-[14px]">
          click!
        </span>
      )}
      <Image
        src={Arrow}
        alt="arrow-icon"
        width={40}
        height={0}
        className={"h-auto " + (type === "right" && "scale-x-[-1]")}
      />
      {type === "right" && (
        <span className="text-3xl font-caveat font-light text-black hover:text-black absolute -right-[60px] -top-[14px]">
          click!
        </span>
      )}
    </div>
  );
}
