import React, { useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { productsStore } from "../store/product-store";
import ProductCard from '../components/product-card'

export const productCardWidth = 240;

const Products = observer(() => {
    
  useEffect(() => {
    productsStore.productsFetch();
  }, []);

  return (
    <Container>
      {productsStore.getProducts().map((product) => <ProductCard key={product.id} data={product}/>)}
    </Container>
  );
});

export default Products;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${productCardWidth}px, 1fr));
  grid-gap: 24px;
  @media screen and (max-width: 578px){
    grid-gap: 0px;
  }
`;