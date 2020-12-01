import define1 from "./6f1ea973be87279c@364.js";
import define2 from "./562cfaafab41b0f5@248.js";
import define3 from "./e93997d5089d7165@2286.js";
import define4 from "./94ec544c25860285@1695.js";
import define5 from "./60ea978986bfd25e@1624.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["Filtered_ASV_table_FishOnly@1.csv",require("./files/104cca9de1c0d9bb9e049e5549721c6ee9a8ba0300bbb28c9f2adde1ec76818ecbef3465c3483b847e300cbba0e97d40ed7ac993a6a2b735e433cbb12e6c7914").default],["ICO-1_metadata.csv",require("./files/3197dd50857c78b86c99fd65e5a87d08f51f7ce3caee5abf57e4e40a80859c5050a40561c20947bbed97224026a6a8376efa0c73b990713e7288e252a4184a2a").default]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# eDNA data processing and prep for plotting`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
Unique site locations
`
)});
  main.variable(observer("bcSiteLocs")).define("bcSiteLocs", ["_","metadata"], function(_,metadata){return(
_.uniqBy(metadata, ({ lat, long }) => lat)
)});
  main.variable(observer("realRaw")).define("realRaw", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(
  await FileAttachment("Filtered_ASV_table_FishOnly@1.csv").text()
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
Metadata for all samples that have data as of August 2020
`
)});
  main.variable(observer("date")).define("date", ["metadata"], function(metadata){return(
new Date(metadata[0].year, metadata[0].month - 1, metadata[0].day)
)});
  main.variable(observer("metadata")).define("metadata", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("ICO-1_metadata.csv").text())
)});
  main.variable(observer()).define(["metadata"], function(metadata){return(
metadata.filter(d => d.site === "Ahous Bay")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Convert from wide to long format`
)});
  main.variable(observer("longData")).define("longData", ["realRaw"], function(realRaw)
{
  // helpful http://jonathansoma.com/tutorials/d3/wide-vs-long-data/
  let long_data = [];

  realRaw.forEach(row => {
    // Loop through all of the columns, and for each column
    // make a new row
    Object.keys(row).forEach(function(colname) {
      // Ignore 'State' and 'Value' columns
      if (colname == "#SampleID" || colname == "Taxonomy") {
        return;
      }
      let heir = row["Taxonomy"].split(";");
      long_data.push({
        ASV: row["#SampleID"],
        Value: Number(row[colname]),
        Sample: colname,
        kingdom: heir[0].replace(' ', ''),
        phylum: heir[1].replace(' ', ''),
        class: heir[2].replace(' ', ''),
        order: heir[3].replace(' ', ''),
        family: heir[4].replace(' ', ''),
        genus: heir[5].replace(' ', ''),
        species: heir[6]
          .replace(' ', '')
          .replace("s___", "")
          .replace("s__", ""),
        taxonomy: row["Taxonomy"]
      });
    });
  });
  return long_data;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`Join metadata to main dataset`
)});
  main.variable(observer("speciesTotals")).define("speciesTotals", ["d3","joinedData"], function(d3,joinedData)
{
  const out = [];
  d3.rollups(
    joinedData,
    v => d3.sum(v, d => d.Value),
    d => d.site,
    d => d.date.toString(),
    d => d.species
  ).forEach(d => {
    out.push({ site: d[0], data: d[1].flat() });
  });
  return out;
}
);
  main.variable(observer("sp")).define("sp", ["d3","joinedData"], function(d3,joinedData){return(
d3.rollups(
  joinedData,
  v => d3.sum(v, d => d.Value),
  d => d.site,
  d => d.date.toString(),
  d => d.species
)
)});
  main.variable(observer("flatData")).define("flatData", ["sp","d3","joinedData"], function(sp,d3,joinedData)
{
  const out = [];
  sp.forEach(d => {
    d[1].forEach(dd => {
      dd[1].forEach(s => {
        out.push({
          site: d[0],
          date: new Date(dd[0]),
          mmyy: new Date(dd[0]).toLocaleString("en", {
            month: "2-digit",
            year: 'numeric'
          }),
          monthly: d3.timeMonth(new Date(dd[0])),
          mm: new Date(dd[0]).toLocaleString("en", {
            month: "2-digit"
          }),
          species: s[0],
          class: joinedData.filter(d => d.species === s[0])[0].class,
          value: s[1]
        });
      });
    });
  });
  return out;
}
);
  main.variable(observer()).define(["sp"], function(sp){return(
sp
)});
  main.variable(observer()).define(["joinedData","flatData"], function(joinedData,flatData){return(
joinedData.filter(d => d.species === flatData[0].species)[0].genus
)});
  main.variable(observer("joinedData")).define("joinedData", ["_","longData","metadata"], function(_,longData,metadata)
{
  let c = _.cloneDeep(longData);
  c.forEach(function(individual) {
    var result = metadata.filter(function(sample) {
      return sample.Sample_ID === individual.Sample;
    });
    individual.month = result[0] !== undefined ? Number(result[0].month) : null;
    individual.day = result[0] !== undefined ? Number(result[0].day) : null;
    individual.year = result[0] !== undefined ? Number(result[0].year) : null;
    individual.date = new Date(
      result[0].year,
      result[0].month - 1,
      result[0].day
    );

    individual.site = result[0] !== undefined ? result[0].site : null;
  });

  return c;
}
);
  main.variable(observer("uniqDates")).define("uniqDates", ["joinedData"], function(joinedData){return(
[...new Set(joinedData.map(d => d.date))]
)});
  main.variable(observer("uniqClass")).define("uniqClass", ["flatData"], function(flatData){return(
[...new Set(flatData.map(d => d.class))]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Join and filter by site and species`
)});
  main.variable(observer("speciesList")).define("speciesList", ["joinedData"], function(joinedData){return(
[
  ...new Set(
    joinedData.map(item => {
      return item.species.replace("s___", "");
      // }
    })
  )
]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Roll up by month and species`
)});
  main.variable(observer("sumValues")).define("sumValues", function(){return(
obj => Object.values(obj).reduce((a, b) => a + b)
)});
  main.variable(observer("speciesPresent")).define("speciesPresent", ["joinedData"], function(joinedData){return(
[
  ...new Set(
    joinedData
      .filter(d => d.Value > 0)
      .map(item => item.species.replace("s___", "").replace("s__", ""))
  )
]
)});
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer()).define(["groupSum","longData"], function(groupSum,longData){return(
groupSum(longData, d => d.taxonomy, d => Number(d.Value))
)});
  main.variable(observer()).define(["nest","longData"], function(nest,longData){return(
nest(longData, d => d.Sample, d => d.taxonomy)
)});
  main.variable(observer()).define(["bymonth"], function(bymonth){return(
Array.from(bymonth).reduce(
  (obj, [key, value]) =>
    Object.assign(obj, { [key]: value }), // Be careful! Maps can have non-String keys; object literals can't.
  {}
)
)});
  main.variable(observer()).define(["bymonth"], function(bymonth){return(
bymonth.entries()
)});
  main.variable(observer("bymonth")).define("bymonth", ["rollup","joinedData","d3"], function(rollup,joinedData,d3)
{
  //rollup fake monthly partitioned
  return rollup(
    joinedData,
    v => d3.sum(v, d => d.Value),
    d => d.site,
    d => d.month,
    d => d.taxonomy
  );
}
);
  main.variable(observer()).define(["rollup","joinedData","d3"], function(rollup,joinedData,d3){return(
rollup(
  joinedData,
  v => d3.sum(v, d => d.Value),
  d => d.site,
  d => d.month,
  d => d.taxonomy
)
)});
  main.variable(observer("hierarchy")).define("hierarchy", function(){return(
[
  "Kingdom",
  "phylum",
  "class",
  "order",
  "family",
  "genus",
  "species"
]
)});
  const child1 = runtime.module(define1);
  main.import("group", child1);
  main.import("groupMap", child1);
  main.import("groupReduce", child1);
  main.import("groupSum", child1);
  const child2 = runtime.module(define2);
  main.import("nest", child2);
  main.import("rollup", child2);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  main.variable(observer("_")).define("_", ["require"], function(require){return(
require("lodash")
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  const child3 = runtime.module(define3);
  main.import("select", child3);
  const child4 = runtime.module(define4);
  main.import("BC_Midres", child4);
  const child5 = runtime.module(define5);
  main.import("table", child5);
  return main;
}
