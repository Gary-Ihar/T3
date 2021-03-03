import React from 'react'
import styled from 'styled-components'
import { productCardWidth } from '../views/products'
import Image from './image'
import { color } from '../assets/theme/color'

const CardStyle = styled.div`
    display: flex;
    flex-direction: column;
    min-width: ${({width})=>width}px;
    min-height: 401px;
    overflow: hidden;
    border: 1px solid ${({bColor})=>bColor};
    border-radius: 4px;
`

const ProductCard = () => {
    return (
        <CardStyle width={productCardWidth} bColor={color.border_product_card_color}>
            <Image imgName='foto' height='242'/>
        </CardStyle>
    )
}

export default ProductCard
