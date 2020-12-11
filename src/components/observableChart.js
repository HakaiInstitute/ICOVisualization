import React, {useRef, useEffect} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "73c68590a6b8ba4c";
import {Container, Col, Row, Image, Button} from 'react-bootstrap'

function Notebook() {
  const ref = useRef();

  useEffect(() => {
    (new Runtime).module(notebook, name => {
      if (name === "viewof cc") return Inspector.into(ref.current.querySelector(".viewof-cc"))();
      if (name === "share") return Inspector.into(ref.current.querySelector(".share"))();

    });
  }, []);

  return (
    <div ref={ref}>
     <Col>
          Fish observed at <b>Quadra Island</b>
          <div className="Notebook">
          <div className="viewof-sites"></div>    
          </div>
        </Col>
      {/* <div className="Notebook">
      <div className="share"></div>
        <div className="viewof-cc"></div>
      </div> */}
    </div>
  );
}

export default Notebook;