import {ValantisService} from "@/services/ValantisService/ValantisService.ts";
import {getUniqIds} from "@/lib/getUniqIds.ts";

export const fetchFilteredIds = async () => {
  const response = await ValantisService.getData(
    {
      action: 'filter',
      params: {product: 'Золотые серьги с бриллиантами и  Аметистами'}
    }
  );

  try {
    const responseData = await response.json();
    const result = responseData.result;
    return getUniqIds(result);
  } catch (e) {
    console.log('we have some problems', e)
  }


}