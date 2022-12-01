import React from "react";
import { useDrag } from "react-dnd";

export const PetCard = ({ id, name }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "pet",
    item: { id, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div className="pet-card" ref={dragRef}>
      {!isDragging && <img src={name} style={{ height: "150x", width: "150px" }}></img>}
      {isDragging && <div style={{height: "170px", width: "170px", padding: "15px", background: 'gray' }} />}
    </div>
  );
};


// export const Draggable2 = ({ id, name }) => {
//   const [{ isDragging }, dragRef] = useDrag({
//     type: "pet2",
//     item: { id, name },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });
//   return (
//     <div className="pet-card" ref={dragRef}>
//       {!isDragging && <h2>Some data</h2>}
//       {/* {!isDragging && <img src={name} style={{ height: "150x", width: "150px" }}></img>} */}
//       {isDragging && <div style={{height: "170px", width: "170px", padding: "15px", background: 'gray' }} />}
//     </div>
//   );
// };
