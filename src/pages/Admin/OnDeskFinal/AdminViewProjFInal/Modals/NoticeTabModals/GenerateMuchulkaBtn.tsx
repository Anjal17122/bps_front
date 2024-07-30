import MyButton from "../../../../../../Common/TableButton/MyButton";
import { dispatch } from "../../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../../Store/StoreViewProject/types";

const GenerateMuchulkaBtn = () => {
  const handleNewMuchulka = () => {
    dispatch({ type: Ac.setNewMuchulka, payload: true });
  };

  return (
    <MyButton color="green" onClick={handleNewMuchulka}>
      Generate सुचनाको मुचुल्का
    </MyButton>
  );
};

export default GenerateMuchulkaBtn;
