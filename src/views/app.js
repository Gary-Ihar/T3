import React from "react";
import styled from "styled-components";
import Form from "./form";
import Products from "./products";
import "../assets/css/index.css";
// TODO: До сих пор нет норм способа подключить шрифты в приложение с styled-components.
// Сами авторы просят использовать font-display: fallback https://styled-components.com/docs/faqs#how-do-i-fix-flickering-text-after-server-side-rendering
// Но даже на моей машине при достаточно раздутом проекте можно заметить это мерцание/блики. В нашей приложухе такого не будет. Нет роутинга и много чего еще.
//
// Я не считаю зазорным подрубить старый добрый CSS :)

const App = () => {
  return (
    <Container>
      <Form />
      <Products />
    </Container>
  );
};

export default App;

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1340px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 225px 1fr;
  grid-column-gap: 40px;
  padding-top: 64px;
  @media screen and (max-width: 578px) {
    display: flex;
    flex-direction: column;
    padding-top: 47px;
    & > div:first-child {
      margin-bottom: 48px;
    }
  }
`;
