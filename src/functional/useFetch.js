import { useEffect, useState } from "react";
import { getItemsFromSection } from "./getItems";
export default function useFetchItems(section) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    const fetchData = async () => {
      setStatus("success");
      const data = await getItemsFromSection(section);
      setData(data);
    };

    if (status !== "success") {
      fetchData();
    }
  }, [data, status, section]);
  return [data, status];
}
