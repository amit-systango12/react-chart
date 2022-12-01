import ReactEcharts from "echarts-for-react";
import allData from "../response.json";

console.log(allData);

let value1155 = 0;
let fungible = 0;
let liquidityPool = 0;
let nonFungible = 0;
let dumpers = 0;
let buyers = 0;
let balance = 0;


allData.contracts_count_sort.map((item) => {
  if (item.TYPE === "1155") {
    value1155 = value1155 + item.COUNT_OF_TRANSACTIONS;
  }
  if (item.TYPE === "FUNGIBLE") {
    fungible = fungible + item.COUNT_OF_TRANSACTIONS;
  }
  if (item.TYPE === "LIQUIDITY_POOL") {
    liquidityPool = liquidityPool + item.COUNT_OF_TRANSACTIONS;
  }
  if (item.TYPE === "NON-FUNGIBLE") {
    nonFungible = nonFungible + item.COUNT_OF_TRANSACTIONS;
  }
});

allData.nodes.map((item) => {
  if (item.new_group === "HIGH COUNT FT DUMPERS") {
    dumpers = dumpers + item.balance;
  }
  if (item.new_group === "HIGH BALANCE BALANCE") {
    balance = balance + item.balance;
  }
  if (item.new_group === "HIGH COUNT FT BUYERS") {
    buyers = buyers + item.balance;
  }
});

console.log("value1155", value1155);
console.log("fungible", fungible);
console.log("liquidityPool", liquidityPool);
console.log("nonFungible", nonFungible);

const dataset1 = {
  // dimensions: ['name', 'score'],
  source: [
    ["CONTRACT_FUNGIBLE", fungible],
    ["CONTRACT_LIQUIDITY_POOL", liquidityPool],
    ["CONTRACT_1155", value1155],
    ["CONTRACT_NON-FUNGIBLE", nonFungible],
  ],
};

const option1 = {
  dataset: [dataset1],
  legend: {
    bottom: 10,
    left: 'center',
    data: ['CONTRACT_FUNGIBLE', 'CONTRACT_LIQUIDITY_POOL', 'CONTRACT_1155','CONTRACT_NON-FUNGIBLE']
  },
  title: {
    text: 'Token Type Bifurcation of Interacted Contracts',
    left: 'center'
  },
  series: [
    {
      type: "pie",
      id: "Score",
      radius: [0, "80%"],
      universalTransition: true,
      animationDurationUpdate: 1000,
    },
  ],
};

const dataset2 = {
  source: [
    ["HIGH COUNT FT DUMPERS", 41 || dumpers],
    ["HIGH BALANCE BALANCE", 47 || balance],
    ["HIGH COUNT FT BUYERS", 39 || buyers],
  ],
};

console.log('dataset2--',dataset2)
const option2 = {
  dataset: [dataset2],
  legend: {
    bottom: 10,
    left: 'center',
    data: ['HIGH COUNT FT DUMPERS', 'HIGH BALANCE BALANCE', 'HIGH COUNT FT BUYERS']
  },
  title: {
    text: 'Wallets Bifurcation in Sub Communities',
    left: 'center'
  },
  series: [
    {
      type: "pie",
      id: "Score",
      radius: [0, "80%"],
      universalTransition: true,
      animationDurationUpdate: 1000,
    },
  ],
};
const PieChart = () => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <h2>Pie Chart</h2>
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <div style={{ marginLeft: "40px", width: "100%", height: "100%" }}>
          <ReactEcharts
            option={option1}
            style={{ width: "80%", height: "80%" }}
          />
        </div>

        <div style={{ width: "100%", height: "100%" }}>
          <ReactEcharts
            option={option2}
            style={{ width: "80%", height: "80%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
