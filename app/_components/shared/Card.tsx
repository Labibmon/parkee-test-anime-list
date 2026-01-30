import styled from "styled-components";
import { useRouter } from "next/navigation";
import { Anime } from "@/app/_types/kitsu.types";

type Props = {
  anime: Anime;
};

export default function Card({ anime }: Props) {
  const router = useRouter();

  const titleEn =
    anime.attributes.titles.en ||
    anime.attributes.titles.en_us ||
    anime.attributes.canonicalTitle;
  const titleJp = anime.attributes.titles.ja_jp;

  return (
    <CardContainer onClick={() => router.push(`/anime/${anime.id}`)}>
      <Poster
        src={anime.attributes.posterImage.small}
        alt={titleEn}
        loading="lazy"
      />
      <Title>{titleEn}</Title>
      {titleJp && <SubTitle>{titleJp}</SubTitle>}
    </CardContainer>
  );
}

const CardContainer = styled.div`
  cursor: pointer;
  background: #000000;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const Title = styled.h3`
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 600;
  padding: 8px;
  color: #ffffff;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubTitle = styled.p`
  font-size: 12px;
  color: #ffffff;
  padding: 0 8px 8px;
`;
