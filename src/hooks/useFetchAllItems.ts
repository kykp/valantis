import { ValantisService } from "@/services/ValantisService/ValantisService.ts";
import { getUniqProducts } from "@/lib/getUniqProducts.ts";
import { ProductItem } from "@/components/ItemsGallery/types";

export const fetchAllItems = async () => {
  const allItems: ProductItem[] = [];
  const limit = 100;

  try {
    let offset = 0;
    let hasMoreData = true;

    while (hasMoreData) {
      const response = await ValantisService.getData({
        action: "get_ids",
        params: { offset, limit }
      });

      const responseData = await response.json();
      const result = responseData.result;
      if (result.length < limit) {
        // Если больше нет данных, выходим из цикла
        hasMoreData = false;
      } else {
        // Добавляем полученные элементы к общему списку
        const response = await ValantisService.getData({
          action: "get_items",
          params: { ids: result }
        });

        const responseData = await response.json();
        const items = responseData.result;
        allItems.push(...items);

        // Увеличиваем смещение для следующего запроса
        offset += limit;
      }
    }
  } catch (error) {
    console.error("Error fetching items:", error);
  }

  return getUniqProducts(allItems);
};
