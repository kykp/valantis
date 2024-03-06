import {useFetch} from "@/hooks/useFetch.ts";
import {ValantisService} from "@/services/ValantisService/ValantisService.ts";
import {useEffect, useState} from "react";
import {Item} from "../Item/Item.tsx";
import {ProductItem} from "../../types/index.ts";

import cls from "./ItemsGallery.module.css";
import {SkeletonItems} from "@/components/SceletonItems/SceletonItems.tsx";
import {GalleryHeader} from "../GalleryHeader/GalleryHeader.tsx";
import {getUniqProducts} from "@/components/ItemsGallery/lib/getUniqProducts.ts";

export const ItemsGallery = () => {
  const [productItems, setProductItems] = useState<ProductItem[]>();
  const [itemsIds, setItemsIds] = useState<string[]>();

  const [data] = useFetch({
    service: ValantisService.getData,
    params: {
      action: "get_ids",
      params: {"limit": 47}
    }
  });

  const [items, isLoading, error, fetch] = useFetch({
    service: ValantisService.getData,
    params: {
      action: 'get_items',
      params: {'ids': itemsIds},
    },
    isLazy: true,
  })

  useEffect(() => {
    data && setItemsIds(data.result);
  }, [data])

  useEffect(() => {
    itemsIds && fetch()
  }, [itemsIds]);

  useEffect(() => {
    items && setProductItems(items.result);
  }, [items]);

  const uniqueProductItems = productItems && getUniqProducts(productItems);

  return (
    <ul className={cls.ItemsGallery}>
      <GalleryHeader/>
      {uniqueProductItems
        ? uniqueProductItems.map(item => <Item key={item.id} {...item}/>)
        : <SkeletonItems/>
      }
    </ul>
  )
}