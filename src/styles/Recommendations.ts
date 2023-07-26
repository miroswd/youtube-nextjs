import colors from "@/constants/colors";
import { css, styled } from "styled-components"

const { WHITE, GRAY_TEXT, BLACK } = colors;

interface ITagProps {
  active: boolean;
}

interface ICarouselButtons {
  left: boolean;
  right: boolean;
}

export const Container = styled.div`
  width: 100%;
`;

export const Carousel = styled.div<ICarouselButtons>`
  display: flex;

  align-items: center;
  justify-content: flex-start;

  & > button {
    background-color: inherit;
    border-radius: 50%;

    width: 32px;
    height: 32px;

    border: 0;

    cursor: pointer;

    &:hover {
      background-color: ${WHITE}40;
    }

    &:first-child {
      ${props => props.left ? css`
        display: flex;
        align-items: center;
        justify-content: center;
      `: css`
        display: none;      
      `}
    }

    &:last-child {
      ${props => props.right ? css`
        display: flex;
        align-items: center;
        justify-content: center;

      `: css`
        display: none;
      `}
    }
  }

  svg {
    font-size: 24px;
    color: ${WHITE};
  }


`;

export const Topics = styled.div<ICarouselButtons>`
  display: flex;
  align-items: center;

  overflow-x: hidden;
  scroll-behavior: smooth;

 

  ${props => props.right ? css`
    -webkit-mask-image: linear-gradient(to right, #000 85%, transparent); 
      `: css`
    -webkit-mask-image: linear-gradient(to left, #000 95%, transparent); 
  `}

  width: 64%;

`;

export const Tag = styled.button<ITagProps>`
  border: 0;
  outline: none;
  padding: 8px 12px;

  ${props => props.active ? css`
    background-color: ${WHITE};
    color: ${BLACK};
  `: css`
    background-color: ${WHITE}20;
    color: ${WHITE};
    cursor: pointer;

    &:hover {
      background-color: ${WHITE}40;
    }  
  `}


  margin-right: 8px;
  border-radius: 8px;


`;

export const VideosContainer = styled.div`
  display: flex;
  flex-direction: column;

  a {
    text-decoration: none;
  }


`;

export const VideoWrap = styled.div`
  margin-top: 8px;

  display: flex;
  align-items: flex-start;

`;


export const LeftContainer = styled.div`
  width: 168px;
  height: 94px;

  margin-right: 24px;
`;

export const RightContainer = styled.div`
  width: 240px;
`;

export const ThumbnailWrap = styled.div`
  background-color: #000;
  border-radius: 8px;

  display: flex;
  justify-content: center;

  max-width: 100%;
  max-height: 94px; 

  border: 1px solid ${BLACK};

  overflow: hidden;
`;

export const Thumbnail = styled.img`
  max-width: 100%;
  height: 94px;
`;

export const Title = styled.h3`
  margin-top: 8px;
  font-size: 16px;
  color: ${WHITE};
`;


export const InfoContainer = styled.div`
  width: 100%;
  margin-top: 8px;


  display: flex;
  align-items: center;
  color: ${GRAY_TEXT};

  span {
    margin-right: 8px;
  }
`;

export const Views = styled.span`

`;

export const PostDate = styled.span``;

