import { css, styled } from "styled-components";
import color from "@/constants/colors";
import { ShowHideEnum } from "@/components/VideoPlayer";

const { RED, WHITE } = color;

interface IVideoProps {
    isFullScreen: boolean;
}

interface IVolumeProps {
    volume: number;
};

interface IVideoProgressProps {
    progress: number;
}

interface IVideoBufferProgressProps {
    buffer: number;
}

interface IControlsShowHide {
    action: ShowHideEnum
}

export const VideoContainer = styled.div<IVideoProps>`
    position: relative;

    video {
        width: ${props => props.isFullScreen ? '100vw' : '100%'};
        height: ${props => props.isFullScreen ? '100vh' : '100%'};
        margin: auto 0;
    }

    video::-webkit-media-controls {
        display: none !important;
    }

    video::-webkit-media-controls-fullscreen-button {
    display: block;
    background: rgba(0, 0, 0, 0.5);
    padding: 5px;
    border: none;
    border-radius: 5px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: white;
    cursor: pointer;
    }

    video::-webkit-media-controls-fullscreen-button:hover {
    background: rgba(0, 0, 0, 0.8);
    }

    max-width: 1020px;
    max-height: 572px;
    background-color: #000;
`;


export const ControlsContainer = styled.div<IControlsShowHide>`
  width: 100%;

  position: absolute;
  bottom: 0;

  ${props => props.action === "hide" ? css`
    opacity: 0;
    visibility: hidden;
    transition: opacity 600ms ease;
  ` : css`
    opacity: 1;
    visibility: show;
    transition: opacity 400ms ease;
  `}
`;

export const ControlsGroup = styled.div`
  width: 96%;
  margin: 0 auto 4px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    background-color: inherit;
    border:0;
    &:hover {
        cursor: pointer;
    }
  }

  svg {
      width: 24px;
      height: auto;
      color: ${WHITE};

      @media (max-width: 450px) {
        width: 16px;
      }
  }

`;

export const LeftItems = styled.div`
    display: flex;
    align-items: center;

    svg { 
      margin-right: 24px;

      @media (max-width: 450px) {
        margin-right: 16px;
      }
    }
`;

export const RightItems = styled.div`
`;

export const VolumeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 40px;

    width: 116px;
    margin-right: 24px;


    @media (max-width:450px) {
        width: 40%;
        margin-right: 12px;
    }
`;

export const VolumeControl = styled.input<IVolumeProps>`
    cursor: pointer;

    &[type="range"] {
        -webkit-appearance: none;
        width: 100%;
        height: 4px;
        background: ${WHITE}20;
        outline: none;
        position: relative;
    }

    &[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 10px;
        height: 10px;
        background-color: ${WHITE};
        border-radius: 50%;
        ${props => props.volume > 0 ? css`
        position: relative;
        ` : css`
            position: absolute;
            left: 0;
            top: -3px;
        `};
        z-index: 1;
    }

    &[type="range"]::before {
        content: "";
        position: absolute;
        height: 100%;
        width: ${props => `calc(${props.volume - 1}%)`};
        background-color: ${WHITE};
        z-index: 0;
    }

    &[type="range"]::-webkit-slider-runnable-track {
        background-color: inherit;
    }

    
`;

export const Duration = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;


    font-weight: 400;
    font-size: 12px;

`;

export const FakeProgressBarContainer = styled.div`
    height: 16px;
    width: 100%;
    position: absolute;
    bottom: 48px;

    
    display: flex;
    align-items: flex-end;

    z-index: 1;

    cursor: pointer;

    &:hover {
      height: 24px;
    }
`;


export const ProgressBarContainer = styled.div`
    width: 100%;
    height: 20%;
`;

export const ProgressBar = styled.div`
    margin: 0 auto;
    width: 98%;
    height: 100%;
    position: relative;
    background-color: ${WHITE}20;
`;

export const Progress = styled.div<IVideoProgressProps>`
    width: ${props => `calc(${props.progress}%)`}; 
    height: 100%;
    background-color: ${RED};
    position: relative;
    z-index: 1;
`;

export const BufferProgress = styled.div<IVideoBufferProgressProps>`
   width: ${props => `calc(${props.buffer}%)`}; 
   height: 100%;
   background-color: ${WHITE}40;
   position: absolute;
   bottom: 0;
   z-index: -1;
`;



