import {ProductItem} from "../../types/index.ts";

import cls from "./Item.module.css";

export const Item = (props: ProductItem) => {
  const {brand, id, product, price} = props;

  return (
    <li className={cls.Item}>
      <span className={cls.id}> {id}</span>
      <span className={cls.title}> {product}</span>
      <span className={cls.price}>{price}</span>
      <span className={cls.brand}>{brand}</span>
    </li>
  )
}