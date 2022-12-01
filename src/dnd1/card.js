import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
const style = {
  border: "1px dashed gray",
  padding: "1rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "aquamarine",
  cursor: "move",
};

export const ItemTypes = {
  CARD: "card",
};

export const ItemTypesNested = {
  CARD: "suare",
};

export const Card = ({ cardItem, index, handleUpdateBoxeList, moveCard , moveNestedCard}) => {
  const { id, name: text, nestedItem } = cardItem;
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const [{ canDrop, isOverCurrent }, drop2] = useDrop({
    accept: "tool2",
    canDrop: () => true,
    drop: (item) => {
      if (isOverCurrent) {
        handleUpdateBoxeList(id, item);
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      <div style={{ display: "flex" }}>
        {nestedItem.map((data,childIndex) => (
          <RenderNestedItem text={data.name} index={childIndex} parentItemIndex={index} id={data.id} moveNestedCard={moveNestedCard} />
        ))}
      </div>
      <div className={`drop-area ${canDrop ? "highlight" : ""}`} ref={drop2}>
        Drag here
      </div>
      {text}
    </div>
  );
};

const RenderNestedItem = ({ text,index,id, parentItemIndex ,moveNestedCard}) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypesNested.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveNestedCard(dragIndex, hoverIndex, parentItemIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypesNested.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <div className="square">{text}</div>
    </div>
  );
};
