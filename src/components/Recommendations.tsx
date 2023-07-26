import { Views } from "@/styles/VideoDescription";
import { Carousel, Container, InfoContainer, LeftContainer, PostDate, RightContainer, Tag, Thumbnail, ThumbnailWrap, Title, Topics, VideoWrap, VideosContainer } from "@/styles/Recommendations";
import formatPostDate from "@/utils/formatPostDate";
import Link from "next/link";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";

import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md"

interface IVideos {
  id: string;
  title: string;
  tags: string[];
  views: number;
  createdAt: string;
  imageLink: string;
}

type DivRef = RefObject<HTMLDivElement>;


type DirectionEnum = 'left'| 'right';

interface IRecommendations {
  hideCurrentVideo: string;
}

export default function Recommendations({ hideCurrentVideo }: IRecommendations) {
  const topicsRef: DivRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [tagActive, setTagActive] = useState('Todos');
  const [videos, setVideos]  = useState<IVideos[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<IVideos[]>([]);
  const [tags, setTags] = useState(['']);

  const [availableScrollLeft, setAvailableScrollLeft] = useState(false);
  const [availableScrollRight, setAvailableScrollRight] = useState(true);


  useEffect(() => {
    setLoading(true);
    const loadThumbs = async  () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/thumbs/getThumbs`);

      const videos: IVideos[] = await response.json();

      
      if (videos) {
        setVideos(videos);
        setFilteredVideos(videos);

        const selectedTags = videos.map(video => video.tags).flat();

        const allTags = ["Todos", ...selectedTags]

        setTags(Array.from(new Set(allTags)))

        setLoading(false);
      } 

    } 

    loadThumbs();
  }, [])



  const handleSlideCarousel = useCallback((direction: DirectionEnum) => {
    const topicsCarousel = topicsRef.current;

    if (!topicsCarousel) return;

    if (direction === 'left') {
      topicsCarousel.scrollBy({
        left: -200,
        behavior: 'smooth'
      })
    } else {
      topicsCarousel.scrollBy({
        left: 200,
        behavior: 'smooth'
      })
    }

    const scrollLeft = topicsCarousel.scrollLeft;
    const visibleWidth = topicsCarousel.clientWidth;
    const totalWidth = topicsCarousel.scrollWidth;
  
    setAvailableScrollLeft(scrollLeft < totalWidth - visibleWidth);
    setAvailableScrollRight(scrollLeft > 0);

    console.log({
      scrollLeft, 
      totalWidth, 
      visibleWidth, 
      right: scrollLeft > 0,
      left: scrollLeft < totalWidth - visibleWidth
    })

  }, [])


  const handleSelectVideoCategory = useCallback((tag: string) => {
    
    const filteredByTag = videos.filter(video => video.tags.includes(tag) && video.id !== hideCurrentVideo);  

    setTagActive(tag);
      
    if (filteredByTag.length > 0)  {
      return setFilteredVideos(filteredByTag)
    }
  
    return setFilteredVideos(videos);
  },[videos, hideCurrentVideo])

  return (
      <Container>
      <Carousel left={availableScrollLeft} right={availableScrollRight}>
        <button type="button" onClick={() => handleSlideCarousel('left')}>
          <MdOutlineNavigateBefore />
        </button>
      <Topics ref={topicsRef} left={availableScrollLeft} right={availableScrollRight}>
        {tags.map((tag, i) => (
          <Tag
           key={tag}
           onClick={() => handleSelectVideoCategory(tag)}
           active={tag === tagActive}
           >{tag}</Tag>
        ))}
      </Topics>
      <button type="button"  onClick={() => handleSlideCarousel('right')}>
        <MdOutlineNavigateNext />
      </button>

      </Carousel>
      <VideosContainer>
        {filteredVideos.map(video => (
          <Link key={video.id} href={`/watch?v=${video.id}`}>
            <VideoWrap>
            <LeftContainer>
              <ThumbnailWrap>
                <Thumbnail src={video.imageLink} />
              </ThumbnailWrap>
              </LeftContainer>
              <RightContainer>
              <Title>{video.title.slice(0,60)}{video.title.length > 60 ? '...' : ''}</Title>
              <InfoContainer>
                <Views>{video.views} visualizações</Views>
                <span>•</span>
                <PostDate>{formatPostDate(video.createdAt)}</PostDate>
              </InfoContainer>
              </RightContainer>
            </VideoWrap>

          </Link>
        ))}
        </VideosContainer>
      </Container>
  )
}