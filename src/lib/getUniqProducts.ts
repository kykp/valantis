import {ProductItem} from "../components/ItemsGallery/types";

export const getUniqProducts = (productItems: ProductItem[]) => {
  return  productItems && Object.values(productItems.reduce((acc: Record<string, ProductItem>, item: ProductItem) => {
    acc[item.id] = item;
    return acc;
  }, {}));
}