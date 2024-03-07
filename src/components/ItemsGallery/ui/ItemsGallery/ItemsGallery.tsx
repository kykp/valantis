import {useEffect, useState} from "react";
import {Item} from "../Item/Item.tsx";
import {ProductItem} from "../../types/index.ts";

import {SkeletonItems} from "@/components/SceletonItems/SceletonItems.tsx";
import {GalleryHeader} from "../GalleryHeader/GalleryHeader.tsx";
import {fetchAllItems} from "@/hooks/useFetchAllItems.ts";

import cls from "./ItemsGallery.module.css";
import {Pagination} from "@/components/Pagination";

export const ItemsGallery = () => {
  const [uniqueProductItems, setUniqueProductItems] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const allItems = await fetchAllItems();
        setUniqueProductItems(allItems);
      } catch (error) {
        console.log("Error fetching items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  const totalItems = uniqueProductItems.length;

  return (
    <>
      <Pagination totalItems={totalItems} itemsPerPage={100}/>
      <GalleryHeader/>
      <ul className={cls.ItemsGallery}>
        {uniqueProductItems && !isLoading
          ? uniqueProductItems.map(item => <Item key={item.id} {...item}/>)
          : <SkeletonItems/>
        }
      </ul>
    </>

  )
}