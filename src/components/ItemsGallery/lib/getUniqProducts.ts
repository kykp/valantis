import {ProductItem} from "../types/index.ts";

export const getUniqProducts = (productItems: ProductItem[]) => {
  return  productItems && Object.values(productItems.reduce((acc: Record<string, ProductItem>, item: ProductItem) => {
    acc[item.id] = item;
    return acc;
  }, {}));
}