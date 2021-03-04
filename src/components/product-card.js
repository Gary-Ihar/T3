import React from 'react'
import styled from 'styled-components'
import { productCardWidth } from '../views/products'
import Image from './image'
import { color } from '../assets/theme/color'
import { Text } from '../assets/theme/styled-components'

const CardStyle = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: ${({width})=>width}px;
    min-height: 401px;
    overflow: hidden;
    border: 1px solid ${({bColor})=>bColor};
    border-radius: 4px;
    .price-section {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`
const Content = styled.div`
    padding: 12px 16px 16px;
`
const IsNew = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
`

const ProductCard = ({data}) => {
    return (
        <CardStyle width={productCardWidth} bColor={color.border_product_card_color}>
            {data.is_new && <IsNew>новинка</IsNew>}
            <Image imgName='foto' height='242'/>
            <Content>
                <Text size="14px">{data.title}</Text>
                <div className='price-section'>
                    <Text size="16px" bold>{data.price} ₽</Text>
                    {data.is_second_hand && <Text size='11px'>Новое</Text>}
                </div>
                <button>В корзину</button>
            </Content>
        </CardStyle>
    )
}

export default ProductCard
