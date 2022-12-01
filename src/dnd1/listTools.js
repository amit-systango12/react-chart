import React from "react";
import { useDrag } from "react-dnd";

const TOOL = "tool";
const TOOL2 = "tool2";

const listItems = [
  {
    name: "Row 1",
    nestedItem: []
  },
  {
    name: "Row 2",
    nestedItem: []
  },
  {
    name: "Row 3",
    nestedItem: []
  },
  {
    name: "Row 4",
    nestedItem: []
  },
];

const listItems2 = [
  {
    name: "Square A",
  },
  {
    name: "Square B",
  },
  {
    name: "Square C",
  },
  {
    name: "Square D",
  },
];

const Tool = ({ item }) => {
  const [{ isDragging }, drag] = useDrag({
    type: TOOL,
    item: { item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className="tool" ref={drag}>
      {item.name}
    </div>
  );
};

const Tool2 = ({ name }) => {
  const [{ isDragging2 }, drag2] = useDrag({
    type: TOOL2,
    item: { name },
    collect: (monitor) => ({
      isDragging2: monitor.isDragging(),
    }),
  });

  return (
    <div className="tool" ref={drag2}>
      {name}
    </div>
  );
};
const ListTools = () => {
  return (
    <div className="tool-wrapper">
      {listItems.map((item) => (
        <Tool item={item} />
      ))}
      <div>
        <p>New Widget</p>
      </div>
      {listItems2.map((item) => (
        <Tool2 name={item.name} />
      ))}
    </div>
  );
};

export default ListTools;
