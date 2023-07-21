import { createGlobalStyle } from "styled-components/";
import color from "@/constants/colors";

const { BLACK, WHITE } = color;

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  };

  body {
    background-color: ${BLACK};
    color: ${WHITE};
  }
`;