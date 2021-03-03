import styled from 'styled-components'

export const Text = styled.p`
    font-family: Montserrat;
    color: ${({color})=>color};
    font-weight: ${({bold})=> bold ? 700 : 500};
    font-size: ${({size})=>size};
`