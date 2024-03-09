import { ValantisService } from "@/services/ValantisService/ValantisService.ts";

export const fetchAllItems = async (result: string[]) => {
  const response = await ValantisService.getData({
    action: "get_items",
    params: { ids: result }
  });

  try {
    const responseData = await response.json();
    return responseData.result;
  } catch (e) {
    console.log('ошибка записи данных ', e)
  }
};
