import styled from "styled-components";
import Button from "../shared/Button";
import { getPaginationRange } from "@/app/_utils/getPaginationRange";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  // disabled: boolean;
};

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: // disabled,
Props) {
  const paginationRange = getPaginationRange(page, totalPages);

  return (
    <>
      <Wrapper>
        <Button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          Prev
        </Button>

        {paginationRange.map((item, index) =>
          item === "..." ? (
            <Dots key={`dots-${index}`}>…</Dots>
          ) : (
            <PageButton
              key={`page-${item}-${index}`}
              $active={item === page}
              onClick={() => onPageChange(item)}
              // disabled={disabled}
            >
              {item}
            </PageButton>
          )
        )}

        <Button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PageButton = styled(Button)<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? "#2563eb" : "#eee")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};
`;

const Dots = styled.span`
  padding: 8px 12px;
  color: #6b7280;
`;
