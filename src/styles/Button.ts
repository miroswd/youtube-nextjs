import colors from "@/constants/colors";
import { styled } from "styled-components";

const { WHITE } = colors;

export const ButtonContainer = styled.button`
  border: 0;
  outline: none;
  padding: 8px 12px;

  border-radius: 8px;

  background-color: ${WHITE}20;
  color: ${WHITE};
  cursor: pointer;

  &:hover {
    background-color: ${WHITE}40;
  }
`;