import React from "react";
import styled from 'styled-components';

export const productCardWidth = 240

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${productCardWidth}px , 1fr));
    grid-gap: 24px;
`
const Products = () => {
    return (
        <Container>

        </Container>
    )
}

export default Products
