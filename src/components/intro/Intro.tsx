"use client";

import { useEffect, useRef, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

interface IntroProps {
  setShowPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Intro: React.FC<IntroProps> = ({ setShowPage }) => {
  const router = useRouter();
  const pathname = usePathname();

  const audioPlayer = useRef<HTMLAudioElement>(null);
  const videoPlayer = useRef<HTMLVideoElement>(null);

  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    const handleVideoEnded = () => {
      setVideoEnded(true);
    };

    if (videoPlayer.current) {
      videoPlayer.current.addEventListener("ended", handleVideoEnded);
    }

    return () => {
      if (videoPlayer.current) {
        videoPlayer.current.removeEventListener("ended", handleVideoEnded);
      }
    };
  }, []);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioPlayer.current) {
        audioPlayer.current.play().catch(error => {
          console.error("Audio play failed:", error);
        });
      }
      setShowPage(true);
      router.push(pathname);
      document.removeEventListener("click", handleUserInteraction);
    };

    if (videoEnded) {
      document.addEventListener("click", handleUserInteraction);
    }

    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, [videoEnded]);

  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
        {/* <video ref={videoPlayer} src="/videos/logo_main.mp4" autoPlay className="w-full h-full object-cover" /> */}

        <video
          ref={videoPlayer}
          autoPlay
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/logo_main.mp4" type="video/mp4" />
        </video>

        {videoEnded && (
          <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-50 text-xl text-white">
            Click to start
          </div>
        )}
      </div>
    </>
  );
};

export default Intro;
