import { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import allData from "../response.json";

const BarChart = () => {
  const [countData, setCountData] = useState([]);
  const [countDataXAxis, setCountDataXAxis] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [volumeDataXAxis, setVolumeDataXAxis] = useState([]);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = () => {
    const data = [];
    const dataX = [];
    const data1 = [];
    const data1X = [];

    for (let i = 0; i < 10; i++) {
      data.push(allData.contracts_count_sort[i].COUNT_OF_TRANSACTIONS);
      dataX.push(allData.contracts_count_sort[i].NAME);
    }
    setCountData(data);
    setCountDataXAxis(dataX);

    const sortData = [...allData.contracts_count_sort];
    sortData.sort(
      (a, b) =>
        Number(b.VOLUME_OF_TRANSACTIONS) - Number(a.VOLUME_OF_TRANSACTIONS)
    );
    for (let i = 0; i < 10; i++) {
      data1.push(parseFloat(sortData[i].VOLUME_OF_TRANSACTIONS).toFixed(2));
      data1X.push(sortData[i].NAME);
    }
    setVolumeData(data1);
    setVolumeDataXAxis(data1X);
  };

  const getOptionVolume = {
    tooltip: {},
    title: {
      text: 'Top 10 traded coins by Volume',
      left: 'center'
    },
    xAxis: {
      data: volumeDataXAxis,
      axisLabel: {
        rotate: 25,
        textStyle: {
          baseline: "top",
          color: "#333",
          fontSize: 10,
          fontWeight: "bold",
        },
      },
    },
    yAxis: {
      name: "Percentage 22",
      nameGap: 30,
      nameLocation: "center",
    },
    series: [
      {
        data: volumeData,
        emphasis: {
          itemStyle: {
            color: "blue",
          },
        },
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };

  const getOptionCount = {
    tooltip: {},
    title: {
      text: 'Top 10 traded coins by Count',
      left: 'center'
    },
    xAxis: {
      data: countDataXAxis,
      axisLabel: {
        rotate: 25,
        textStyle: {
          baseline: "top",
          color: "#333",
          fontSize: 10,
          fontWeight: "bold",
        },
      },
    },
    yAxis: {},
    series: [
      {
        data: countData,
        emphasis: {
          itemStyle: {
            color: "blue",
          },
        },
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
        label: {
          show: true,
          color: "#838dec",
          fontSize: 10,
        },
      },
    ],
  };

  console.log("volumeDataXAxis-", volumeData);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <h2>Bar Chart</h2>

      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <div style={{ marginLeft: "40px", width: "100%", height: "100%" }}>
          <ReactEcharts
            option={getOptionVolume}
            style={{
              height: "90%",
              width: "80%",
            }}
          />
        </div>

        <div style={{ width: "100%", height: "100%" }}>
          <ReactEcharts
            option={getOptionCount}
            style={{
              height: "90%",
              width: "80%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
