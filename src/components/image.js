import React from "react";
import styled from "styled-components";

const Image = ({ imgName, alt, height }) => {
  return (
    <ImgStyle
      src={require(`../assets/img/${imgName}.png`).default}
      alt={alt || "image"}
      height={height}
    />
  );
};

export default Image;
//TODO: Адаптив картинки навреное лучше сиюда прикрутить. С задаваемыми параметрами. Хотя это визуально  может перегрузить саму компоненту пропсами... Не знаю как лучше. Надо попробовать и так и так будет.
const ImgStyle = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: ${({ height }) => height}px;
`;
