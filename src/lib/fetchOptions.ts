import {ValantisService} from "@/services/ValantisService/ValantisService.ts";

type FieldsType = 'price' | 'product' | 'brand';

export const fetchOptions = async (fieldName: FieldsType) => {
  const response = await ValantisService.getData({
    "action": "get_fields",
    "params": {"field": `${fieldName}`, "offset": 0, "limit": 50000}
  })

  try {
    const responseData = await response.json();
    return responseData.result;
  } catch (e) {
    console.log('we have some problems', e)
  }
}