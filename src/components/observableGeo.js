import React, { useRef, useEffect } from "react";
import { Runtime, Inspector } from "@observablehq/runtime";
import notebook from "1aff5f3ccb61927a";
import { Container, Col, Row, Image, Button } from "react-bootstrap";

function Notebook() {
  const ref = useRef();

  useEffect(() => {
    new Runtime().module(notebook, (name) => {
      if (name === "viewof fishSelect")
        return Inspector.into(
          ref.current.querySelector(".viewof-fishSelect")
        )();
      if (name === "viewof speciesList")
        return Inspector.into(
          ref.current.querySelector(".viewof-speciesList")
        )();
      if (name === "viewof date")
        return Inspector.into(ref.current.querySelector(".viewof-date"))();
      if (name === "viewof sites")
        return Inspector.into(ref.current.querySelector(".viewof-map"))();
      if (name === "viewof cc")
        return Inspector.into(ref.current.querySelector(".viewof-cc"))();
      if (name === "share")
        return Inspector.into(ref.current.querySelector(".share"))();
      // return [
      //   "share",
      //   "heatData",
      //   "mapLocs",
      //   "chartData",
      //   "chart2",
      //   "sites",
      //   "barz",
      //   "maxSitesPerMonth",
      //   "monthlySiteCount",
      //   "sitesCountbyMonth",
      //   "cc",
      //   "dateFilter",
      // ].includes(name);
    });
  }, []);

  return (
    <div ref={ref}>
      <Row>
        <Col>
          {/* Fish observed at <b>Quadra Island</b> */}
          <div className="Notebook">
            <div className="viewof-map"></div>
            <div className="viewof-date"></div>
          </div>
        </Col>

        <Col>
          {/* <Row className='fish-button-row'> */}
          <div className="Notebook">
            <div className="viewof-fishSelect"></div>
            <div
              className="viewof-speciesList"
              style={{ textAlign: "center" }}
            ></div>
            {/* <div className="viewof-date"></div> */}
            {/* <div className="style"></div> */}
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
          {/* <div className="title"></div> */}
          <div className="share"></div>
          <div className="viewof-cc"></div>
        </div>
      </Row>
    </div>
  );
}

export default Notebook;
