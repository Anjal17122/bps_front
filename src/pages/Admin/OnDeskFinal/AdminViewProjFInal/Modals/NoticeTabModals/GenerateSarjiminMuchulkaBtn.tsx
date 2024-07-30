import MyButton from "../../../../../../Common/TableButton/MyButton";
import { dispatch } from "../../../../../../Store/StoreViewProject/StoreViewProj";
import { Ac } from "../../../../../../Store/StoreViewProject/types";

const GenerateSarjiminMuchulkaBtn = () => {
  const handleNewMuchulka = () => {
    dispatch({ type: Ac.setSarjiminMuchulka, payload: true });
  };

  return (
    <MyButton color="purple" onClick={handleNewMuchulka}>
      Generate सर्जमिन मुचुल्का
    </MyButton>
  );
};

export default GenerateSarjiminMuchulkaBtn;
