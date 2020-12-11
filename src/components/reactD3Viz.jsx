import React, {useRef, useEffect} from "react";
import ReactDOM from 'react-dom'
import {Container, Col, Row, Image, Button} from 'react-bootstrap'
import TitleImage from '../assets/title.png'
// import PlaceMap from '../assets/placeMap.png'
import Timeseries from'../assets/timeseries.png'
import SpeciesMap from '../assets/speciesMap.png'
import Salmon from '../assets/salmon1.jpg'
import Sculpin from '../assets/sculpin1.jpg'
import Flatfish from '../assets/flatfish1.jpg'
import ForageFish from '../assets/forage1.jpg'
import OtherFish from '../assets/other1.jpg'
import RockFish from '../assets/rockfish1.jpg'
import Sharks from '../assets/sharks1.jpg'
import All from '../assets/all1.jpg'
import SelectAndPlay from '../assets/selectAndPlay.png'
import SingleTimeSeries from '../assets/timeseriesSingle.png'
import './style.css'
// import SampleSiteMap from './observableViz'
// import SampleChart from './observableChart'
import {Runtime, Inspector} from "@observablehq/runtime";
import notebook from "73c68590a6b8ba4c";

// import Chart from '../components/chart.jsx' // Uncomment if you wish to bring D3 into the template, and the <Chart><Chart/> component line in the render function.

function Notebook() {
  const ref = useRef();

  useEffect(() => {
    (new Runtime).module(notebook, name => {
      if (name === "viewof cc") return Inspector.into(ref.current.querySelector(".viewof-cc"))();
      if (name === "share") return Inspector.into(ref.current.querySelector(".share"))();
      if (name === "viewof sites") return Inspector.into(ref.current.querySelector(".viewof-sites"))();
      if (name === "viewof rects") return Inspector.into(ref.current.querySelector(".viewof-rects"))();
      if (name === "style") return Inspector.into(ref.current.querySelector(".style"))();


    });
  }, []);

  return (

    
    <div ref={ref}>
    
     <Container>
      <Row>
        <Col>
          <Image 
            className='title-image'
            src={TitleImage}
          />
        </Col>
      </Row>
      <Row>
        <span className='figure-text'>
          Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. 
        </span>
      </Row>
      <Row className='text-center lead'>
        <span className='introductory-text'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. 
          Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. 
        </span>
      </Row>
      <Row>
        <h1 className='section-header-question'>
          What fish are found where, and when?
        </h1>
      </Row>
      <Row>
        <Col>
          Fish observed at <b>Quadra Island</b>
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
          {/* </Row> */}
          {/* <Row className='text-center'>
            <Col className='selected-fish-header'>
              <h1>RockFish</h1>
            </Col>
          </Row>
          <Row>
            <Col>
            <Image 
              className='select-and-play-image'
              src={SelectAndPlay}
            />
            </Col>
          </Row> */}
        </Col>
      </Row>
      <Row>
      <div className="Notebook">
      <div className="share"></div>
      <div className="viewof-cc"></div>
      </div>
      </Row>
      <Row>
        <h1 className='section-header-question'>
        What is the geographic range of certain fish?
        </h1>
      </Row>
      <Row>
        <Col>
          Fish observed at <b>Quadra Island</b>
          <Image // TODO replace with Map
            className='species-map'
            src={SpeciesMap}
          />
        </Col>
        <Col>
          <Row className='fish-button-row'>
            <Col>
              <div className='image-button center-text' onClick={() => console.log('rockfish')}>
                <Image className='button-image' src={RockFish}/>
                <div className='button-text'>
                  RockFish
                </div>
              </div>
              {/* <Button block>Salmon</Button> */}
              <div className='image-button center-text' onClick={() => console.log('Salmon')}>
                <Image className='button-image' src={Salmon}/>
                <div className='button-text'>
                  Salmon
                </div>
              </div>
            </Col>
            <Col>
            <div className='image-button center-text' onClick={() => console.log('Flatfish')}>
                <Image className='button-image' src={Flatfish}/>
                <div className='button-text'>
                  FlatFish
                </div>
              </div>
              <div className='image-button center-text' onClick={() => console.log('Sharks')}>
                <Image className='button-image' src={Sharks}/>
                <div className='button-text'>
                  Sharks
                </div>
              </div>
            </Col>
            <Col>
            <div className='image-button center-text' onClick={() => console.log('Forage Fish')}>
                <Image className='button-image' src={ForageFish}/>
                <div className='button-text'>
                  Forage Fish
                </div>
              </div>
              <div className='image-button center-text' onClick={() => console.log('Other')}>
                <Image className='button-image' src={OtherFish}/>
                <div className='button-text'>
                  Other
                </div>
              </div>
            </Col>
          </Row>
          <Row className='text-center'>
            <Col className='selected-fish-header'>
              <h1>RockFish</h1>
            </Col>
          </Row>
          <Row>
            <Col>
            <Image 
              className='select-and-play-image'
              src={SelectAndPlay}
            />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Image // TODO replace with Observable charts. These will need to use state defined in the react app controlled by the category buttons'
          className='timeseries single'
          src={SingleTimeSeries}
        />
      </Row>
      {/* <Chart></Chart> */}
    </Container>
      
      
    </div>
  );
}

export default Notebook;

// export default function ReactD3Viz () {
//   return (
//     // Where we bring together imported components such as a the <ReactD3Chart/>, <Legend/>, <Controls/>
   
//   )
// }

// This is where react reaches into the DOM, finds the <div id="chart"> element, and replaces it with the content of ReactD3Viz's render function JSX.
const domContainer = document.querySelector('#reactchart')
ReactDOM.render(<Notebook />, domContainer)
