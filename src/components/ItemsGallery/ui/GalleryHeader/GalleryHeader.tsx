import cls from "./GalleryHeader.module.css";
import React from "react";
import {Filter} from "@/components/ItemsGallery/ui/Filter/Filter.tsx";



interface GalleryHeaderProps {
  onChange: (filter: string) => void;
}

export const GalleryHeader = (props: GalleryHeaderProps) => {
  const {onChange} = props;


  const onSetFilter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((event.target as HTMLElement).tagName === "SPAN") {
      const id = (event.target as HTMLSpanElement).id;
      onChange && onChange(id);
    }
  };

  return (
    <div className={cls.wrapper} onClick={onSetFilter}>
      <Filter/>
      <div className={cls.GalleryHeader}>
        <span className={cls.id} id='id'>Id</span>
        <span className={cls.title} id='product'>Product</span>
        <span className={cls.price} id='price'>Price</span>
        <span className={cls.brand} id='brand'>Brand</span>
      </div>
    </div>
  )
}