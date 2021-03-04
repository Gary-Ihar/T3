import React from "react";
import styled from "styled-components";
import { color } from "../assets/theme/color";
import { Text } from "../assets/theme/styled-components";
import { observer } from "mobx-react";
import { productsStore } from "../store/product-store";
import FilterInput from "../components/filter-input";

const Form = observer(() => {
  return (
    <FormStyle>
      <Text color={color.helper_text} size="14px">
        Товаров {productsStore.store.products.length}
      </Text>
      <Text color={color.header_text} size="32px" bold>
        Камеры
      </Text>
      <Text color={color.header_text} size="16px" bold>
        Цена, ₽
      </Text>
      {/* TODO: Тут чет с ценами магию сотворить. */}
      <Text color={color.header_text} size="16px" bold className='brand-header'>
        Бренд
      </Text>
      {productsStore.store.filter.length > 0 &&
        productsStore.store.filter.map((param, i) => (
          <FilterInput
            key={param.value}
            title={param.title}
            idGoods={`Товар ${i + 1}`}
          />
        ))}
    </FormStyle>
  );
});

export default Form;

const FormStyle = styled.div`
  width: 100%;
  max-width: 225px;

  & > p:nth-child(1) {
    margin-bottom: 5px;
  }
  & > p:nth-child(2) {
    margin-bottom: 13px;
  }
  & > p:nth-child(3) {
    margin-bottom: 13px;
  }
  .brand-header {
    margin-bottom: 13px;
  }
`;