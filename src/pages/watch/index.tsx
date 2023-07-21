import VideoPlayer from "@/components/VideoPlayer";
import { Container, Description, Title } from "@/styles/pages/Watch";
import { useRouter } from "next/router";




export default function Watch() {
  const router = useRouter();
  const { v: videoId } = router.query;

  return (
    <Container>
      <VideoPlayer id={videoId} thumbnail="https://i.pinimg.com/564x/94/47/53/944753409de09934f3521b454e470b0e.jpg" />
      <Title>Avatar 2</Title>
      <Description>
      
        </Description>
    </Container>

  )
}