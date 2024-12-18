'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import { GPT4oPasswordAccordion } from '@/components/llm/GPT4oPassword';
import ArrowAnimation from '@/components/lottie/Arrow';
import { Button } from '@/components/ui/Button';
import { tutorial_ai_name } from '@/constants/ai_name';
import { MessagesContext } from '@/context/Messages';
import useNFTStore from '@/store/prompt/prompt-insert-store';
import AsisstAI from './07-assist';
import { InputPassword } from './07-form';
import Info07 from './07-info';

const difficultyLevels = {
  'Role Playing': 1,
  // normal: 2,
  //hard: 3,
  'Only RED Flight Elite Agent': 4,
};

const DifficultySelector = ({ onSelect }: any) => {
  const difficulties = ['Role Playing', 'Only RED Flight Elite Agent'];

  return (
    <div className="w-full border border-red-500 bg-black p-4">
      <Button className="flex cursor-default gap-2 bg-transparent p-2 px-4 text-lg text-white hover:bg-transparent">
        <ArrowAnimation />
        Select Difficulty:
      </Button>
      <div className="mt-2 flex space-x-2">
        {difficulties.map((diff) => (
          <button
            key={diff}
            className="rounded bg-gray-700 px-3 py-1 text-lg text-white hover:bg-gray-600"
            onClick={() => onSelect(diff)}
          >
            {diff}
          </button>
        ))}
      </div>
    </div>
  );
};

const FirstImage = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300000);
  const [difficulty, setDifficulty] = useState<any>('');

  const { updateMessage, messages } = useContext(MessagesContext);
  const { updateInputNFT } = useNFTStore();

  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let timer: any;
    if (isAccordionOpen) {
      if (audioRef.current) {
        audioRef.current.play();
      }

      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            router.push('/game-fail');
            return 0;
          }
          return prevTime - 10;
        });
      }, 10);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isAccordionOpen, router]);

  const formatTime = (time: any) => {
    const minutes = String(Math.floor(time / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(time % 1000).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const handleDifficultySelect = (selectedDifficulty: string) => {
    setDifficulty(selectedDifficulty);
    console.log(`Selected difficulty: ${selectedDifficulty}`);

    updateInputNFT({
      level:
        difficultyLevels[selectedDifficulty as keyof typeof difficultyLevels],
    });

    // Update the first message with the selected difficulty
    if (messages.length > 0) {
      updateMessage(messages[0].id, (prevText) => {
        const aiName =
          tutorial_ai_name[
            difficultyLevels[
              selectedDifficulty as keyof typeof difficultyLevels
            ] - 1
          ];
        return `${aiName} >>> Level : ${selectedDifficulty} >>> ${prevText}`;
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/tutorial/07/siren_ver.mp3" loop />
      <motion.div
        className="absolute left-0 top-0 flex h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/tutorial/07/1_game_start.png"
          alt="Background 1"
          layout="fill"
          objectFit="cover"
          priority
        />

        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-6">
          {/* Top-left: Countdown Timer */}
          <div className="flex items-center justify-center">
            <div className="cursor-pointer border border-red-600 bg-black p-4 shadow-lg">
              <div className="z-20 text-xl text-white md:text-3xl">
                Countdown:{' '}
                <span className="text-red-500">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>

          {/* Top-right: Difficulty Selector or Password Accordion */}
          <div className="mr-[100px] mt-[180px] flex items-center justify-center max-2xl:mr-[40px]">
            <div className="w-full cursor-pointer bg-transparent p-4 shadow-lg">
              <AnimatePresence>
                {difficulty ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <GPT4oPasswordAccordion
                      onToggle={(isOpen: any) => setIsAccordionOpen(isOpen)}
                    />
                  </motion.div>
                ) : (
                  <DifficultySelector onSelect={handleDifficultySelect} />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom-left: Info or AssistAI */}
          <div className="ml-6 flex items-center justify-center">
            {difficulty === 'Role Playing' && messages.length >= 1 ? (
              <div className="h-74 w-full max-w-xl cursor-pointer border border-red-600 bg-black p-4">
                <AsisstAI />
              </div>
            ) : (
              <div className="max-h-[450px] w-full max-w-xl cursor-pointer border border-red-600 bg-black p-4 shadow-lg">
                <Info07 />
              </div>
            )}
          </div>

          {/* Bottom-right: Input Password */}
          <div className="flex items-center justify-center">
            <div className="cursor-pointer border border-red-600 bg-black p-4 shadow-lg">
              <InputPassword />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const Seventh = () => {
  return (
    <div className="relative h-screen w-full">
      <FirstImage />
    </div>
  );
};

export default Seventh;
