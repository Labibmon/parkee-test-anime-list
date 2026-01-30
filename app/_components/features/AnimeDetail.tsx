"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Skeleton from "../shared/Skeleton";
import { Anime } from "@/app/_types/kitsu.types";

type AnimeDetail = {
  id: string;
};

const AnimeDetail = ({ id }: AnimeDetail) => {
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
        </>
      )}
    </Wrapper>
  );
};

export default AnimeDetail;

const Wrapper = styled.div`
  margin: 0 auto;
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
