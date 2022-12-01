import React, { useState, useCallback } from "react";
import update from "immutability-helper";
import { useDrop } from "react-dnd";
import { Card } from "./card.js";

const Container = () => {
  const [boxes, setBoxes] = useState([]);
  const [{ canDrop, isOverCurrent }, drop] = useDrop({
    accept: "tool",
    canDrop: () => true,
    drop: (data) => {
      if (isOverCurrent) {
        const newItem = {
          name: data.item.name,
          id: new Date().getTime(),
          nestedItem: data.item.nestedItem,
        };
        setBoxes([...boxes, newItem]);
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setBoxes((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const renderCard = (card, index) => {
    return (
      <Card
        index={index}
        cardItem={card}
        moveCard={moveCard}
        moveNestedCard={moveNestedCard}
        handleUpdateBoxeList={handleUpdateBoxeList}
      />
    );
  };

  const handleUpdateBoxeList = (id, item) => {
    const allItem = [...boxes];
    const index = allItem.findIndex((obj) => obj.id === id);
    allItem[index].nestedItem.push({
      name: item.name,
      id: new Date().getTime(),
    });
    setBoxes(allItem);
  };

  const moveNestedCard = (dragIndex, dropIndex, parentItemIndex) => {
    const allItem = [...boxes];
    const arr = boxes[parentItemIndex].nestedItem;
    const element = arr.splice(dragIndex, 1)[0];
    arr.splice(dropIndex, 0, element);
    allItem[parentItemIndex].nestedItem = arr;
    setBoxes(allItem);
  };

  return (
    <div className="container">
      <div>{boxes.map((card, i) => renderCard(card, i))}</div>
      <div className={`drop-area ${canDrop ? "highlight" : ""}`} ref={drop}>
        Drag here
      </div>
    </div>
  );
};

export default Container;
