import React, {useRef, useEffect} from "react";
import {Runtime, Inspector, Library} from "@observablehq/runtime";
import notebook from "73c68590a6b8ba4c";

function Notebook() {
  const ref = useRef();

 
  
  useEffect(() => {
    const main = (new Runtime).module(notebook, name => {
      
      if (name === "viewof sites") return Inspector.into(ref.current.querySelector(".viewof-sites"))();
    });
    

    // main.redefine("width", "480");
  }, []);

  return (
    <div ref={ref}>
      <div className="Notebook">
        <div className="viewof-sites"></div>
      </div>
    </div>
  );
}

export default Notebook;