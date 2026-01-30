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

const AUTO_SLIDE_INTERVAL = 10000;

const BannerCarousel = ({ items }: BannerCarousel) => {
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

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
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) next();
    if (distance < -minSwipeDistance) prev();
  };

  return (
    <Wrapper
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
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

  touch-action: pan-y;
  user-select: none;

  @media (max-width: 768px) {
    height: 55vh;
  }

  @media (max-width: 480px) {
    height: 80vh;
  }
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
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0)
    );
  }

  @media (max-width: 768px) {
    background-position: center;
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

  padding: 0 24px;

  > h2 {
    font-size: 48px;
    font-weight: 600;
  }

  > h3 {
    font-size: 24px;
    font-weight: 600;
  }

  p {
    margin-top: 12px;
    margin-bottom: 24px;
    width: 50%;

    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* 📱 MOBILE */
  @media (max-width: 768px) {
    height: auto;
    align-items: flex-start;

    > h2 {
      font-size: 28px;
      line-height: 1.2;
    }

    > h3 {
      font-size: 16px;
    }

    p {
      width: 100%;
      -webkit-line-clamp: 3;
    }
  }
`;

const NavButton = styled.button<{ $left?: boolean }>`
  position: absolute;
  top: 50%;
  ${({ $left }) => ($left ? "left: 24px;" : "right: 24px;")}
  transform: translateY(-50%);
  z-index: 10;

  background: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 32px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 100%;

  display: flex;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
    bottom: 16px;
  }
`;

const Dots = styled.div`
  width: 80rem;
  margin: 0 auto;

  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    width: auto;
  }
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "40px" : "20px")};
  border-radius: ${({ $active }) => ($active ? "999px" : "50%")};
  height: 20px;
  border: none;
  cursor: pointer;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "rgba(255,255,255,0.5)"};

  @media (max-width: 768px) {
    width: ${({ $active }) => ($active ? "20px" : "10px")};
    height: 10px;
  }
`;
