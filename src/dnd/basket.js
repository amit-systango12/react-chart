import React, { useState } from "react";
import { useDrop, useDrag } from "react-dnd";
import { PetCard } from "./petcard";

const PETS = [
  { id: 1, name: "https://api.lorem.space/image/movie?w=150&h=180" },
  { id: 2, name: "https://api.lorem.space/image/game?w=150&h=180" },
  { id: 3, name: "https://api.lorem.space/image/album?w=150&h=180" },
  { id: 4, name: "https://api.lorem.space/image/fashion?w=150&h=180" },
];

export const Basket = () => {
  const [petList, setPetList] = useState(PETS);
  const [basket, setBasket] = useState([]);
  const [basket2, setBasket2] = useState([]);

  const [{ isOver1 }, dropRef1] = useDrop({
    accept: "pet",
    drop: (item) => {
      const isExist = basket.find((obj) => obj.id === item.id);
      if (!isExist) {
        const allData = [...basket];
        allData.push(item);
        setBasket(allData);
      }
    },
    collect: (monitor) => ({
      isOver1: monitor.isOver(),
    }),
  });

  const [{ isOver2 }, dropRef2] = useDrop({
    accept: "pet",
    drop: (item) => {
      const isExist = basket2.find((obj) => obj.id === item.id);
      if (!isExist) {
        const allData = [...basket2];
        allData.push(item);
        setBasket2(allData);
      }
    },
    collect: (monitor) => ({
      isOver2: monitor.isOver(),
    }),
  });


  return (
    <React.Fragment>
      <div className="pets">
        {petList.map((pet) => (
          <PetCard draggable id={pet.id} name={pet.name} />
        ))}
      </div>

      <Basketdraggable basket={basket} isOver1={isOver1} dropRef1={dropRef1} />
      
      <div className="basket2" ref={dropRef2}>
        <p>new</p>
        {isOver2 && <div>Drop Here 2!</div>}
      </div>
    </React.Fragment>
  );
};



export const Basketdraggable = ({ basket, isOver1, dropRef1 }) => {
  const [{ isDragging }, dragRef2] = useDrag({
    type: "pet2",
    item: { basket },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div ref={dragRef2} style={{borderWidth:"10px",border:'solid' ,borderColor: 'black', height: '38%', width: "80%"}}>
      <div className="basket" ref={dropRef1}>
      {basket.map((pet) => (
        <PetCard id={pet.id} name={pet.name} />
      ))}
      {isOver1 && <div>Drop Here!</div>}
    </div>
    </div>
  );
};
