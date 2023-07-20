import { styled } from "styled-components";

interface IVolumeProps {
    volume: number;
}


export const ControlsContainer = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;

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
      margin-right: 20px;
      color: #fff;
  }
`;

export const PlayButton = styled.button``;

export const PauseButton = styled.button``;

export const VolumeContainer = styled.div``;

export const VolumeControl = styled.input<IVolumeProps>`
&[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    background: #F1F1F130;
    outline: none;
    margin-top: 10px;
    position: relative;
}

&[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background-color: #F1F1F1;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    z-index: 1;
}


&[type="range"]::before {
    content: "";
    position: absolute;
    height: 100%;
    width: ${props => `calc(${props.volume - 1}%)`};
    background-color: #F1F1F1;
    z-index: 0;
}

&[type="range"]::-webkit-slider-runnable-track {
    background-color: inherit;
}
`;

export const CurrentDuration = styled.span``;

export const TotalDuration = styled.span``;

export const SettingsButton = styled.button``;

export const FullScreenButton = styled.button``;

export const QuitFullScreenButton = styled.button``;

