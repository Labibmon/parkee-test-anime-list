import styled from "styled-components";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const OPTIONS = [5, 10, 20];

export default function ItemsPerPage({ value, onChange }: Props) {
  return (
    <Wrapper>
      <label>Show</label>
      <Select value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </Select>
      <span>per page</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

const Select = styled.select`
  padding: 6px 10px;
  border-radius: 6px;
`;
