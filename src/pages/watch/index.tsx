import VideoDescription from "@/components/VideoDescription";
import VideoPlayer from "@/components/VideoPlayer";
import { Container, Layout, Title } from "@/styles/pages/Watch";
import { useRouter } from "next/router";

const mock = {
  description: `Song produced by Tyler Smyth and Ronnie Radke
  Vocal Production: Charles Massabo
  Song engineered, mixed and mastered by Tyler Smyth
  Song written by Ronnie Radke, Tyler Smyth, Cody Quistad, Christian Thompson and Tyler Burgess
  
  Director: Jensen Noen
  Producers: Phoenix Vaughn, Tanner Gordon, Veronika Graves, Ruth Devereaux
  Executive Producers: Frank Borin & Ivanna Borin
  Production Company: Blesscode Entertainment
  Cinematographer: Powell Robinson
  Production Designer: Albina Kim
  HMU Designer: Olga Tarnovetska
  Associate Producers: Jessica Harris & Sean Hughes
  1st AD: Tiffany Waxler
  Stunt Coordinator & Lead Rigger: Brandon Belieu
  Burn Coordinator: Julia Utter
  VFX: Tilt VFX, Alex Verenchyck, Roma VFX
  Colorist: Dante Pasquinelli  
  `,
  postDate: "5 dias",
  tags: ["fallinginreverse", "2023"],
  views: 985,
  title: 'Falling In Reverse - "Watch The World Burn"'
}


export default function Watch() {
  const router = useRouter();
  const { v: videoId } = router.query;

  return (
    <Layout>
    <Container>
      <VideoPlayer id={videoId} />
      <Title>{mock.title}</Title>
      <VideoDescription 
        description={mock.description}
        postDate={mock.postDate}
        tags={mock.tags}
        views={mock.views}
      />
    </Container>
    </Layout>
  )
}