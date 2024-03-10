import {useEffect, useState} from "react";
import {Item} from "../Item/Item.tsx";
import {GalleryHeader} from "../GalleryHeader/GalleryHeader.tsx";
import {ProductItem} from "../../types/index.ts";

import {Pagination} from "@/components/Pagination";
import {SkeletonItems} from "@/components/SceletonItems/SkeletonItems.tsx";
import {fetchAllItems} from "@/lib/fetchAllItems.ts";

import cls from "./ItemsGallery.module.css";
import {SkeletonPagination} from "@/components/SceletonItems/SkeletonPagination.tsx";
import {fetchAllIds} from "@/lib/fetchAllIds.ts";
import {fetchFilteredIds} from "@/lib/fetchFilteredIds.ts";

export const ItemsGallery = () => {
  const [uniqIds, setUniqIds] = useState<string[]>([]);
  const [isLoadingIds, setIsLoadingIds] = useState(true);
  const [isLoadingItems, setIsLoadingItems] = useState(true)

  const [showedIds, setShowedIds] = useState<ProductItem[]>();
  const [filter, setFilter] = useState();

  const itemsPerPage = 50;

  // useEffect(() => {
  //   const fetchIds = async () => {
  //     setUniqIds(await fetchAllIds({setLoading: setIsLoadingIds}));
  //   }
  //   fetchIds();
  // }, []);
  //
  // useEffect(() => {
  //   const fetchFilteredItems = async () => {
  //     await fetchFilteredIds();
  //   }
  //   fetchFilteredItems();
  // }, []);

  const totalItems = uniqIds.length;

  const onChangePage = async (page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredIds = uniqIds.slice(startIndex, endIndex);
    setIsLoadingItems(true);
    setShowedIds(await fetchAllItems(filteredIds));
    setIsLoadingItems(false);
  }

  const onHandleFilterChange = (filter: string) => {
    filter && setFilter(filter);
  }

  return (
    <>
      {!isLoadingIds
        ? <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} onChange={onChangePage}/>
        : <SkeletonPagination/>
      }
      <GalleryHeader onChange={onHandleFilterChange}/>
      <ul className={cls.ItemsGallery}>
        {showedIds && !isLoadingItems
          ? showedIds.map(item => <Item key={item.id} {...item}/>)
          : <SkeletonItems/>
        }
      </ul>
    </>

  )
}