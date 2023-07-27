import { ButtonContainer } from "@/styles/Button";
import { ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export default function Button({text, ...props}: IButton) {
  return <ButtonContainer {...props}>{text}</ButtonContainer>
}