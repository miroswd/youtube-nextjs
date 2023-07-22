import { css, styled } from "styled-components";
import colors from "@/constants/colors";

const { GRAY, GRAY_TEXT, WHITE } = colors

interface IShowMoreProps {
  showMore: boolean
}

interface IShowMoreLinesProps extends IShowMoreProps {
  lines: number;
  charLastLine: number;
}


export const DescriptionContainer = styled.div<IShowMoreLinesProps>`
  width: 100%;

  margin-top: 24px;

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;

  background-color: ${GRAY};
  
  padding: 16px;

  border-radius: 16px;
  overflow-y: hidden;
  position: relative;
  ${props => props.showMore ? css`
    max-height: 124px;
  ` : css`
    button {
      position: absolute;
      bottom: 12px;
    }

    padding-bottom: 32px;
    max-height: 100%;
  `} 
`;

export const UpInfo = styled.div`
  display: flex;
  width: 100%;

  & > span {
    margin-right: 8px;
  }

  font-weight: 500;
`;

export const Views = styled.span`
`;

export const PostDate = styled.span`
`;

export const TagsContainer = styled.div``;

export const Tag = styled.span`
  margin-right: 4px;
  color: ${GRAY_TEXT};
`;

export const Description = styled.div`
  width: 90%;
  line-height: 20px;

`;

export const Line = styled.p`
  font-weight: 400;
  margin-top: 10px;
`;


export const ShowMoreLine = styled.div<IShowMoreProps>`
  display: flex;
  align-items: flex-end;
  
  p {
    margin-right: 4px;
    ${props => props.showMore && css`
      -webkit-mask-image: linear-gradient(to right, #000 85%, transparent); 
    `}
  }

  button {
    background-color: transparent;
    color: ${WHITE};
    font-weight: 700;
    border: 0;
    height: 20px;
    font-size: 14px;
    cursor: pointer;
    text-shadow: 0 0 5px ${WHITE}05;
  }
`;
