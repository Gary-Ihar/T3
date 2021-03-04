import React from "react";
import styled from "styled-components";
import { productCardWidth } from "../views/products";
import Image from "./image";
import { color } from "../assets/theme/color";
import { Text } from "../assets/theme/styled-components";

const ProductCard = ({ data }) => {
  return (
    <CardStyle
      width={productCardWidth}
      bColor={color.border_product_card_color}
    >
      {data.is_new && (
        <IsNew>
          <Text size="10px" color={color.white} bold>
            новинка
          </Text>
        </IsNew>
      )}
      <Image imgName="foto" height="242" />
      <Content>
        <Text size="14px" className="title">
          {data.title}
        </Text>
        <div className="price-section">
          <Text size="16px" bold>
            {data.price.slice(0, -3)} ₽
          </Text>
          {/* TODO: У меня не остается времени поставить пробел между цифрами. В этом ниче сложного, я на словах могу накидать как это сделать.
                        Я бы завел хелпер функцию и через нее пропускал бы занчение helper(data.price)*/}
          {data.is_second_hand && <Text size="11px">Новое</Text>}{" "}
          {/*TODO: Я не уверен, от чего зависит это */}
        </div>
        {/*TODO: Тут есть сердечко, я не понял логику его появления. Избранное? Но оно не у всех есть... */}
        <PayButton borderColor={color.border_button_color}>В корзину</PayButton>
      </Content>
    </CardStyle>
  );
};

export default ProductCard;

const CardStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: ${({ width }) => width}px;
  overflow: hidden;
  border: 1px solid ${({ bColor }) => bColor};
  border-radius: 4px;
  .title {
    height: 40px;
    overflow: hidden; // TODO: Текст лучше наверное скриптом обрезать, а не вот так вот.
    margin-bottom: 11px;
  }
  .price-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
  }
  @media screen and (max-width: 578px) {
    flex-direction: row;
    padding: 20px 0;
    border: none;
    border-bottom: 1px solid ${({ bColor }) => bColor};
    overflow: visible;
    border-radius: 0px;
    & > img {
      width: 124px;
      height: 124px;
      border-radius: 4px;
    }
    &:after {
      content: "";
      position: absolute;
      bottom: -1px;
      right: -20px;
      background: ${({ bColor }) => bColor};
      width: 20px;
      height: 1px;
    }
    &:before {
      content: "";
      position: absolute;
      bottom: -1px;
      left: -20px;
      background: ${({ bColor }) => bColor};
      width: 20px;
      height: 1px;
    }
    .title {
      height: 39px;
    }
  }
`;
const Content = styled.div`
  padding: 12px 16px 16px;
  width: 100%;
  @media screen and (max-width: 578px) {
    padding: 0 0 0 16px;
  }
`;
const IsNew = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: ${({ BGColor }) => BGColor || color.new_product_bg_color};
  padding: 6px 10px;
  border-radius: 26px;
  @media screen and (max-width: 578px) {
    top: 26px;
    left: 6px;
  }
`;

const PayButton = styled.button`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px 15px;
  border: 1px solid ${({ borderColor }) => borderColor};
  cursor: pointer;
  outline: none;
`;
