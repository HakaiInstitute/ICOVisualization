import React, { useRef, useEffect } from "react";
import { Runtime, Inspector } from "@observablehq/runtime";
import notebook from "73c68590a6b8ba4c";
import { Container, Col, Row, Image, Button } from "react-bootstrap";

function Notebook() {
  const ref = useRef();

  useEffect(() => {
    new Runtime().module(notebook, (name) => {
      if (name === "viewof sites")
        return Inspector.into(ref.current.querySelector(".viewof-sites"))();
      if (name === "viewof rects")
        return Inspector.into(ref.current.querySelector(".viewof-rects"))();
      if (name === "style")
        return Inspector.into(ref.current.querySelector(".style"))();

      if (name === "viewof cc")
        return Inspector.into(ref.current.querySelector(".viewof-cc"))();
      if (name === "share")
        return Inspector.into(ref.current.querySelector(".share"))();

      // if (name === "type") {
      //   const node = document.querySelector("#type-output");
      //   return {
      //     pending() {},
      //     fulfilled(value) {
      //       node.innerText = value;
      //     },
      //     rejected(error) {
      //       node.textContent = error.message;
      //     },
      //   };
      // }
      if (name === "title")
        return Inspector.into(ref.current.querySelector(".title"))();
    });
  }, []);

  return (
    <div ref={ref}>
      <Row>
        <Col>
          {/* Fish observed at <b>Quadra Island</b> */}
          <div className="Notebook">
            <div className="viewof-sites"></div>
          </div>
        </Col>

        <Col>
          {/* <Row className='fish-button-row'> */}
          <div className="Notebook">
            <div className="viewof-rects"></div>
            <div className="style"></div>
          </div>
        </Col>
      </Row>
      {/* <Row className="text-center lead">
        <p className="">
          Select a station and a type to view the fish found at that location
        </p>
      </Row> */}
      <Row>
        <div className="barCharts">
          {/* <p className="">
            <span id="type-output"></span> at location
          </p> */}
          <div className="title"></div>
          <div className="share"></div>
          <div className="viewof-cc"></div>
        </div>
      </Row>
    </div>
  );
}

export default Notebook;
