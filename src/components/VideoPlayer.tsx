import { useRef, RefObject, useCallback, useEffect, useState } from "react";
import { 
  ControlsContainer,
  PlayButton,
  PauseButton,
  VolumeContainer,
  VolumeControl,
  CurrentDuration,
  TotalDuration,
  SettingsButton,
  FullScreenButton,
  QuitFullScreenButton,
} from "@/styles/VideoPlayer";

import { FaPlay } from "react-icons/fa"
import { GiPauseButton } from "react-icons/gi"
import { BiSolidVolumeMute, BiSolidVolumeLow, BiSolidVolumeFull } from "react-icons/bi"
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

type VideoRef = RefObject<HTMLVideoElement>;
type InputRef = RefObject<HTMLInputElement>;

interface IVideoPlayer {
  id: string;
  thumbnail: string;
}



export default function VideoPlayer({ id, thumbnail }: IVideoPlayer) {
  const videoRef: VideoRef = useRef(null);
  const volumeRef: InputRef = useRef(null);

  const currentVideo = videoRef.current;

  const [ playingVideo, setPlayingVideo ] = useState(false);
  const [ isFullScreen, setIsFullScreen ] = useState(false);
  const [ volume, setVolume ] = useState(currentVideo?.volume || 50);
  const [ previousVolume, setPreviousVolume ] = useState(currentVideo?.volume || 1);

  useEffect(() => {
    if (currentVideo) {
      currentVideo.controls = false;
    }; 
  }, [currentVideo]);

  const handlePlayOrPauseVideo = useCallback(() => {
    setPlayingVideo(!playingVideo);

    playingVideo ? currentVideo?.pause() : currentVideo?.play();

  },[playingVideo, currentVideo]);

  const handleFullScreen = useCallback(() => {
    setIsFullScreen(!isFullScreen);

    if (currentVideo) {
      currentVideo.requestFullscreen();
      currentVideo.controls = false
    }

  },[isFullScreen, currentVideo])


  const handleMute = useCallback(() => {
    setPreviousVolume(volume || previousVolume);
    volume ? setVolume(0) : setVolume(previousVolume);
  }, [volume, previousVolume]);

  const handleVolumeControl = useCallback(() => {
    const currentVolumeControl = volumeRef.current;

    if (currentVolumeControl && currentVideo) {
      setVolume(Number(currentVolumeControl.value))
      currentVideo.volume = volume / 100;
    }

  }, [currentVideo, volume]);


  return (
    <>
      <video
        ref={videoRef}
        src={`${process.env.NEXT_PUBLIC_API_URL}/video`}
        id="video"
        controls
        autoPlay
      />
        
      
    
        <ControlsContainer>
          <button id="play_pause" onClick={handlePlayOrPauseVideo}>
          {playingVideo ? (
            <FaPlay />
          ): (
            <GiPauseButton />
          )}
          </button>

          <VolumeContainer>
            <button type="button" onClick={handleMute}>
              { 
                volume ? 
                  volume > 50 ? (<BiSolidVolumeFull />) : (<BiSolidVolumeLow />)
                  : (<BiSolidVolumeMute />)
              }
            </button>
            
            <VolumeControl type="range" ref={volumeRef} onChange={handleVolumeControl} volume={volume} />
          </VolumeContainer>

          <button id="fullscreen" onClick={handleFullScreen}>
            {isFullScreen ? (
              <MdFullscreenExit />
            ) : (
              <MdFullscreen />
            )}
          </button>

        </ControlsContainer> 
    </>
  )

}