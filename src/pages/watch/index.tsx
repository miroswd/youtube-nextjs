import Button from "@/components/Button";
import Recommendations from "@/components/Recommendations";
import VideoDescription from "@/components/VideoDescription";
import VideoPlayer from "@/components/VideoPlayer";
import { IVideo } from "@/models/VideoSchema";
import { Container, Layout, Title, VideoContainer } from "@/styles/pages/Watch";
import formatPostDate from "@/utils/formatPostDate";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IVideoResponse extends IVideo {
  createdAt: string
}

export default function Watch() {
  const router = useRouter();
  const videoId = router.query.v as string;

  const [firstStage, setFirstStage] = useState(true);

  const [loading, setLoading] = useState(false);
  const [ videoInfo, setVideoInfo ] = useState<IVideo>({
    description: "",
    tags: [""],
    title: "",
    videoId: "",
    postDate: "",
    views: 0
  });


  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/info/${videoId}`);

      const responseData: IVideoResponse = await response.json();

      const formattedPostDate = formatPostDate(responseData.createdAt)

      setVideoInfo({...responseData, postDate: formattedPostDate});

      setTimeout(() => {
        setLoading(false);
      }, 1000)
    }

    videoId && loadData();
  }, [videoId])


  return (
    <Layout>
     {
       !loading && videoId ?
      
    <Container>
      <VideoContainer>
      <VideoPlayer id={videoId} />
      <Title>{videoInfo.title}</Title>
      <VideoDescription 
        description={videoInfo.description}
        postDate={videoInfo.postDate}
        tags={videoInfo.tags}
        views={videoInfo.views}
      />
      <Button type="button" onClick={() => setFirstStage(!firstStage)} text={(firstStage ? "Desativar" : "Ativar") + " primeiro estágio"} />
       </VideoContainer>

      {
          firstStage ? <></> : <Recommendations hideCurrentVideo={videoId}/>
      }
      
    </Container>
      : <h1>Carregando</h1>
     }
    </Layout>
  )
}