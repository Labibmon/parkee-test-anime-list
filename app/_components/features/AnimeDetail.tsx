"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Skeleton from "../shared/Skeleton";
import { Anime } from "@/app/_types/kitsu.types";
import { useRouter } from "next/navigation";

type AnimeDetail = {
  id: string;
};

const AnimeDetail = ({ id }: AnimeDetail) => {
  const router = useRouter();
  const [anime, setAnime] = useState<Anime>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchAnimeDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/anime/detail/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch anime detail");
        }

        const data = await res.json();

        if (active) {
          setAnime(data.data ?? null);
        }
      } catch (err) {
        if (active) {
          setError("Something went wrong");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchAnimeDetail();

    return () => {
      active = false;
    };
  }, [id]);

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  if (!anime && !loading) {
    return <ErrorText>Anime not found</ErrorText>;
  }

  console.log("anime", anime);

  return (
    <Wrapper>
      {loading ? (
        <>
          <Skeleton width="100%" height="70vh" radius="0" />
        </>
      ) : (
        <>
          <Header>
            <Background $image={anime?.attributes.coverImage.original} />
            <BackButton onClick={() => router.push("/")}>← Back</BackButton>
            <HeaderContent>
              <HeaderInside>
                <Poster
                  src={anime?.attributes.posterImage?.original}
                  alt={anime?.attributes.canonicalTitle}
                />
                <Content>
                  <Title>
                    {anime?.attributes.titles.en ||
                      anime?.attributes.titles.en_us ||
                      anime?.attributes.canonicalTitle}
                  </Title>
                  <SubTitle>{anime?.attributes.titles.ja_jp}</SubTitle>
                </Content>
              </HeaderInside>
            </HeaderContent>
          </Header>

          <InfoContainer>
            <Rating>
              <h3>SCORE</h3>
              <h4>{anime?.attributes.averageRating}</h4>
              <h3>{anime?.attributes.userCount} Users</h3>
            </Rating>
            <InfoContent>
              <InfoTitle>Synopsis</InfoTitle>
              <InfoSynopsis>{anime?.attributes.synopsis}</InfoSynopsis>
            </InfoContent>
          </InfoContainer>
        </>
      )}
    </Wrapper>
  );
};

export default AnimeDetail;

const Wrapper = styled.div`
  margin: 0 auto;
  overflow-x: hidden;
`;

const Header = styled.div`
  position: relative;
  height: 70vh;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: auto;
    min-height: 60vh;
    padding: 32px 0;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 4;

  background: rgba(0, 0, 0, 0.65);
  color: #ffffff;
  border: none;
  border-radius: 999px;
  padding: 10px 14px;

  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 12px;
  }
`;

const Background = styled.div<{ $image?: string }>`
  position: absolute;
  inset: 0;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: 30% center;
  filter: grayscale(85%) brightness(0.5) contrast(1.25);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0)
    );
  }

  @media (max-width: 768px) {
    background-position: center;
    filter: grayscale(60%) brightness(0.55);
  }
`;

const Poster = styled.img`
  width: 280px;
  height: 360px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 180px;
    height: 260px;
  }
`;

const HeaderInside = styled.div`
  max-width: 80rem;
  width: 100%;
  margin: auto;

  display: flex;
  gap: 34px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
    padding: 0 16px;
  }
`;

const HeaderContent = styled.div`
  z-index: 2;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const Title = styled.h3`
  text-transform: uppercase;
  font-weight: 600;
  color: #ffffff;

  font-size: 48px;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 24px;
    white-space: normal;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
`;

const SubTitle = styled.p`
  color: #ffffff;
  font-size: 32px;
  padding: 0 8px 8px;

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 0;
  }
`;

const ErrorText = styled.p`
  text-align: center;
  color: #ef4444;
`;

//INFO DETAIL ANIME
const InfoContainer = styled.div`
  max-width: 80rem;
  width: 100%;
  margin: auto;
  padding: 24px 16px;

  display: flex;
  gap: 28px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const InfoContent = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
`;

const InfoTitle = styled.h4`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;

  @media (max-width: 640px) {
    text-align: center;
    font-size: 20px;
  }
`;

const InfoSynopsis = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 1.7;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 16px;
    text-align: justify;
  }
`;

const Rating = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.primary};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;

  h4 {
    font-size: 48px;
  }

  @media (max-width: 768px) {
    width: 8rem;
    height: 8rem;

    h4 {
      font-size: 32px;
    }
  }
`;
