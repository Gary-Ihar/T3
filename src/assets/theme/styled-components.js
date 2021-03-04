import styled from 'styled-components'
import { color as themeColor } from './color'

export const Text = styled.p`
    font-family: Montserrat;
    color: ${({color})=>color || themeColor.main_text};
    font-weight: ${({bold})=> bold ? 700 : 500};
    font-size: ${({size})=>size};
`