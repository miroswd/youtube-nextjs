import { ButtonContainer } from "@/styles/Button";

interface IButton {
  text: string;
}

export default function Button({text, ...props}: IButton) {
  return <ButtonContainer {...props}>{text}</ButtonContainer>
}