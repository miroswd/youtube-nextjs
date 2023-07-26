import colors from "@/constants/colors";
import { styled } from "styled-components"

const { WHITE, GRAY_TEXT, BLACK } = colors;

export const Container = styled.div`
  width: 100%;
`;

export const VideosContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(5, 1fr);

  width: 90%;

  margin: 80px auto 0;

  a {
    text-decoration: none;
    width: 319.98px;
  }

`;

export const VideoWrap = styled.div`
  width: 319.98px;
  height: 296px;
`;

export const ThumbnailWrap = styled.div`
  background-color: #000;
  border-radius: 16px;

  display: flex;
  justify-content: center;

  max-width: 100%;
  max-height: 179.98px; 

  border: 1px solid ${BLACK};

  overflow: hidden;
`;

export const Thumbnail = styled.img`
  max-width: 100%;
  max-height: 179.98px; 
`;

export const Title = styled.h3`
  margin-top: 8px;

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

