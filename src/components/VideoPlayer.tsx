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


  const [ playingVideo, setPlayingVideo ] = useState(true);
  const [ isFullScreen, setIsFullScreen ] = useState(false);
  const [ volume, setVolume ] = useState(videoRef.current?.volume || 50);
  const [ formattedDuration, setFormattedDuration ] = useState('');
  const [ currentTime, setCurrentTime ] = useState('00:00');
  const [ progress, setProgress ] = useState(0);
  const [ bufferedProgress, setBufferedProgress ] = useState(0);
  const [ previousVolume, setPreviousVolume ] = useState(videoRef.current?.volume || 100);
  const [ showHideControls, setShowHideControls ] = useState<ShowHideEnum>('show');
  const [ previousStatusControls, setPreviousStatusControls ] = useState<ShowHideEnum>('show');
  const [ mouseMoveControls, setMouseMoveControls ] = useState(false);
  const [ loading, setLoading ] = useState(false);


  const handlePlayOrPauseVideo = useCallback(() => {
    playingVideo ? videoRef.current?.pause() : videoRef.current?.play();
    setShowHideControls('show');
    setPreviousStatusControls('show');
    setPlayingVideo(!playingVideo);
  },[playingVideo]);

  const handleKeyPress = useCallback((keyCode: string) => {
    const actions: KeyActions = {
      'Space': () => handlePlayOrPauseVideo()
    };

    if (actions[keyCode]) actions[keyCode]();
  }, [handlePlayOrPauseVideo])


  const handleFullScreen = useCallback(() => {
    setIsFullScreen(!isFullScreen);

    const videoContainer = videoContainerRef.current;

    if (videoContainer) {
      isFullScreen ? document.exitFullscreen() : videoContainer.requestFullscreen();
    }
  },[isFullScreen]);

  useEffect(() => {
    document.addEventListener('keydown', e => handleKeyPress(e.code));

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false)
      }})
  }, [handleKeyPress])

  const handleLoadVideo = useCallback(() => {
    setLoading(true);
    if (videoRef.current) {
      const currentVideo = videoRef.current;
      currentVideo.controls = false;
      currentVideo.volume = volume / 100;

      const { duration, buffered } = currentVideo;

      try {
        setFormattedDuration(formatVideoDuration(duration));
        setBufferedProgress((buffered.length  / duration) * 100);
      } finally {
        setLoading(false);
      }
      
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

  }, [volume, showHideControls, previousStatusControls, playingVideo]);

  const handleVolumeControl = useCallback(() => {
    const currentVolumeControl = volumeRef.current;
    const currentVideo = videoRef.current;

    if (currentVolumeControl && currentVideo) {
      setVolume(Number(currentVolumeControl.value))
      currentVideo.volume = volume / 100;
    }

  }, [volume]);


  const handleMute = useCallback(() => {
    setPreviousVolume(volume || previousVolume);
    volume > 0 ? setVolume(0) : setVolume(previousVolume);
     
  }, [volume, previousVolume]);


  useEffect(() => {
    const currentVolumeControl = volumeRef.current;
    const currentVideo = videoRef.current;

    if (currentVolumeControl) currentVolumeControl.value = String(volume);
    if (currentVideo) currentVideo.volume = volume / 100;
  }, [volume])

  const handleTimeUpdate = useCallback(() => {
    const currentVideo = videoRef.current;

    if (currentVideo) { 
      const { duration, buffered, currentTime } = currentVideo;

      setCurrentTime(formatVideoDuration(currentTime));
      const totalProgress = (currentTime / duration) * 100;
      setProgress(totalProgress);
      setBufferedProgress((buffered.end(buffered.length - 1) / duration) * 100);

      if (totalProgress === 100) {
        setPlayingVideo(false)
      }
    }
  }, []);

  const handleProgressBarClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const currentVideo = videoRef.current;
    
    if (currentVideo) {
      const progressBarWidth = event.currentTarget.offsetWidth;
      const clickPosition = event.clientX - event.currentTarget.getBoundingClientRect().left;
      const percentageClicked = clickPosition / progressBarWidth;
      const newTime = currentVideo.duration * percentageClicked;
      currentVideo.currentTime = newTime;     
    }
  }, []);


  const handleHideControls = useCallback((action: ShowHideEnum) => {
    setShowHideControls(action);
  }, [])


  return (
      <VideoContainer
        onMouseLeave={() => !mouseMoveControls && playingVideo && handleHideControls('hide')}
        onMouseMove={() => setShowHideControls('show')}
        ref={videoContainerRef}
        isFullScreen={isFullScreen}
        >
        
        <video
          ref={videoRef}
          id="video"
          autoPlay
          muted={false}
          controls={false}
          onTimeUpdate={handleTimeUpdate}
          onClick={handlePlayOrPauseVideo}
          onLoadedMetadata={handleLoadVideo}
        >
          <source src={`${process.env.NEXT_PUBLIC_API_URL}/api/video/${id}`}  />
        </video>

        <ControlsContainer 
          action={showHideControls} 
          onMouseMove={() => setMouseMoveControls(true)} 
          onMouseLeave={() => setMouseMoveControls(false)}
        >

          <FakeProgressBarContainer>
            <ProgressBarContainer>
              <ProgressBar onClick={e => handleProgressBarClick(e)}>
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
  )

}