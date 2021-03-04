import React from 'react'
import { Text } from "../assets/theme/styled-components";
import { color } from '../assets/theme/color'
import styled from 'styled-components';
import { productsStore } from '../store/product-store';

const Input = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    input {
        margin-right: 9px;
    }
`

const FilterInput = ({title, idGoods}) => {
    return (
        <Input>
            <input type='checkbox' name={idGoods.toLowerCase()} onChange={(e)=>productsStore.filterParam(e.target.name , e.target.checked)}/>
            <Text color={color.main_text} size='14px'>{title}</Text>
        </Input>
    )
}

export default FilterInput
