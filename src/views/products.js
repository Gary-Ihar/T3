import React from "react";
import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px , 1fr)); // TODO: 240px ширина карточки товара. Скорее всего это цифра будет еще раз использовать. ВЫНЕСТИ ЕЕ.
    grid-gap: 24px;
`
const Products = () => {
    return (
        <Container>

        </Container>
    )
}

export default Products
