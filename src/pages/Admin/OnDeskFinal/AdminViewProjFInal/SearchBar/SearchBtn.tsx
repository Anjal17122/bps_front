import Search from "antd/lib/input/Search";
import useStoreViewProj from "../../../../../Store/StoreViewProject/StoreViewProj";
import { searchTyp } from "../types/typesAdminViewProj";

interface Props {
  onSearch: (id: string) => void;
  typ: searchTyp;
}

const SearchBtn = ({ onSearch, typ }: Props) => {
  const { disabled } = useStoreViewProj();
  return (
    <Search
      className="MySearch"
      placeholder={
        typ === "id"
          ? "Project Id"
          : typ === "name"
          ? "Applicant Name"
          : "Kitta No"
      }
      disabled={disabled}
      enterButton
      onSearch={onSearch}
    />
  );
};

export default SearchBtn;
