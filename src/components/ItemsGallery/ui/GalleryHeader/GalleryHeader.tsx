import cls from "./GalleryHeader.module.css";

export const GalleryHeader = () => {
  return (
    <div className={cls.GalleryHeader}>
      <span className={cls.id}>Id</span>
      <span className={cls.title}>Product</span>
      <span className={cls.price}>Price</span>
      <span className={cls.brand}>Brand</span>
    </div>
  )
}