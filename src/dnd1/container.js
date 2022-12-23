import React, { useEffect, useState, useCallback } from "react";
import update from "immutability-helper";
import { useDrop } from "react-dnd";
import { Card } from "./card.js";

let boxesData = [];
const Container = ({ childRef, childRef2 }) => {
  const [boxes, setBoxes] = useState([]);
  useEffect(() => {
    childRef.current = handleSaveData;
    childRef2.current = handleGetSaveData;
  }, []);

  useEffect(() => {
    boxesData = [...boxes];
  }, [boxes]);

  const [{ canDrop, isOverCurrent }, drop] = useDrop({
    accept: "tool",
    canDrop: () => true,
    drop: (data) => {
      if (isOverCurrent) {
        const newItem = {
          name: data.item.name,
          id: new Date().getTime(),
          nestedItem: data.item.nestedItem,
          type: "row",
        };
        setBoxes([...boxes, newItem]);
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  const handleSaveData = () => {
    localStorage.setItem("data", JSON.stringify(boxesData));
  };

  const handleGetSaveData = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    setBoxes(data);
  };

  const moveCard = (dragIndex, hoverIndex) => {
    const allItem = [...boxes];
    const element = allItem.splice(dragIndex, 1)[0];
    element.isHover = true;
    allItem.splice(hoverIndex, 0, element);
    setBoxes(allItem);
  };

  const handleRemoveIsHover = (parentItemIndex) => {
    if (parentItemIndex) {
      const allItem = [...boxes];
      const arr = boxes[parentItemIndex].nestedItem;
      const modifyData = [];
      arr.map((item) => {
        const obj = { ...item };
        obj.isHover = false;
        modifyData.push(obj);
      });
      allItem[parentItemIndex].nestedItem = modifyData;
      setBoxes(allItem);
    } else {
      const modifyData = [];
      boxes.map((item) => {
        const obj = { ...item };
        obj.isHover = false;
        modifyData.push(obj);
      });
      setBoxes(modifyData);
    }
  };

  const handleResizeMainBox = (height, width, index) => {
    console.log('need to update heigt and width')
  };

  const handleResizeNestedBox = (height, width, index, parentItemIndex) => {
    const allItem = [...boxes];
    const arr = boxes[parentItemIndex].nestedItem;
    const updatedArr = [];
    for (let i = 0; i < arr.length; i++) {
      const obj = { ...arr[i] };
      if (i === index) {
        obj.minH = height;
        obj.minW = width;
      }
      updatedArr.push(obj);
    }
    allItem[parentItemIndex].nestedItem = updatedArr;
    setBoxes(allItem);
  };

  const renderCard = (card, index) => {
    return (
      <Card
        index={index}
        cardItem={card}
        moveCard={moveCard}
        moveNestedCard={moveNestedCard}
        handleUpdateBoxeList={handleUpdateBoxeList}
        handleRemoveIsHover={handleRemoveIsHover}
        handleResizeNestedBox={handleResizeNestedBox}
        handleUpdateNestedCol={handleUpdateNestedCol}
        handleResizeMainBox={handleResizeMainBox}
      />
    );
  };

  const handleUpdateNestedCol = (parentItemIndex, index, item) => {
    const allItem = [...boxes];
    const size = {
      id: new Date().getTime(),
      h: 1,
      w: 1,
      minH: 100,
      maxH: 200,
      minW: 100,
      maxW: 200,
      x: 100,
      y: 100,
      type: "square",
    };
    allItem[parentItemIndex].nestedItem[index].nestedItem.push({
      name: item.name,
      id: new Date().getTime(),
      ...size,
    });
    setBoxes(allItem);
  };

  const handleUpdateBoxeList = (id, item, type) => {
    const allItem = [...boxes];
    const index = allItem.findIndex((obj) => obj.id === id);
    const size = {
      id: new Date().getTime(),
      h: 1,
      w: 1,
      minH: type === "square" ? 100 : 150,
      maxH: type === "square" ? 200 : 250,
      minW: type === "square" ? 100 : 150,
      maxW: type === "square" ? 200 : 250,
      x: 100,
      y: 100,
      type,
    };
    if (type === "column") {
      size.nestedItem = [];
    }
    allItem[index].nestedItem.push({
      name: item.name,
      id: new Date().getTime(),
      ...size,
    });
    setBoxes(allItem);
  };

  const moveNestedCard = (dragIndex, dropIndex, parentItemIndex) => {
    const allItem = [...boxes];
    const arr = boxes[parentItemIndex].nestedItem;
    const element = arr.splice(dragIndex, 1)[0];
    element.isHover = true;
    arr.splice(dropIndex, 0, element);
    allItem[parentItemIndex].nestedItem = arr;
    setBoxes(allItem);
  };

  const handleAddData = (item, type) => {
    const size = {
      id: new Date().getTime(),
      h: 1,
      w: 1,
      minH: type === "square" ? 100 : 150,
      maxH: type === "square" ? 200 : 250,
      minW: type === "square" ? 120 : 150,
      maxW: type === "square" ? 200 : 250,
      x: 100,
      y: 100,
      type,
    };
    const newItem = {
      name: item.name,
      ...size,
    };
    setBoxes([...boxes, newItem]);
  };

  const [{ canDropSquare, isOverCurrentSquare }, dropSquare] = useDrop({
    accept: "tool2",
    canDrop: () => true,
    drop: (item) => {
      console.log("item--", item);
      if (isOverCurrentSquare) {
        handleAddData(item, "square");
      }
    },
    collect: (monitor) => ({
      canDropSquare: monitor.canDrop(),
      isOverCurrentSquare: monitor.isOver({ shallow: true }),
    }),
  });

  const [{ canDropCol, isOverCurrentCol }, dropCol] = useDrop({
    accept: "columnTool",
    canDrop: () => true,
    drop: (item) => {
      if (isOverCurrentCol) {
        handleAddData(item, "column");
      }
    },
    collect: (monitor) => ({
      canDropCol: monitor.canDrop(),
      isOverCurrentCol: monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <div className="container">
      <div>{boxes.map((card, i) => renderCard(card, i))}</div>
      <div className={`drop-area ${canDrop ? "highlight" : ""}`} ref={drop}>
        Drag here
      </div>
      {canDropSquare && (
        <div
          className={`widget-drop-area ${
            canDropSquare ? "widget-highlight" : ""
          }`}
          ref={dropSquare}
        >
          Drop Square here
        </div>
      )}
      {canDropCol && (
        <div
          className={`${canDropCol ? "column-highlight" : ""}`}
          ref={dropCol}
        >
          Drop Coloumn here
        </div>
      )}
    </div>
  );
};

export default Container;
