"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Skeleton from "../shared/Skeleton";
import { Anime } from "@/app/_types/kitsu.types";
import { useRouter } from "next/navigation";
import AnimeDetailHeader from "./AnimeDetailHeader";
import AnimeDetailInfo from "./AnimeDetailInfo";

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

  return (
    <Wrapper>
      {loading ? (
        <>
          <Skeleton width="100%" height="70vh" radius="0" />
        </>
      ) : (
        <>
          <AnimeDetailHeader
            imageBackground={anime?.attributes.coverImage.original || ""}
            imagePoster={anime?.attributes.posterImage?.original || ""}
            titleEn={
              anime?.attributes.titles.en ||
              anime?.attributes.titles.en_us ||
              anime?.attributes.canonicalTitle ||
              ""
            }
            titleJpn={anime?.attributes.titles.ja_jp || ""}
          />

          <AnimeDetailInfo
            averageRating={anime?.attributes.averageRating || "0"}
            userCount={anime?.attributes.userCount || 0}
            synopsis={anime?.attributes.synopsis || ""}
            subtype={anime?.attributes.subtype ?? "-"}
            episodeCount={anime?.attributes.episodeCount ?? 0}
            startDate={anime?.attributes.startDate ?? "-"}
            endDate={anime?.attributes.endDate ?? "Ongoing"}
          />
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

const ErrorText = styled.p`
  text-align: center;
  color: #ef4444;
`;
