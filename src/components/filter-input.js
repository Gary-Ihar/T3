import React from 'react'
import { Text } from "../assets/theme/styled-components";
import { color } from '../assets/theme/color'
import styled from 'styled-components';

const Input = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    input {
        margin-right: 9px;
    }
`

const FilterInput = ({title}) => {
    return (
        <Input>
            <input type='checkbox'/>
            <Text color={color.main_text} size='14px'>{title}</Text>
        </Input>
    )
}

export default FilterInput
