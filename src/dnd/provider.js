import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Basket } from "./basket";

const DndAppProvider = () => {
  return <DndProvider backend={HTML5Backend}>
    <Basket/>
  </DndProvider>;
};

export default DndAppProvider;
