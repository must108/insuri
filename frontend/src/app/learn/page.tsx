import React from 'react';
import BeginnerButton from '../components/Buttons/BeginnerButton';
import CarAccidentInfoButton from '../components/Buttons/CarAccidentButton';
import LowerInsuranceButton from '../components/Buttons/LowerInsuranceButton';
import Chatbot from "./Chatbot/Chatbot";
import Image from "next/image"

import { BentoGrid, BentoGridItem } from '../components/ui/bento-grid';
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
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
    link: "/learn/beginner"
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    link: "/learn/car-accident"
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    className: "md:col-span-3",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    link: "/learn/lower-insurance"
  },
];

export default function LearnPage() {

  return (
    <div className="flex flex-col items-center justify-center p-8 pb-20 gap-12 sm:p-20 min-h-screen max-w-5xl mx-auto">
      <div className="gap-10">
        <p className="text-5xl font-bold text-center">
          Own Your Insurance Decisions
        </p>
        <p className="text-xl text-center">
          Step into the driver's seat of your insurance journey. Discover strategies to protect, save, and win in every situation.
        </p>
      </div>

      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            icon={item.icon}
            link={item.link}
          />
        ))}
      </BentoGrid>

      <div className="flex w-fit items-center justify-center gap-4 btn-primary">
        <Chatbot />
      </div>

    </div>
  )
}