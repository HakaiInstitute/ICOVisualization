import React from 'react'
import { D3Chart } from '../d3/d3Chart'
// import propTypes from 'prop-types'

// The React side of the D3 chart.
// Handles the UI selection state changes for the D3 chart.
// Prevents react updates to the element so that transitions can render.
export default class Chart extends React.Component {
  constructor (props) {
    super(props)
    this.state = { // Constructor of the D3Chart. We can replace this with any chart class constructor.
      chart: new D3Chart(),
    }
  }

  shouldComponentUpdate (nextProps) {
    const { } = this.props
    // Comparing the next set of props that the component will receive with the previous set.
    // If they are not different, do not update. 
    // if (
    //   this.state.selectedDepth !== nextProps.selectedDepth ||
    //   this.state.selectedParameterName !== nextProps.selectedParameterName ||
    //   this.state.selectedYear !== nextProps.selectedYear
    // ) {
    //   this.setState({ selectedDepth, selectedParameterName, selectedYear }) // There are new UI selections, save these to the component state.
    //   this.state.chart.updateChart(selectedDepth, selectedParameterName, selectedYear) // Call the chart's update function with new parameters.
    // }
    // This enables using D3 transitions, otherwise React re-renders elements.
    return false // Always returning false from the React shouldComponentUpdate lifecycle function prevents re-rendering the element.
  }

  render () {
    return (
      <div>
        <div id='d3chart' /> {/* This is the html element which the Chart class grabs for the primary viz. */}
        <div id='legend' /> {/* This is the html element the Chart class hangs the legend on. */}
      </div>
    )
  }
}

// Checking that the properties that are passed to the constructor of the chart match this set of property names and data types.
// Chart.propTypes = {
//   selectedDepth: propTypes.number.isRequired,
//   selectedParameterName: propTypes.string.isRequired,
//   selectedYear: propTypes.number.isRequired
// }
