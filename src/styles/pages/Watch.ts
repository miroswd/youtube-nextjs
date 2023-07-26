import { styled } from "styled-components";

export const Layout = styled.div`
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 320px) {
    max-width: 320px;
  }

  @media (min-width: 320px) and (max-width:768px) {
    max-width: 768px;
  }

  @media (min-width: 768px) and (max-width:1024px) {
    max-width: 768px;
  }

  @media (min-width: 1024px) {
    flex-direction: row;
    max-width: 1024px;
  }

  margin-top: 4%;
  margin-left: 5%;
`;

export const VideoContainer = styled.div`
  width: 100%;
  margin-right: 24px;
`;

export const Title = styled.h1`
  margin-top: 16px;
  font-size: 20px;
  font-weight: 500;
`;


