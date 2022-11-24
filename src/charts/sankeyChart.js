import ReactEcharts from "echarts-for-react";
import allData from "../response.json";

const SankeyChart = () => {
  let value1155 = 0;
  let fungible = 0;
  let liquidityPool = 0;
  let nonFungible = 0;
  
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

  const getOptionVolume = {
      series: {
        type: 'sankey',
        layout: 'none',
        emphasis: {
          focus: 'adjacency'
        },
        data: [
          {
            name: '1155',
          },
          {
            name: "FUNGIBLE",
          },
          {
            name: "LIQUIDITY_POOL",
          },
          {
            name: "NON-FUNGIBLE",
          }
        ],
        links: [
          {
            source: 'LIQUIDITY_POOL',
            target: 'FUNGIBLE',
            // value: fungible
            value: 30 // replace with original value
          },
          {
            source: 'LIQUIDITY_POOL',
            target: '1155',
            // value: value1155
            value: 60 // replace with original value
          },
          {
            source: 'LIQUIDITY_POOL',
            target: 'NON-FUNGIBLE',
            value: nonFungible
          }
        ]
      }
    };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <h2>Sankey Chart</h2>

      <div style={{ display: "flex", width: "100%", height: "100%" }}>
          <ReactEcharts
            option={getOptionVolume}
            style={{
              height: "90%",
              width: "80%",
            }}
          />
      </div>
    </div>
  );
};

export default SankeyChart;
