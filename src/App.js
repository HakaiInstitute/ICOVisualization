import React, {useRef, useEffect} from "react";
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "73c68590a6b8ba4c";

function Notebook() {
  const ref = useRef();

  useEffect(() => {
    (new Runtime).module(notebook, name => {
      if (name === "viewof sites") return Inspector.into(ref.current.querySelector(".viewof-sites"))();
    });
  }, []);

  return (
    <div className="Notebook" ref={ref}>
      <div className="viewof-sites"></div>
      <p>Credit: <a href="https://observablehq.com/d/73c68590a6b8ba4c">Location based view by Mathew Brown</a></p>
    </div>
  );
}

export default Notebook;