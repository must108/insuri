import Image from "next/image";
import Link from "next/link";
import FileClaimButton from "./components/Buttons/FileClaimButton";
import LearnMoreButton from "./components/Buttons/LearnMoreButton";


import React from "react";
import { BentoGrid, BentoGridItem } from "./components/ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];


export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-8 pb-20 gap-12 sm:p-20 min-h-screen max-w-5xl mx-auto">

        <div className="flex flex-col gap-4">
          <p className="text-5xl font-bold text-center">
            Simplified Auto Insurance Claims
          </p>
          <p className="text-xl text-center">
            Streamline your auto insurance claims and master your insurance journey with our easy-to-use platform. Trust us to help you get back on the road faster.
          </p>
        </div>

        <div className="flex w-fit items-center justify-center gap-4 btn-primary">
          <FileClaimButton />
          <LearnMoreButton />
        </div>

        <Image src="/logo.svg" alt="Logo" width={120} height={120} />

      </div>
      <div className="b flex flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20 min-h-screen">
        <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </div>

  );
}
