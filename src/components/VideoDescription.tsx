import { Description, DescriptionContainer, Line, PostDate, ShowMoreLine, TagsContainer, UpInfo, Views } from "@/styles/VideoDescription";
import { useCallback, useEffect, useState } from "react";

interface IVideoDescriptionProps {
  views: number;
  postDate: string;
  tags: string[];
  description: string;
}

export default function VideoDescription({ 
  views,
  postDate,
  tags,
  description
}: IVideoDescriptionProps) {

  const lines = description.split('\n');
  const moreThanThreeLines = lines.length > 3;
  const [showMore, setShowMore] = useState(true);

  const handleShowMore = useCallback(() => {
    setShowMore(!showMore)
  }, [showMore])

  return(
    <DescriptionContainer 
      showMore={showMore}
      lines={description.length} 
    >

      <UpInfo>
        <div>
          <Views>{views} {views !== 1 ? 'visualizações' : 'visualização'}</Views>
          <PostDate>{postDate}</PostDate>
        </div>
        <TagsContainer>
          {tags.map(tag => (
            <span key={tag}>#{tag}</span>
          ))}
        </TagsContainer>

      </UpInfo>

      {
        showMore ? (
          <Description>
          {
            lines.slice(0,3).map((line, i) => {
              return i !== 2 ?
              <Line key={i}>
                {i && line.trim() === "" ? (<br/>) : line}
              </Line> : 
              moreThanThreeLines && (
                <ShowMoreLine showMore={showMore}>
                  <Line key={i}>{line}</Line>
                  <button onClick={handleShowMore}>
                    Mostrar mais
                  </button>
                </ShowMoreLine>
              )
            })
          }
        </Description> 
        ) : (

       <Description>
        {
          lines.map((line, i) => (
            <Line  key={i}>
              {i && line.trim() === "" ? (<br/>) : line}
            </Line>
          
          ))
        }
        <ShowMoreLine showMore={showMore}>
          <button onClick={handleShowMore}>
            Mostrar {showMore ? 'mais' : 'menos'}
          </button>
        </ShowMoreLine>
     </Description>   
        )
      }
    </DescriptionContainer>
  )
}