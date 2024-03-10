import {KeyType, ValantisService} from "@/services/ValantisService/ValantisService.ts";


export const fetchFilteredIds = async (field: string |  number, filterKey: KeyType) => {

  const params = {
    action: 'filter',
    params: {[filterKey]: field}
  }
  const response = await ValantisService.getData(params);

  try {
    const responseData = await response.json();
    return responseData.result;
  } catch (e) {
    console.log('we have some problems', e)
  }


}