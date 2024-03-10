import {ValantisService} from "@/services/ValantisService/ValantisService.ts";
import {getUniqIds} from "@/lib/getUniqIds.ts";


interface FetchAllIds {
  setLoading: (isLoading: boolean) => void;
}


export const fetchAllIds = async (props: FetchAllIds) => {
  const {setLoading} = props;
  const allItemsIds: string[] = [];
  const limit = 100;

  let offset = 0;
  let hasMoreData = true;

  while (hasMoreData) {
    setLoading(true);

    const response = await ValantisService.getData({
      action: "get_ids",
      params: {offset, limit}
    });

    try {
      const responseData = await response.json();
      const result = responseData.result;

      if (result.length < limit) {
        hasMoreData = false;
        setLoading(false);
      }

      allItemsIds.push(...result);
      offset += limit;
    } catch (e) {
      console.log('we have some problems', e)
    }
  }

  return getUniqIds(allItemsIds);
}