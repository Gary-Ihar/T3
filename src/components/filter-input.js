import React from 'react'
import { Text } from "../assets/theme/styled-components";
import { color } from '../assets/theme/color'
import styled from 'styled-components';
import { productsStore } from '../store/product-store';
// TODO: Вообще наверное лучше завернуть инпут в тег label чтобы можно было еще кастомизировать сам чекбокс. Но по макету это не нужно вроде как.
const FilterInput = ({title, idGoods}) => {
    return (
        <Input>
            <input type='checkbox' name={idGoods.toLowerCase()} onChange={(e)=>productsStore.filterParam(e.target.name , e.target.checked)}/>
            <Text color={color.main_text} size='14px'>{title}</Text>
        </Input>
    )
}

export default FilterInput

const Input = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    input {
        margin-right: 9px;
    }
`
