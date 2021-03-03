import React from "react";
import styled from "styled-components";
import { color } from "../assets/theme/color";
import { Text } from "../assets/theme/styled-components";

const FormStyle = styled.div`
  width: 100%;
  max-width: 225px;

  p:nth-child(1) {
    margin-bottom: 5px;
  }
  p:nth-child(2) {
    margin-bottom: 13px;
  }
  p:nth-child(3) {
    margin-bottom: 13px;
  }
`;

const Form = () => {
  return (
    <FormStyle>
      <Text color={color.helper_text} size="14px">
        Товаров {/*TODO: Притянуть сюда цифру о кол-ве товаров.*/}
      </Text>
      <Text color={color.header_text} size="32px" bold>
        Камеры
      </Text>
      <Text color={color.header_text} size="16px" bold>
        Цена, ₽
      </Text>
      {/* TODO: Тут чет с ценами магию сотворить. */}
      <Text color={color.header_text} size="16px" bold>
        Бренд
      </Text>
      {/* TODO: Нарисовать много инпутов с фильтрами. */}
    </FormStyle>
  );
};

export default Form;
