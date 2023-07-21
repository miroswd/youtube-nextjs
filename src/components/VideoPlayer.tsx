import React, { useRef, RefObject, useCallback, useEffect, useState } from "react";
import { TbPlayerPlayFilled, TbPlayerPauseFilled } from "react-icons/tb";
import { BiSolidVolumeMute, BiSolidVolumeLow, BiSolidVolumeFull } from "react-icons/bi";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

import { 
  LeftItems,
  ControlsContainer,
  VolumeContainer,
  VolumeControl,
  Duration,
  Progress,
  BufferProgress,
  ProgressBar,
  VideoContainer,
  ProgressBarContainer,
  FakeProgressBarContainer,
  RightItems,
  ControlsGroup,
} from "@/styles/VideoPlayer";


import formatVideoDuration from "@/utils/formatVideoDuration";

type VideoRef = RefObject<HTMLVideoElement>;
type InputRef = RefObject<HTMLInputElement>;
type ButtonRef = RefObject<HTMLButtonElement>;
type DivRef = RefObject<HTMLDivElement>;
export type ShowHideEnum = 'show' | 'hide';

interface IVideoPlayer {
  id: string;
  thumbnail: string;
}

export default function VideoPlayer({ id, thumbnail }: IVideoPlayer) {
  const videoRef: VideoRef = useRef(null);
  const volumeRef: InputRef = useRef(null);
  const videoContainerRef: DivRef = useRef(null);

  const currentVideo = videoRef.current;
  const currentVolumeControl = volumeRef.current;

  const [ playingVideo, setPlayingVideo ] = useState(true);
  const [ isFullScreen, setIsFullScreen ] = useState(false);
  const [ volume, setVolume ] = useState(currentVideo?.volume || 50);
  const [ formattedDuration, setFormattedDuration ] = useState('');
  const [ currentTime, setCurrentTime ] = useState('00:00');
  const [ progress, setProgress ] = useState(0);
  const [ bufferedProgress, setBufferedProgress ] = useState(0);
  const [ previousVolume, setPreviousVolume ] = useState(currentVideo?.volume || 100);
  const [ showHideControls, setShowHideControls ] = useState<ShowHideEnum>('show');

  useEffect(() => {
    if (currentVideo) {
      currentVideo.controls = false;
      currentVideo.volume = volume / 100;

      const { duration, buffered } = currentVideo;
      setFormattedDuration(formatVideoDuration(duration));
      setBufferedProgress((buffered.end(0) / duration) * 100);
    }; 
  }, [currentVideo, volume]);


  const handlePlayOrPauseVideo = useCallback(() => {
    playingVideo ? currentVideo?.pause() : currentVideo?.play();

    setPlayingVideo(!playingVideo);
  },[playingVideo, currentVideo]);

  const handleFullScreen = useCallback(() => {
    setIsFullScreen(!isFullScreen);

    if (currentVideo) {
      currentVideo.requestFullscreen();
      currentVideo.controls = false
    }

  },[isFullScreen, currentVideo])


  const handleVolumeControl = useCallback(() => {
    if (currentVolumeControl && currentVideo) {
      setVolume(Number(currentVolumeControl.value))
      currentVideo.volume = volume / 100;
    }

  }, [currentVideo, volume, currentVolumeControl]);


  const handleMute = useCallback(() => {
    setPreviousVolume(volume || previousVolume);
    volume > 0 ? setVolume(0) : setVolume(previousVolume);
  }, [volume, previousVolume]);

  const handleTimeUpdate = useCallback(() => {
    if (currentVideo) { 

      const { duration, buffered, currentTime } = currentVideo;

      setCurrentTime(formatVideoDuration(currentTime));
      setProgress((currentTime / duration) * 100);
      setBufferedProgress((buffered.end(buffered.length - 1) / duration) * 100);
    }
  }, [currentVideo]);

  const handleProgressBarClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (currentVideo) {
      const progressBarWidth = event.currentTarget.offsetWidth;
      const clickPosition = event.clientX - event.currentTarget.offsetLeft;
      const percentageClicked = clickPosition / progressBarWidth;
      const newTime = currentVideo.duration * percentageClicked;
      currentVideo.currentTime = newTime;
    }
  }, [currentVideo]);

  const handleHideControls = useCallback((action: ShowHideEnum) => {
    setShowHideControls(action);
  }, [])


   
  return (
    <>
      <VideoContainer
        onMouseOver={() => handleHideControls('show')}
        onMouseLeave={() => handleHideControls('hide')}
        ref={videoContainerRef}
      >
        <video
          ref={videoRef}
          id="video"
          controls={false}
          onTimeUpdate={handleTimeUpdate}
          onClick={handlePlayOrPauseVideo}
        >
          <source src={`${process.env.NEXT_PUBLIC_API_URL}/video`}  />
        </video>

        <ControlsContainer action={showHideControls}>
        <FakeProgressBarContainer onClick={e => handleProgressBarClick(e)}>
          <ProgressBarContainer>
            <ProgressBar>
              <Progress progress={progress} />
              <BufferProgress bufferProgress={bufferedProgress} />
            </ProgressBar>
          </ProgressBarContainer>
        </FakeProgressBarContainer>


          <ControlsGroup>
          <LeftItems>
            <button id="play_pause" onClick={handlePlayOrPauseVideo}>
            {!playingVideo ? (
              <TbPlayerPlayFilled />
            ): (
              <TbPlayerPauseFilled />
            )}
            </button>

            <VolumeContainer>
              <button type="button" onClick={handleMute}>
                { 
                  volume > 0 ? 
                    volume > 50 ? (<BiSolidVolumeFull />) : (<BiSolidVolumeLow />)
                    : (<BiSolidVolumeMute />)
                }
              </button>
              
              <VolumeControl type="range" ref={volumeRef} onChange={handleVolumeControl} volume={volume} />
            </VolumeContainer>

            <Duration>
              <span>{currentTime} / {formattedDuration}</span>
            </Duration>

          </LeftItems>

          <RightItems>
            <button id="fullscreen" onClick={handleFullScreen}>
              {isFullScreen ? (
                <MdFullscreenExit />
              ) : (
                <MdFullscreen />
              )}
            </button>
          </RightItems>
          </ControlsGroup>
        </ControlsContainer> 
      </VideoContainer>

    </>
  )

}