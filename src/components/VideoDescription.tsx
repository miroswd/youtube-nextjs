import { Description, DescriptionContainer, Line, PostDate, ShowMoreLine, Tag, TagsContainer, UpInfo, Views } from "@/styles/VideoDescription";
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
  const [lastLineChars, setLastLineChars] = useState(0);

  useEffect(() => {
    if (moreThanThreeLines) {
      setLastLineChars(lines[1].length);
    }
  }, [moreThanThreeLines, lines])

  const handleShowMore = useCallback(() => {
    setShowMore(!showMore)
  }, [showMore])

  return(
    <DescriptionContainer 
      showMore={showMore}
      lines={description.length} 
      charLastLine={lastLineChars}
    >

      <UpInfo>
      <Views>{views} de visualizações</Views>
      <PostDate>há {postDate}</PostDate>
      <TagsContainer>
        {tags.map(tag => (
          <Tag key={tag}>#{tag}</Tag>
        ))}
      </TagsContainer>
      </UpInfo>

      
      <Description>
        {
          lines.map((line, i) => {
            return i !== 2 ?
            <Line key={i}>
              {i && line.trim() === "" ? (<br/>) : line}
            </Line> : 
            moreThanThreeLines && (
              <ShowMoreLine showMore={showMore}>
                <Line key={i}>{line}</Line>
                <button onClick={handleShowMore}>
                  Mostrar {showMore ? 'mais' : 'menos'}
                </button>
              </ShowMoreLine>
            )
          })
        }

      </Description>      


      
  
    </DescriptionContainer>
  )
}