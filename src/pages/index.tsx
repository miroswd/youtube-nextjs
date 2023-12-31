import { Views } from "@/styles/VideoDescription";
import { Container, InfoContainer, PostDate, Thumbnail, ThumbnailWrap, Title, VideoWrap, VideosContainer } from "@/styles/pages/Home";
import formatPostDate from "@/utils/formatPostDate";
import Link from "next/link";
import { useEffect, useState } from "react";


interface IVideos {
  id: string;
  title: string;
  tags: string[];
  views: number;
  createdAt: string;
  imageLink: string;
}


export default function Home() {

  const [loading, setLoading] = useState(true);
  const [videos, setVideos]  = useState<IVideos[]>([]);

  useEffect(() => {
    setLoading(true);
    const loadThumbs = async  () => {
      // const response = await fetch(`/api/thumbs/getThumbs`);

      // const videos: IVideos[] = await response.json();

      const videos = [{
        "id": "Pd-gp--YgQZFfZVb",
        "title": "É o Cássio kkkkkkk",
        "tags": [
          "Memes",
          "Futebol"
        ],
        "views": 92,
        "createdAt": "2023-07-25T19:50:04.379Z",
        "imageLink": "https://storage.googleapis.com/youtube-nextjs-thumbs/Pd-gp--YgQZFfZVb.png"
      }];
      
      if (videos) {
        setVideos(videos);
        setLoading(false);
      } 

    } 

    loadThumbs();
  }, [])


  return (
      <Container>

     { loading ? 
      <h2>Loading...</h2> :

    
      <VideosContainer>

        {videos.map(video => (
          <Link key={video.id} href={`/watch?v=${video.id}`}>
            <VideoWrap>
              <ThumbnailWrap>
                <Thumbnail src={video.imageLink} />
              </ThumbnailWrap>
              <Title>{video.title.slice(0,60)}{video.title.length > 60 ? '...' : ''}</Title>
              <InfoContainer>
                <Views>{video.views} visualizações</Views>
                <span>•</span>
                <PostDate>{formatPostDate(video.createdAt)}</PostDate>
              </InfoContainer>
            </VideoWrap>
          </Link>

        ))}

        
      </VideosContainer>
      }

      </Container>


  )
}