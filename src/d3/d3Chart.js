// Turn this into a new visualization by doing the following:
// STEP 1 (This will create a static graph that doesn't change with selections):
/* Create a constructor that:
 - Adds the initial svg.
 - Adds scales, axes, ticks etc into the svg to create the underlying chart.
 - Imports the data using an async promise.
    - Stores the full dataset in a variable: const rawData.
    - Cleans the data to remove garbage elements/values: const cleanedData.
    - Filters the data based on the current UI selections: const filteredData.
 - Adds the background monthly_max_range, monthly_average_range, average, current_year.
 - Adds event listeners to the elements.
*/

// STEP 2 (This will add the necessary animation logic to the chart to respond to updates):
/* Update function that:
 - Takes the UI selections as parameters.
 - Filters the data based on the current UI selections: const filteredData.
 - Updates the scales/axes and other elements as necessary.
 - Creates and applies transitions to the UI elements to animate the data.
*/
/*
Rules to live by when structuing D3 code: (credit: https://elliotbentley.com/2017/08/09/a-better-way-to-structure-d3-code-es6-version.html)
A few things worth emphasising here:

- Each instance method fulfils a specific purpose. Only some of them are ‘public’ and are meant to be called externally.1
- Some public methods (in this case, setColor) don’t require redrawing the entire chart. Others, like setData, do.
- Only variables used in other instance methods are added to this.
- draw needs to be able to work both on initial load and on updates.
- If you wanted to have method instances which trigged animations (for example, transitioning axes), you would need to make draw more complex and not simple wipe the element clean each time.
- Function height less than screen.
*/
import * as d3 from 'd3'
import 'd3-selection-multi'

export class D3Chart {
  constructor () { // add parameters here to initialize the chart with state from react.
    this.loadData('PATH TO DATA').then((loadedData) => {
      this.loadedData = loadedData // save the data
      // Process the data
      // this.allCleanData = this.cleanData()
      // this.thisYearsData = this.filterAndSortDataByYear()
      // this.historicalData = this.generateHistoricalData()
      this.drawChart()
    })
  }

  // Asynchronosly fetch data from a datasource asset or URL.
  async loadData (assetPathOrURL) {
  }

  // Remove garbage data points from the loaded data.
  cleanData () {
  }

  // Select the datapoints for the selected year, add a new date property, and sort the data temporally.
  filterAndSortDataByYear () {
  }

  // Generate data used to setup the historical visual elements of the chart.
  generateHistoricalData () {
  }

  // Performs the initial draw of the chart.
  // Explicitly outlines how the chart is constructed.
  drawChart () {
    this.chartHeight = 340 // Chart height
    this.chartWidth = 900 // Chart width

    this.chartMargin = { // Chart margins
      top: 30,
      right: 30,
      bottom: 30,
      left: 30
    }

    // Grab the chart div and add the viewBox to the page.
    this.chartSVG = d3 
      .select('#d3chart')
      .append('svg')
      .attr('viewBox', `0 -20 ${this.chartWidth} ${this.chartHeight}`)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .append('text')
      .text('D3 Content Here')

    this.createScales()
    this.createAxes()
    this.createGrids()
    this.addAxes()
    this.addGridLines()
    this.addDataVisuals()
    this.addHighlighTooltip()
    this.addHighlightListeners()
    this.addLegend()
  }

  // Creates the various scales that all d3 charts need in order to visually place elements.
  createScales () {
  }

  // Creates the axes for the charts.
  createAxes () {
  }

  // Generates the grids to be added to the chart.
  createGrids () {
  }

  // Adds the chart axes.
  addAxes () {
  }

  // Adds the chart gridlines, if they are desired.
  addGridLines () {
  }

  // Function which calls all functions which add visualized data elements to the chart.
  addDataVisuals () {
  }

  // Adds a highlight tooltip for when the mouse is over data.
  addHighlighTooltip () {
  }

  // Attaches event listeners using D3.on function.
  addHighlightListeners () {
  }

  // Adds the legend elements to the chart.
  addLegend () {
    
  }

  // Updates the highlight on mouse movements.
  highlightUpdate (date) {
  }

  // Sets the opacity of the hover indicators.
  // d3.select('.legendBox').attr('opacity', opacity)
  setHoverIndicatorOpacity (opacity) {
  }

  // Up until this function call, we have a static chart without animations.
  // This function updates the data objects, yScale, and usese d3.transitions.
  updateChart () {
    
  }
}
