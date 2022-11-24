import ReactEcharts from "echarts-for-react";
import graph from "../response.json";

graph.nodes.forEach(function (node) {
  // node.symbolSize = node.radius;
  node.symbolSize = 5;

});

let legends = []
graph.nodes.map((a) =>  {
  legends.push(a.name);
})
const GraphForce = () => {
  const options = {
    title: {
      text: 'Graph Force Chart',
      top: 'bottom',
      left: 'right'
    },
    tooltip: {},
    // legend: {
    //   data: ['HTMLElement', 'WebGL', 'SVG', 'CSS', 'Other']
    // },
    // legend: legends,
    series: [
      {
        name: 'Les Miserables',
        type: 'graph',
        layout: 'force',
        data: graph.nodes,
        // data: graph.nodes.map((a) =>  {
        //   return [a.name,a.balance]
        // }),
        links: graph.interactions,
        // categories: graph.categories,
        roam: true,
        label: {
          position: 'right'
        },
        force: {
          repulsion: 80
        }
      }
    ]
  };
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactEcharts style={{ height: "90%", width: "90%"  }} option={options} />
    </div>
  );
};
export default GraphForce;
