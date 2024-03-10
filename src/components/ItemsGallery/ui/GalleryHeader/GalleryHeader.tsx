import cls from "./GalleryHeader.module.css";
import React from "react";
import {Filter} from "@/components/ItemsGallery/ui/Filter/Filter.tsx";
import {SelectOption} from "@/config/types.ts";

interface GalleryHeaderProps {
  onChange: (filter: SelectOption) => void;
}

export const GalleryHeader = React.memo((props: GalleryHeaderProps) => {
  const {onChange} = props;

  return (
    <div className={cls.wrapper}>
      <Filter onChange={onChange}/>
      <div className={cls.GalleryHeader}>
        <span className={cls.id}>Id</span>
        <span className={cls.title}>Product</span>
        <span className={cls.price}>Price</span>
        <span className={cls.brand}>Brand</span>
      </div>
    </div>
  )
})