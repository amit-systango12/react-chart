import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Resizable, ResizableBox } from "react-resizable";
import { ColumnTOOL } from "./listTools";

const DRAG_NESTED_ITEM = "DragNestedItem";

const style = {
  border: "1px dashed gray",
  padding: "1rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "aquamarine",
  cursor: "move",
  // height: "100%",
  // width: "140px"
};

const squreStyle = {
  height: "100px",
  width: "100px",
  background: "red",
  margin: "10px",
};

export const ItemTypes = {
  CARD: "card",
};

export const ItemTypesNested = {
  CARD: "suare",
};

export const Card = ({
  cardItem,
  index,
  handleUpdateBoxeList,
  moveCard,
  moveNestedCard,
  handleRemoveIsHover,
  handleResizeNestedBox,
  handleUpdateNestedCol,
  handleResizeMainBox
}) => {
  const { id, name: text, nestedItem, isHover, type,minH, minW,  } = cardItem;
  const ref = useRef(null);
  console.log('minH, minW,======',cardItem,minH, minW)
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      // drop(item, monitor) {
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
    drop() {
      handleRemoveIsHover();
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
  const opacity = isDragging ? 0.5 : 1;
  drag(drop(ref));

  const [{ canDrop2, isOverCurrent }, drop2] = useDrop({
    accept: "tool2",
    canDrop: () => true,
    drop: (item) => {
      if (isOverCurrent) {
        handleUpdateBoxeList(id, item, "square");
      }
    },
    collect: (monitor) => ({
      canDrop2: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  const [{ canDropCol, isOverCurrentCol }, dropCol] = useDrop({
    accept: "columnTool",
    canDrop: () => true,
    drop: (item) => {
      if (isOverCurrentCol) {
        handleUpdateBoxeList(id, item, "column");
      }
    },
    collect: (monitor) => ({
      canDropCol: monitor.canDrop(),
      isOverCurrentCol: monitor.isOver({ shallow: true }),
    }),
  });

  //TODO: Functionality will not work with movable row
  const [{ isDraggingCol }, dragCol] = useDrag({
    type: ColumnTOOL,
    // item: { },
    item: () => {
      return { id, index };
    },
    // collect: (monitor) => ({
    //   isDraggingCol: monitor.isDragging(),
    // }),
    collect: (monitor) => {
      return {
        isDraggingCol: monitor.isDragging(),
      };
    },
  });

  const [{ canDropCol2, isOverCurrentCol2 }, dropCol2] = useDrop({
    accept: ColumnTOOL,
    canDrop: () => true,
    drop: (item) => {
      if (isOverCurrentCol2) {
        // handleUpdateBoxeList(id, item, "column");
      }
    },
    collect: (monitor) => ({
      canDropCol: monitor.canDrop(),
      isOverCurrentCol2: monitor.isOver({ shallow: true }),
    }),
  });

  const [{ canDropNestedItem, isOverCurrentNestedItem }, dropNestedItem] =
    useDrop({
      accept: DRAG_NESTED_ITEM,
      canDrop: () => true,
      drop: (item) => {
        if (isOverCurrentNestedItem) {
          // handleAddData(item,"square")
        }
      },
      collect: (monitor) => ({
        canDropNestedItem: monitor.canDrop(),
        isOverCurrentNestedItem: monitor.isOver({ shallow: true }),
      }),
    });

  let updateStyle = { ...style };
  if (isHover) {
    updateStyle.backgroundColor = "#D3D3D3";
    updateStyle.padding = "2rem";
  }

  if (type === "column") {
    updateStyle.height = minH+"px"
    updateStyle.width = minW+"px";
  }

  if (type === "square") {
    updateStyle.height = minH+"px"
    updateStyle.width = minW+"px";
  }


  const handleResize = (event, { size }) => {
    handleResizeMainBox(size.height, size.width, index);
  };

  const renderData = () => (
    <>
      {text}
      {/* {type === "row" && text} */}
      {/* {type !== "row" && <div ref={dragCol}>{text}</div>} */}
      <div style={{ display: "flex" }}>
        {type === "row" &&
          nestedItem.map((data, childIndex) => (
            <RenderNestedItem
              data={data}
              index={childIndex}
              parentItemIndex={index}
              moveNestedCard={moveNestedCard}
              handleRemoveIsHover={handleRemoveIsHover}
              handleResizeNestedBox={handleResizeNestedBox}
              handleUpdateNestedCol={handleUpdateNestedCol}
            />
          ))}
        {type !== "square" && (
          <>
            {(type === "column" || type === "row") && canDrop2 && (
              <div
                className={`widget-drop-area ${
                  canDrop2 ? "widget-highlight" : ""
                }`}
                ref={drop2}
              >
                Drop Square here
              </div>
            )}
            {type === "row" && canDropCol && (
              <div
                className={`${canDropCol ? "column-highlight" : ""}`}
                ref={dropCol}
              >
                Drop Coloumn here
              </div>
            )}
            {canDropNestedItem && (
              <div
                className={`${canDropNestedItem ? "column-highlight" : ""}`}
                ref={dropNestedItem}
              >
                Drop Nested Item
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
  return (
    <>
      {canDropNestedItem && (
        <div
          className={`${canDropNestedItem ? "column-highlight" : ""}`}
          ref={dropNestedItem}
        >
          Drop Nested Item 3
        </div>
      )}
      {canDropCol2 && (
        <div
          className={`${canDropCol2 ? "column-highlight" : ""}`}
          ref={dropCol2}
        >
          Drop Coloumn 2 here
        </div>
      )}
      <div ref={ref} data-handler-id={handlerId}>
        <div style={updateStyle}>
          {type === "row" ? (
            renderData()
          ) : (
            <ResizableBox className="resize-main" height={minH} width={minW} onResize={handleResize}>
              {renderData()}
            </ResizableBox>
          )}
        </div>
      </div>
    </>
  );
};

const RenderNestedItem = ({
  data,
  index,
  parentItemIndex,
  moveNestedCard,
  handleRemoveIsHover,
  handleResizeNestedBox,
  handleUpdateNestedCol,
}) => {
  const { name, isHover, id, minH, minW, type, nestedItem } = data;

  const handleResize = (event, { size }) => {
    handleResizeNestedBox(size.height, size.width, index, parentItemIndex);
  };

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypesNested.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      // drop(item, monitor) {
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
    drop() {
      handleRemoveIsHover(parentItemIndex);
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
  let mW = minW > 50 ? minW : 100;
  let mH = minH > 50 ? minH : 100;

  const [{ canDropSquare, isOverCurrent }, dropSquareRef] = useDrop({
    accept: "tool2",
    canDrop: () => true,
    drop: (item) => {
      if (isOverCurrent) {
        handleUpdateNestedCol(parentItemIndex, index, item);
      }
    },
    collect: (monitor) => ({
      canDropSquare: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  const [{ isDraggingNestedItem }, dragNestedItem] = useDrag({
    type: DRAG_NESTED_ITEM,
    item: { name },
    collect: (monitor) => ({
      isDraggingNestedItem: monitor.isDragging(),
    }),
  });

  return (
    <div ref={ref} data-handler-id={handlerId}>
      <div ref={dragNestedItem}>
        <ResizableBox height={mH} width={mW} onResize={handleResize}>
          {type === "column" ? (
            <div
              className="box"
              style={{
                width: mW + "px",
                height: mH + "px",
                background: "green",
              }}
            >
              {name}
              <div style={{ display: "flex", padding: 10 }}>
                {nestedItem.map((item, index) => (
                  <div index={`${index}-square`} className="nestedSquare">
                    {item.name}
                  </div>
                ))}
              </div>
              {canDropSquare && (
                <div
                  className={`${canDropSquare ? "widget-highlight" : ""}`}
                  ref={dropSquareRef}
                >
                  Drop Square here
                </div>
              )}
            </div>
          ) : (
            <div
              className="box"
              style={{
                width: mW + "px",
                height: mH + "px",
                background: "green",
              }}
            >
              {name}
            </div>
          )}
        </ResizableBox>
      </div>
    </div>
  );
};
