import define1 from "./6e9136605e7676b5@248.js";
import define2 from "./a918fce3c1f416e8@4052.js";
import define3 from "./7d475d2f636fd7d5@332.js";
import define4 from "./94ec544c25860285@1695.js";
import define5 from "./450051d7f1174df8@252.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["GOPR4083.00.jpg",require("./files/89e1fcae006ae5fcc0836c70ab932636ee855f19753a6386751baab5d4eac2233b65bc743e18fd2800674ca426f4f147d9d637615c894dc6460abbdc4b778761").default],["Striped seaperch - P1004667.00_05_34_23.Still009.jpg",require("./files/fddaf991b910154eb05bd9d947c3da2af25390539c549b992fba3c33bf2605aec5304924e215731b9db65786823349e315a68f28898f31e83081aa2cfb8d600e").default],["P1022092.00_00_42_45.Still010 (1).jpg",require("./files/d76cc15e29c01ac40ab123054d4f0acf3a6f059011dc456bf0adc00cfe52f90cbd38dab06910cd0412596bc9f7fe7a41ec9a2e672f91a55b6909b485c09cc3f1").default],["P1344582.00_12_11_12.Still088-14.jpg",require("./files/fc39470fa43361cd1769ee4cdf8281e2edb35aab9295b7f9094574949cb314f266a7e7895652fed7a17f0a3030be77607a5cb86e4679bc195bb1f130107f1eb2").default],["tavishcampbell.ca-1459 copy.jpg",require("./files/67e531c008b9c0395735ba4616eadba429fe94c5072314c94db7521205e4a740e1aa6fe8f436fcabf21d38921dd2ebb1392b05afa030a27d691cd48c6257af38").default],["P1266011.00_01_36_46.Still001 (1).jpg",require("./files/0ff7ee1bce2662dd964b6b0f07469d4b99e429fcc824f6718d5bc67c8b69bca772c5cb188e7262b8ff83b8a0341cd91569fa2227f40b97db4843d5284e80386c").default],["Quillback rockfish - P1004685.00_05_23_13.Still009 (1).jpg",require("./files/a0f243c4214599fa6a2f97c063eeaaff42e61c3d7b73bc27bb9a1b4091418703fac55c008319336f86860dadb15046ffd91c0cf2f1fd2d45d258f4a7ca727f7d").default],["P1004685.00_00_01_09.Still034_T (1).jpg",require("./files/873bf1102c4b053ce58d147d2e8dc64306eebf615aeef56d5d9ffc5d8a2e56a5d18f2f2b6afedd41a9ebcdcfd0f2243426bbfe1e7259e0d37860d61983ed498c").default]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Location based view

`
)});
  main.variable(observer()).define(["md","selectedSite"], function(md,selectedSite){return(
md`
Fish observed at **${selectedSite}**

`
)});
  main.variable(observer("viewof sites")).define("viewof sites", ["d3","height","topojson","BC_Midres","states","bcSiteLocs","selectedSite","tooltip","mutable selectedSite"], function(d3,height,topojson,BC_Midres,states,bcSiteLocs,selectedSite,tooltip,$0)
{
  const width = 500;
  // const height = 300;
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
  // .call(zoom);

  const g = svg.append("g").attr("id", "map-layers");

  // BC Alberts projection
  // const projection = d3.geoAlbers().rotate([126, 0]);
  // projection.fitSize(
  //   [width, height],
  //   topojson.feature(BC_Midres, BC_Midres.objects.BC_Midres_latlng)
  // );

  // svg.call(tip);

  // we want a custom projection to zoom in a bit
  const projection = d3
    .geoAlbers()
    .rotate([126, 0])
    .center([0, 50.5])
    .parallels([50, 58.5])
    .scale(5400)
    .translate([960 / 4, 600 / 2]);

  let current_circle = undefined;

  // generate the shapes we want - this case bc
  const path = d3.geoPath().projection(projection);

  // create the svg of our features
  g.append("svg")
    .selectAll("path")
    .data(
      topojson.feature(BC_Midres, BC_Midres.objects.BC_Midres_latlng).features
    )
    .join("path")
    .attr("d", path)
    .attr("fill", "#ddd")
    .attr("id", "map-layers");

  g.append("g")
    .selectAll("path")
    .data(states.features)
    .join("path")
    // .attr("stroke", "#f3f3f3")
    .attr("fill", d => {
      // console.log(d);
      return "#ddd";
    })
    .attr("opacity", 0.4)
    .attr("d", path);

  // Add stations!
  g.insert("g")
    .selectAll("circle")
    .data(bcSiteLocs)
    .join("circle")
    .attr("r", 8)
    .attr("transform", function(d) {
      console.log(d.long, d.lat);
      // Project our stations to the same projeciton as our map!
      return `translate(${projection([d.long, d.lat])})`;
    })
    .attr("opacity", 0.8)
    .attr("fill", function(d) {
      return d.site === selectedSite ? "#ec4977" : "#0cb4f5";
    })
    .attr("id", d => d.site)
    .on("mouseover", function(event, d) {
      // console.log(d.Location);
      d3.select(this).attr("stroke", "#000");
      d3.select(this).attr("r", 10);
      // d3.select(this).attr("stroke", "#000");
      tooltip
        .html(`<div>${d.site}</div><div>${d.Location}</div>`)
        .style('visibility', 'visible');

      // tip.show(d, this);
    })
    .on('mousemove', function(event) {
      tooltip
        .style('top', event.pageY - 10 + 'px')
        .style('left', event.pageX + 10 + 'px');
    })
    .on("mouseout", function(event) {
      d3.select(this).attr("stroke", null);
      d3.select(this).attr("r", 8);
      tooltip.html(``).style('visibility', 'hidden');
      // tip.hide();
    })
    .on("click", function(event, d) {
      $0.value = d.site;
      // console.log(d);
      // if (current_circle !== undefined) {
      //   current_circle.attr("fill", d => "#0cb4f5");
      //   d3.select(this).attr("r", 8);
      // }
      // // console.log(this);
      // current_circle = d3.select(this);
      // d3.select(this).attr("fill", "#ec4977");
      // d3.select(this).attr("r", 8);
      // const node = svg.node();
      // node.value = value = value === d.ARMS_number ? null : d.ARMS_number;
      // node.value = d.site;
      // console.log(node);
      // node.dispatchEvent(new CustomEvent("input"));
      // outline.attr("d", value ? path(d) : null);
    });
  // console.log(current_circle);

  // function start() {
  //   console.log('here');
  //   d3.select('#Victoria').dispatch('click');
  // }
  // start();
  // return Object.assign(svg.node(), { value: "Victoria" });
  // d3.select('#Victoria').dispatch('click');
  return svg.node();
}
);
  main.variable(observer("sites")).define("sites", ["Generators", "viewof sites"], (G, _) => G.input(_));
  main.variable(observer("viewof cc")).define("viewof cc", ["barz"], function(barz){return(
barz()
)});
  main.variable(observer("cc")).define("cc", ["Generators", "viewof cc"], (G, _) => G.input(_));
  main.variable(observer("share")).define("share", ["chart2","uniqClass"], function(chart2,uniqClass){return(
chart2([uniqClass[1]])
)});
  main.variable(observer("viewof rects")).define("viewof rects", ["d3","gridding","list","grid"], function(d3,gridding,list,grid)
{
  const area = d3.create('div').attr('class', 'area');

  const t = area.transition().duration(250);

  const g = area
    .selectAll("div")
    .data(gridding(list), g => g.id)
    .join('div')
    .attr("class", "container");

  const image = g
    .append('img')
    .attr("class", "im")
    .attr("id", (d, i) => "im-O-" + (i + 1));

  let selected = [];
  image
    .on("click", function(event, d) {
      !selected.includes("#im-" + d.id.id)
        ? selected.push("#im-" + d.id.id)
        : selected;
      d3.selectAll(".im")
        .classed("hovered", false)
        .classed("fade", true);

      d3.selectAll(selected.toString())
        .classed("hovered", true)
        .classed("fade", false);

      const node = area.node();
      node.value = d.id.id;
      node.dispatchEvent(new CustomEvent("input"));
    })
    .on("dblclick", function(event, d) {
      selected = [];
      d3.selectAll(".im")
        .classed("fade", false)
        .classed("hovered", false);
    })
    .transition(t)
    .attr('width', d => d.width - 20)
    .attr('height', d => d.height - 30)
    .attr('src', d => d.img)
    .attr('style', d => `transform: translate(${d.x}px, ${d.y}px)`);

  // let texts = g
  //   .append("span")
  //   // .data(grid)
  //   // .join("span")
  //   .attr('style', d => `transform: translate(${d.x}px, ${d.y}px)`)
  //   .text((d, i) => grid[i].species);
  // g.append("text")
  //   .text((d, i) => text[i].species)
  //   .attr(
  //     'style',
  //     (d, i) => `transform: translate(${grid[i].x}px, ${grid[i].y}px)`
  //   );

  // .style("border", "5px solid #555");
  // .attr("z-index", -1);

  const overlay = g
    .append("div")
    .attr("class", "middle")
    // .attr('width', d => {
    //   console.log(d);
    //   return d.width;
    // })
    // .attr('height', d => d.height)
    .attr(
      'style',
      d =>
        `transform: translate(${d.x + d.width / 2 - 113 / 2}px, ${d.y +
          d.height -
          45}px)`
    )

    .data(grid)
    .join()
    .append("div")
    .attr("class", "text")
    .text(function(d) {
      return d.species;
    });

  // overlay.on("mouseover", function(event, d) {
  //   console.log(d);
  //   // return (event.currentTarget.style.borderColor = "red");
  // });

  return Object.assign(area.node(), { value: null });
}
);
  main.variable(observer("rects")).define("rects", ["Generators", "viewof rects"], (G, _) => G.input(_));
  main.variable(observer("style")).define("style", ["html","width","img_height"], function(html,width,img_height){return(
html`
<style>


select {
  padding: 2px 5px;
  font-size: 16px;
  max-height: 100px;
  min-width: 300px;
}

label {
  display: inline-block;
  min-width: 300px;
}
  
  .area {
    width: ${width}px;
    height: ${img_height}px;
  }

  .area img {
   position : absolute;
object-fit: cover;

}

.hovered {  background-color: #e6e6e6; filter:  brightness(100%) saturate(100%); border: 2px solid red;}
.fade {filter: saturate(55%) brightness(60%) opacity(70%)}



.container:hover .image {
  opacity: 0.4;
}



.im {
  opacity: 1;

}


.middle {
  transition: .5s ease;
  opacity: .9;
  position: absolute;
pointer-events: none;
  text-align: center;
  z-index: 10;
}


.text {
  font-size: 16px;
  padding: 16px 32px;
 position: relative;
display:block;
font-weight:600; 
  text-align: center;
  color: black;
}
</style>
`
)});
  main.variable(observer("grid")).define("grid", ["gridding","list"], function(gridding,list){return(
gridding(list)
)});
  main.variable(observer("list")).define("list", ["images","DOM","text"], function(images,DOM,text)
{
  return Array.from({ length: images.length }, (d, i) => ({
    img: images[i % images.length].src,
    id: DOM.uid(),
    species: text[i].species
  }));
}
);
  main.variable(observer("text")).define("text", function(){return(
[
  { species: "Rockfish" },
  { species: "Flatfish" },
  { species: "Forage" },
  { species: "Sharks" },
  { species: "Sculpin" },
  { species: "Salmon" },
  { species: "Other" },
  { species: "All" }
]
)});
  main.variable(observer("gridding")).define("gridding", ["d3","width","img_height"], function(d3,width,img_height){return(
d3
  .gridding()
  .mode('grid')
  .size([width, img_height])
  .offset([0, 0])
)});
  main.variable(observer("img_height")).define("img_height", function(){return(
600
)});
  main.variable(observer("images")).define("images", ["preload","FileAttachment"], async function(preload,FileAttachment){return(
[
  ...(await preload([
    await FileAttachment(
      "Quillback rockfish - P1004685.00_05_23_13.Still009 (1).jpg"
    ).url(),
    await FileAttachment("P1344582.00_12_11_12.Still088-14.jpg").url(),
    await FileAttachment("GOPR4083.00.jpg").url(),
    await FileAttachment("P1266011.00_01_36_46.Still001 (1).jpg").url(),
    await FileAttachment("P1004685.00_00_01_09.Still034_T (1).jpg").url(),
    await FileAttachment("tavishcampbell.ca-1459 copy.jpg").url(),
    await FileAttachment("P1022092.00_00_42_45.Still010 (1).jpg").url(),
    await FileAttachment(
      "Striped seaperch - P1004667.00_05_34_23.Still009.jpg"
    ).url()
  ])).values()
]
)});
  main.variable(observer("tooltip")).define("tooltip", ["d3"], function(d3){return(
d3
  .select('body')
  .append('div')
  .attr('class', 'd3-tooltip')
  .style('position', 'absolute')
  .style('z-index', '10')
  .style('visibility', 'hidden')
  .style('padding', '10px')
  .style('background', 'rgba(0,0,0,0.6)')
  .style('border-radius', '4px')
  .style('color', '#fff')
  .text('a simple tooltip')
)});
  main.define("initial selectedSite", function(){return(
"Victoria"
)});
  main.variable(observer("mutable selectedSite")).define("mutable selectedSite", ["Mutable", "initial selectedSite"], (M, _) => new M(_));
  main.variable(observer("selectedSite")).define("selectedSite", ["mutable selectedSite"], _ => _.generator);
  const child1 = runtime.module(define1);
  main.import("preload", child1);
  main.variable(observer()).define(["sites"], function(sites){return(
sites
)});
  main.variable(observer("interval")).define("interval", ["d3"], function(d3){return(
d3.timeMonth.every(1)
)});
  main.define("initial debug", function(){return(
0
)});
  main.variable(observer("mutable debug")).define("mutable debug", ["Mutable", "initial debug"], (M, _) => new M(_));
  main.variable(observer("debug")).define("debug", ["mutable debug"], _ => _.generator);
  main.variable(observer()).define(["width"], function(width){return(
width
)});
  main.variable(observer("chart2")).define("chart2", ["heatData","mutable debug","d3","DOM"], function(heatData,$0,d3,DOM){return(
function(types) {
  // console.clear();
  const n = types.length;
  const width = 960;
  // const height = 500;

  // All speceis in types ploted
  const Allspecies = [
    ...new Set(
      heatData.filter(d => types.includes(d.class)).map(d => d.species)
    )
  ];
  $0.value = Allspecies;
  // console.log(Allspecies.length * 20);
  const height = Allspecies.length * 20;
  // console.log("height", height);

  //Calculate margins to use

  const to_chart_species = [
    ...new Set(heatData.filter(d => d.class === types[0]).map(d => d.species))
  ];

  // this will be the bottom of the top chart (based on proportion of species)
  // const bh_top_chart = (height * to_chart_species.length) / Allspecies.length;
  // console.log("bh_top_chart", bh_top_chart);

  const margin1 = { top: 20, right: 40, bottom: 40, left: 140 }; //adjust bottom
  const chart_width = width - margin1.left - margin1.right;
  // const chart_height = height - margin1.top - margin1.bottom;

  let margin_others;

  // const zoom = d3
  //   .zoom()
  //   .scaleExtent([1, Infinity])
  //   .translateExtent([[0, 0], [chart_width, chart_bounds]])
  //   .extent([[0, 0], [chart_width, chart_bounds]]);

  const svg = d3.select(DOM.svg(width, height));

  const today = new Date();
  const startExt = new Date();
  const endExt = new Date();

  startExt.setDate(today.getDate() - 1);
  endExt.setDate(today.getDate() + 1);

  // HERE I CREATE A CHART (FOCUS) FOR EACH VARIABLE.
  let myVariables = {};
  let myLines = {};
  let myYs = {};
  let myXs = {};
  let y;

  // let focus0;
  const x = d3
    .scaleTime()
    .range([0, chart_width])
    .domain([
      d3.min(heatData, d => d.monthly),
      d3.timeMonth.ceil(+d3.max(heatData, d => d.monthly) + 1)
    ]);

  const xAxis = d3.axisBottom(x);
  const top_margins = [];

  types.forEach((vari, i) => {
    let yside = "y" + i;

    const species = [
      ...new Set(heatData.filter(d => d.class === vari).map(d => d.species))
    ];

    let h_each_plot = (height * species.length) / Allspecies.length;
    top_margins.push(h_each_plot);

    let chart_bounds =
      (height * species.length) / Allspecies.length -
      margin1.top -
      margin1.bottom;
    // console.log(chart_bounds);

    y = d3
      .scaleBand()
      .domain(species)
      .range([chart_bounds, 0])
      .padding(.2);

    const yAxis = g =>
      g.call(d3.axisLeft(y)).call(g => g.select(".domain").remove());

    const mar_top =
      i === 0
        ? 0
        : i === 1
        ? top_margins[0]
        : d3.sum(top_margins.slice(0, [i]));

    margin_others = {
      top: mar_top,
      right: 20,
      left: 140
    }; //adjust top

    let variableName = "focus" + i;

    myVariables[variableName] = svg
      .append("g")
      .attr("class", "focus" + i)
      .attr(
        "transform",
        `translate(${margin_others.left},${margin_others.top})`
      );

    myVariables[variableName]
      .selectAll('rect')
      .data(heatData.filter(d => d.class === vari))
      .enter()
      .append('rect')
      .attr("class", "line" + i)
      .attr('x', d => x(d.monthly))
      .attr('y', d => {
        return y(d.species);
      })
      .attr(
        'width',
        d => x(d3.timeMonth.ceil(+d.monthly + 1)) - x(d.monthly) - 4
      )
      .attr('height', y.bandwidth())
      .attr('fill', d => {
        return d.value > 0 ? "#ec4977" : "#ddd";
      })
      // .attr("fill", "none")
      .attr("clip-path", "url(#clip)");
    // .style("stroke", "steelblue")
    // .style("stroke-width", "1.5px");

    myVariables[variableName]
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + chart_bounds + ")")
      .call(xAxis);

    myVariables[variableName]
      .append("g")
      .attr("class", "axis axis--y")
      .call(yAxis);
  });

  return svg.node();
}
)});
  main.variable(observer("barz")).define("barz", ["d3","width","fakeData","maxSpeciesPerMonth","monthlySpeciesCount","_","interval"], function(d3,width,fakeData,maxSpeciesPerMonth,monthlySpeciesCount,_,interval){return(
function barz() {
  const height = 80;
  // const width = 800;

  const margin = { left: 225, right: 250, top: 0, bottom: 20 };
  const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
  const brushHandle = (g, selection) =>
    g
      .selectAll(".handle--custom")
      .data([{ type: "w" }, { type: "e" }])
      .join(enter =>
        enter
          .append("path")
          .attr("class", "handle--custom")
          .attr("fill", "#666")
          .attr("fill-opacity", 0.8)
          .attr("stroke", "#000")
          .attr("stroke-width", 1.5)
          .attr("cursor", "ew-resize")
          .attr("d", arc)
      )
      .attr("display", selection === null ? "none" : null)
      .attr(
        "transform",
        selection === null
          ? null
          : (d, i) =>
              `translate(${selection[i]},${(height +
                margin.top -
                margin.bottom) /
                2})`
      );

  const arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius((height - margin.top - margin.bottom) / 2)
    .startAngle(0)
    .endAngle((d, i) => (i ? Math.PI : -Math.PI));

  let minX = 0,
    maxX = 0;

  const brush = d3
    .brushX()
    .extent([
      [margin.left, margin.top],
      [width - margin.right, height - margin.bottom]
    ])
    .on("brush end", brushed);

  const x = d3
    .scaleTime()
    .range([margin.left, width - margin.right])
    .domain([
      d3.min(fakeData, d => d.monthly),
      d3.timeMonth.ceil(+d3.max(fakeData, d => d.monthly) + 1)
    ]);

  const xAxis = g =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

  const y = d3
    .scaleLinear()
    .domain([0, maxSpeciesPerMonth])
    .range([height - margin.bottom, margin.top]);

  const yAxis = g =>
    g.call(d3.axisLeft(y)).call(g => g.select(".domain").remove());

  svg.append('g').call(xAxis);

  svg.append('g').call(yAxis);

  svg
    .selectAll('rect')
    // .data(fakeData)
    .data(monthlySpeciesCount)
    // .data(fakeData)
    .enter()
    .append('rect')
    .attr('x', d => x(d.monthly))
    .attr('y', d => {
      return y(d.value);
    })
    .attr('width', d => x(d3.timeMonth.ceil(+d.monthly + 1)) - x(d.monthly) - 1)
    .attr('height', d => y(0) - y(d.value))
    .attr('fill', d => "#ec4977");

  let returnValue = Object.assign(svg.node(), {
    value: {
      range: [minX, maxX]
    }
  });

  // add 1 month to make sure we include the latest month in initial brush
  const end_date = _.clone(
    monthlySpeciesCount[monthlySpeciesCount.length - 1].monthly
  );
  console.log(end_date);

  svg
    .append("g")
    .call(brush)
    .call(
      brush.move,
      [
        monthlySpeciesCount[0].monthly,
        new Date(end_date.setMonth(end_date.getMonth() + 1))
      ].map(x)
    );

  function brushed(event) {
    const selection = event.selection;
    const node = svg.node();
    if (selection === null) {
    } else {
      const d0 = selection.map(x.invert);
      const d1 = d0.map(interval.round);

      // If empty when rounded, use floor instead.
      if (d1[0] >= d1[1]) {
        d1[0] = interval.floor(d0[0]);
        d1[1] = interval.offset(d1[0]);
      }

      node.val = d0;
      output({
        range: [d0[0], d0[1]]
      });
    }
    d3.select(this).call(brushHandle, selection);
  }

  function output(value) {
    const node = svg.node();
    node.value = value;

    node.dispatchEvent(new CustomEvent('input'));
  }

  return returnValue;
}
)});
  main.variable(observer()).define(["monthlySpeciesCount"], function(monthlySpeciesCount){return(
monthlySpeciesCount[monthlySpeciesCount.length - 1]
)});
  main.variable(observer()).define(["monthlySpeciesCount"], function(monthlySpeciesCount){return(
monthlySpeciesCount
)});
  main.variable(observer("maxSpeciesPerMonth")).define("maxSpeciesPerMonth", ["d3","speciesCountbyMonth"], function(d3,speciesCountbyMonth){return(
d3.max(
  Array.from(speciesCountbyMonth, ([key, values]) => {
    return values;
  })
)
)});
  main.variable(observer("monthlySpeciesCount")).define("monthlySpeciesCount", ["speciesCountbyMonth"], function(speciesCountbyMonth){return(
Array.from(speciesCountbyMonth, ([key, values]) => {
  return {
    monthly: new Date(key),
    // datestr: key,
    value: values
  };
}).sort((a, b) => a.monthly - b.monthly)
)});
  main.variable(observer("speciesCountbyMonth")).define("speciesCountbyMonth", ["d3","fakeData"], function(d3,fakeData){return(
d3.rollup(
  fakeData,
  v =>
    d3.sum(v, d => {
      d.count;
      d.value > 0 ? (d.count = 1) : (d.count = 0);
      return d.count;
    }),
  d => +d.monthly
)
)});
  main.variable(observer("heatData")).define("heatData", ["fakeData","d3","cc"], function(fakeData,d3,cc){return(
fakeData.filter(d => {
  return (
    d.monthly >= d3.timeMonth(cc.range[0]) &&
    d.monthly <= d3.timeMonth(cc.range[1])
  );
})
)});
  main.variable(observer("fakeData")).define("fakeData", ["_","chartData","d3"], function(_,chartData,d3)
{
  let out = _.cloneDeep(chartData);
  let a = _.cloneDeep(chartData);
  a.forEach(d => {
    Number(d.monthly) === Number(d3.timeMonth.ceil(new Date("2019-07-01")))
      ? (d.monthly = d3.timeMonth.ceil(new Date("2019-01-01")))
      : d.monthly,
      Number(d.monthly) === Number(d3.timeMonth.ceil(new Date("2019-08-01")))
        ? (d.monthly = d3.timeMonth.ceil(new Date("2019-04-01")))
        : d.monthly,
      d.mmyy === "07/2019"
        ? (d.mmyy = "01/2019")
        : d.mmyy === "08/2019"
        ? (d.mmyy = "03/2019")
        : (d.mmyy = "04/2019");
    d.mm === "07"
      ? (d.mm = "01")
      : d.mm === "08"
      ? (d.mm = "03")
      : (d.mm = "04");
    out.push(d);
  });

  return out.sort((a, b) => Number(a.mm) - Number(b.mm));
}
);
  main.variable(observer("chartData")).define("chartData", ["flatData","selectedSite"], function(flatData,selectedSite){return(
flatData.filter(d => d.site === selectedSite)
)});
  main.variable(observer()).define(["date"], function(date){return(
date
)});
  main.variable(observer()).define(["date"], function(date){return(
new Date(date)
)});
  main.variable(observer("dateFilter")).define("dateFilter", ["date"], function(date){return(
new Date(date).toLocaleString("en", {
  month: "numeric",
  year: 'numeric'
})
)});
  main.variable(observer()).define(["sites"], function(sites){return(
sites
)});
  main.variable(observer()).define(["flatData"], function(flatData){return(
flatData
)});
  main.variable(observer()).define(["flatData","sites"], function(flatData,sites){return(
flatData.filter(d => d.site === sites)
)});
  main.variable(observer("zoom")).define("zoom", ["d3","width","height"], function(d3,width,height){return(
function zoom(s) {
  s.call(
    d3
      .zoom()
      .on("zoom", event =>
        s.select("#map-layers").attr("transform", event.transform)
      )
      .scaleExtent([1, 18])
      .translateExtent([[0, 0], [width, height]])
  );
}
)});
  main.variable(observer("height")).define("height", function(){return(
500
)});
  main.variable(observer("uniqDates")).define("uniqDates", ["flatData"], function(flatData){return(
[...new Set(flatData.map(d => +d.date))].sort((a, b) => a - b)
)});
  main.variable(observer("uniqMonths")).define("uniqMonths", ["flatData"], function(flatData){return(
[
  ...new Set(
    flatData.map(d =>
      d.date.toLocaleString("en", {
        month: "2-digit",
        year: 'numeric'
      })
    )
  )
].sort((a, b) => a - b)
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6", 'd3-gridding@0.1')
)});
  main.variable(observer("_")).define("_", ["require"], function(require){return(
require("lodash")
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  const child2 = runtime.module(define2);
  main.import("bcSiteLocs", child2);
  main.import("flatData", child2);
  main.import("uniqClass", child2);
  main.variable(observer("states")).define("states", ["topojson","us"], function(topojson,us){return(
topojson.feature(us, us.objects.states)
)});
  const child3 = runtime.module(define3);
  main.import("states", "us", child3);
  const child4 = runtime.module(define4);
  main.import("BC_Midres", child4);
  const child5 = runtime.module(define5);
  main.import("Scrubber", child5);
  return main;
}
