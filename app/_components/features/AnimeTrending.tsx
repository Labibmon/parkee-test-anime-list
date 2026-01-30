"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Skeleton from "../shared/Skeleton";
import { Anime } from "@/app/_types/kitsu.types";
import BannerCarousel, { Banner } from "../shared/Banner";

const AnimeTrending = () => {
  const [loading, setLoading] = useState(true);
  const [animeTrending, setAnimeTrending] = useState<Anime[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchAnimeTrending = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/anime/trending`);

        if (!res.ok) {
          throw new Error("Failed to fetch anime");
        }

        const data = await res.json();

        if (active) {
          setAnimeTrending(data.anime ?? []);
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

    fetchAnimeTrending();

    return () => {
      active = false;
    };
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <Skeleton width="100%" height="70vh" radius="0" />
      ) : (
        <BannerCarousel
          items={animeTrending.map((trending) => ({
            id: Number(trending.id),
            backgroundImage: trending.attributes.coverImage?.original,
            image: trending.attributes.posterImage?.original,
            title:
              trending.attributes.titles.en ||
              trending.attributes.titles.en_us ||
              trending.attributes.canonicalTitle,
            titleJpn: trending.attributes.titles.ja_jp,
            subtitle: trending.attributes.description,
          }))}
        />
      )}
    </Wrapper>
  );
};

export default AnimeTrending;

const Wrapper = styled.div`

`;
