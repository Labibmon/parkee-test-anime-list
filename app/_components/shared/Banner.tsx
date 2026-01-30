import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styled from "styled-components";
import Button from "./Button";

export type Banner = {
  id: number;
  backgroundImage: string;
  image: string;
  title: {
    en: string;
    en_jp: string;
    en_us: string;
    ja_jp: string;
  };
  subtitle?: string;
};

interface BannerCarousel {
  items: Banner[];
}

const AUTO_SLIDE_INTERVAL = 5000;

const BannerCarousel = ({ items }: BannerCarousel) => {
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [paused, items.length]);

  const prev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Wrapper
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <NavButton $left onClick={prev}>
        ‹
      </NavButton>
      <Slider $index={activeIndex}>
        {items.map((banner) => (
          <Slide key={banner.id}>
            <Background $image={banner.backgroundImage} />
            <Content>
              <h4>Trending</h4>
              <h2>{banner.title.en || banner.title.en_us}</h2>
              <h3>{banner.title.ja_jp}</h3>
              <p>{banner.subtitle}</p>
              <Button onClick={() => router.push(`/anime/${banner.id}`)}>
                Check Now
              </Button>
            </Content>
          </Slide>
        ))}
      </Slider>
      <DotsContainer>
        <Dots>
          {items.map((_, i) => (
            <Dot key={i} $active={i === activeIndex} onClick={() => goTo(i)} />
          ))}
        </Dots>
      </DotsContainer>
      <NavButton onClick={next}>›</NavButton>
    </Wrapper>
  );
};

export default BannerCarousel;

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 70vh;
  background: ${({ theme }) => theme.colors.black};
`;

const Slider = styled.div<{ $index: number }>`
  display: flex;
  height: 100%;
  transform: translateX(${({ $index }) => `-${$index * 100}%`});
  transition: transform 0.6s ease;
`;

const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  position: relative;
`;

const Background = styled.div<{ $image: string }>`
  position: absolute;
  inset: 0;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: 30% center;
  filter: grayscale(85%) brightness(0.5) contrast(1.25);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 90%;
    height: 100%;

    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.65),
      rgba(0, 0, 0, 0)
    );

    pointer-events: none;
  }
`;

const Content = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;

  max-width: 80rem;
  height: 60%;
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  color: ${({ theme }) => theme.colors.white};

  > h2 {
    font-size: 48px;
    font-weight: 600;
  }

  > h3 {
    font-size: 24px;
    font-weight: 600;
  }

  p{
    margin-top: 12px;
    margin-bottom: 24px;
    width: 50%;
    display: -webkit-box;
    -webkit-line-clamp: 5; /* 👈 max lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const NavButton = styled.button<{ $left?: boolean }>`
  position: absolute;
  top: 50%;
  ${({ $left }) => ($left ? "left: 24px;" : "right: 24px;")}
  transform: translateY(-50%);

  z-index: 10; /* 👈 FIX */

  background: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 32px;
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 0;

  width: 100%;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: start;
`;

const Dots = styled.div`
  width: 80rem;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 8px;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "40px" : "20px")};
  border-radius: ${({ $active }) => ($active ? "999px" : "50%")};
  height: 20px;
  border: none;
  cursor: pointer;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "rgba(255,255,255,0.5)"};
`;
