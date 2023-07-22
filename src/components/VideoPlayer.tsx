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

interface KeyActions {
  [key: string]: () => void;
}
interface IVideoPlayer {
  id: string;
}

export default function VideoPlayer({ id }: IVideoPlayer) {
  const videoRef: VideoRef = useRef(null);
  const volumeRef: InputRef = useRef(null);
  const videoContainerRef: DivRef = useRef(null);

  const currentVideo = videoRef.current;
  const currentVolumeControl = volumeRef.current;
  const videoContainer = videoContainerRef.current;

  const [ playingVideo, setPlayingVideo ] = useState(true);
  const [ isFullScreen, setIsFullScreen ] = useState(false);
  const [ volume, setVolume ] = useState(currentVideo?.volume || 50);
  const [ formattedDuration, setFormattedDuration ] = useState('');
  const [ currentTime, setCurrentTime ] = useState('00:00');
  const [ progress, setProgress ] = useState(0);
  const [ bufferedProgress, setBufferedProgress ] = useState(0);
  const [ previousVolume, setPreviousVolume ] = useState(currentVideo?.volume || 100);
  const [ showHideControls, setShowHideControls ] = useState<ShowHideEnum>('show');
  const [ previousStatusControls, setPreviousStatusControls ] = useState<ShowHideEnum>('show');
  const [ mouseMoveControls, setMouseMoveControls ] = useState(false);

  const handlePlayOrPauseVideo = useCallback(() => {
    playingVideo ? currentVideo?.pause() : currentVideo?.play();
    setShowHideControls('show');
    setPreviousStatusControls('show');
    setPlayingVideo(!playingVideo);
  },[playingVideo, currentVideo]);

  const handleKeyPress = useCallback((keyCode: string) => {
    const actions: KeyActions = {
      'Space': () => handlePlayOrPauseVideo()
    };

    if (actions[keyCode]) actions[keyCode]();
  }, [handlePlayOrPauseVideo])


  const handleFullScreen = useCallback(() => {
    setIsFullScreen(!isFullScreen);

    if (videoContainer) {
      isFullScreen ? document.exitFullscreen() : videoContainer.requestFullscreen();
    }
  },[isFullScreen, videoContainer]);

  useEffect(() => {
    document.addEventListener('keydown', e => handleKeyPress(e.code));

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false)
      }})
  }, [handleKeyPress])

  useEffect(() => {
    if (currentVideo) {
      currentVideo.controls = false;
      currentVideo.volume = volume / 100;

      const { duration, buffered } = currentVideo;
      setFormattedDuration(formatVideoDuration(duration));
      setBufferedProgress((buffered.end(0) / duration) * 100);

      setPreviousStatusControls(showHideControls)
      if(playingVideo && showHideControls !== previousStatusControls) {
        setTimeout(() => {
          setShowHideControls('hide');
          setPreviousStatusControls('hide');  
        }, 5000);
      };

      showHideControls === 'hide' ?
        currentVideo.style.cursor = 'none' :
        currentVideo.style.cursor = 'default';

    }; 
  }, [currentVideo, volume, showHideControls, previousStatusControls, playingVideo, videoContainer]);





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

      console.log({
        progressBarWidth,
        clickPosition,
        percentageClicked,
        newTime
      })
    }
  }, [currentVideo]);

  const handleHideControls = useCallback((action: ShowHideEnum) => {
    setShowHideControls(action);
  }, [])

   
  return (
    <>
      <VideoContainer
        onMouseLeave={() => !mouseMoveControls && playingVideo && handleHideControls('hide')}
        onMouseMove={() => setShowHideControls('show')}
        ref={videoContainerRef}
        isFullScreen={isFullScreen}
        >
        {progress} {'>>>>>>>'} {bufferedProgress}
        <video
          ref={videoRef}
          id="video"
          controls={false}
          
          onTimeUpdate={handleTimeUpdate}
          onClick={handlePlayOrPauseVideo}
        >
          <source src={`${process.env.NEXT_PUBLIC_API_URL}/video`}  />
        </video>

        <ControlsContainer 
          action={showHideControls} 
          onMouseMove={() => setMouseMoveControls(true)} 
          onMouseLeave={() => setMouseMoveControls(false)}
        >

        <FakeProgressBarContainer onClick={e => handleProgressBarClick(e)}>
          <ProgressBarContainer>
            <ProgressBar>
              <Progress progress={progress} />
              <BufferProgress buffer={bufferedProgress} />
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