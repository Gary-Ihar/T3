import React from "react";
import styled from "styled-components";
import "../assets/css/index.css";
// TODO: До сих пор нет норм способа подключить шрифты в приложение с styled-components.
// Сами авторы просят использовать font-display: fallback https://styled-components.com/docs/faqs#how-do-i-fix-flickering-text-after-server-side-rendering
// Но даже на моей машине при достаточно раздутом проекте можно заметить это мерцание/блики. В нашей приложухе такого не будет. Нет роутинга и много чего еще.
//
// Я не считаю зазорным подрубить старый добрый CSS :)

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1300px;
  display: grid;
  grid-template-columns: 225px 1fr ;
  grid-column-gap: 40px;
`;

const App = () => {
  return (
    <Container>
    </Container>
  );
};

export default App;
