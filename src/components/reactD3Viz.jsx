import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Container, Col, Row, Image } from "react-bootstrap";
import TitleImage from "../assets/title.png";
import "./style.css";
import ObsGeo from "./observableGeo";
import ObsLoc from "./observableChart";

// import Chart from '../components/chart.jsx' // Uncomment if you wish to bring D3 into the template, and the <Chart><Chart/> component line in the render function.

export default function ReactD3Viz() {
  return (
    <Container>
      <Row>
        <Col>
          <Image className="title-image" src={TitleImage} />
        </Col>
      </Row>
      <Row>
        <span className="figure-text">
          Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna.
        </span>
      </Row>
      <Row className="text-center lead">
        <span className="introductory-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam
          velit, vulputate eu pharetra nec, mattis ac neque. Quisque nec mauris
          sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio,
          elementum in tempus ut, vehicula eu diam.
        </span>
      </Row>
      <Row>
        <h1 className="section-header-question">Fish species by location</h1>
      </Row>
      <Row className="text-center lead">
        <p className="">
          Select a station and a type to view the fish found at that location
        </p>
      </Row>
      {/* loads the component for the first view, which includes the html */}
      <ObsLoc />
      <Row className="text-center lead">
        <span className="introductory-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam
          velit, vulputate eu pharetra nec, mattis ac neque. Quisque nec mauris
          sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio,
          elementum in tempus ut, vehicula eu diam.
        </span>
      </Row>
      <Row>
        <h1 className="section-header-question">Geographic range of fish</h1>
      </Row>
      <Row className="text-center lead">
        <p className="">
          Select a group and species to view the sites where that species has
          been observed
        </p>
      </Row>
      <ObsGeo />

      {/* <Chart></Chart> */}
    </Container>
  );
}

// This is where react reaches into the DOM, finds the <div id="chart"> element, and replaces it with the content of ReactD3Viz's render function JSX.
const domContainer = document.querySelector("#reactchart");
ReactDOM.render(<ReactD3Viz />, domContainer);
