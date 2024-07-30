import { getWLoad } from "./Api";
import { setSTyp } from "./CreateProjectService";
import { sN } from "./ProjectService";

export const CopyProjectStorey = (id: sN, sets: setSTyp) =>
  getWLoad("/project/storey/addition?id=" + id, sets);
