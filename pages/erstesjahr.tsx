import { NextPage } from "next";
import React from "react";
import styled from "styled-components";
import { Description, PageWrapper, Title } from "../lib/styles";

const Image = styled.img`
  width: auto;
  height: auto;
  border-radius: 10px;
  max-height: 600px;
  margin: 0 auto;
  display: table;
  padding: 20px 0;
`;

const ErstesJahr: NextPage<Props> = ({}) => {
  return (
    <PageWrapper>
      <Title>Das erste Jahr</Title>
      <Description>
        Im Jahr 2019 hatten wir uns eine kleine Fläche von 4000m2 als
        Versuchsfeld vorgenommen. Viele Arbeiten, von der Aussaat bis zur Ernte
        erledigten wir per Hand.
      </Description>
      <Image src="/erstejahr/1.jpg" />
      <Description>
        Auch wenn das Wetter der Saat nicht gerade ideale Bedingungen bot,
        zeigten sich bald die Ersten der robusten Pflanzen.
      </Description>
      <Image src="/erstejahr/2.jpg" />
      <Description>Und sie entwickelten sich prächtig</Description>
      <Image src="/erstejahr/3.jpg" />
      <Description>immer höher…</Description>
      <Image src="/erstejahr/4.jpg" />
      <Description>
        Den richtigen Zeitpunkt zur Blüten-Ernte zu finden war nicht leicht.
      </Description>
      <Image src="/erstejahr/5.jpg" />
      <Description>
        Das Bild von den trocken Blüten hätte ich gerne in der Bildersammlung
        und hier raus, oder nach unten...
        <br />
        <br />
        Und schließlich folgte wochenendweise die Ernte durch viele fleißige
        Hände.
      </Description>
      <Image src="/erstejahr/6.jpg" />
      <Description>
        Per Hand geschnitten, vom Feld nach Hause geholt und zum Trocknen
        nachbearbeitet
      </Description>
      <Image src="/erstejahr/7.jpg" />
      <Description>
        Auf Netzen ausgebreitet und über Leinen gehängt wurde getrocknet.
      </Description>
      <Image src="/erstejahr/8.jpg" />
    </PageWrapper>
  );
};

export default ErstesJahr;

interface Props {}
