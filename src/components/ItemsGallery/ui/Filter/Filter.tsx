import Select from "react-select";
import React, {useEffect, useState} from "react";

import {SelectOption} from "@/config/types.ts";
import cls from "./Filter.module.css";
import {mapOptions} from "@/components/ItemsGallery/config/mapOptions.ts";
import {fetchOptions} from "@/lib/fetchOptions.ts";
import {getUniqIds} from "@/lib/getUniqIds.ts";

const removeDuplicates = (arr: string[]): string[] => {
  return [...new Set(arr)];
};

interface FilterProps {
  onChange: (filter: SelectOption) => void;
}
export const Filter = React.memo((props: FilterProps) => {
  const { onChange } = props;

  const [productOption, setProductOptions] = useState<SelectOption[]>();
  const [priceOptions, setPriceOptions] = useState<SelectOption[]>();
  const [brandOptions, setBrandOptions] = useState<SelectOption[]>();

  const [isLoadingOptions, setIsLoadingOptions] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState<SelectOption | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<SelectOption | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<SelectOption | null>(null);


  const handleSelectChange = (value: SelectOption | null, selectName: string) => {
    onChange && value && onChange(value);

    switch (selectName) {
      case 'product':
        setSelectedProduct(value);
        setSelectedPrice(null);
        setSelectedBrand(null);
        break;
      case 'price':
        setSelectedPrice(value);
        setSelectedProduct(null);
        setSelectedBrand(null);
        break;
      case 'brand':
        setSelectedBrand(value);
        setSelectedProduct(null);
        setSelectedPrice(null);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchIds = async () => {
      setIsLoadingOptions(true);
      const productsName = await fetchOptions('product');
      const uniqProductsName = getUniqIds(productsName);
      const productsOptions = mapOptions(uniqProductsName, 'product')
      setProductOptions(productsOptions)
      setIsLoadingOptions(false)
    }
    fetchIds();
  }, []);

  useEffect(() => {
    const fetchIds = async () => {
      setIsLoadingOptions(true);
      const prices = await fetchOptions('price');
      const uniqPrices = getUniqIds(prices);
      const priceOptions = mapOptions(uniqPrices, 'price')
      setPriceOptions(priceOptions)
      setIsLoadingOptions(false);
    }
    fetchIds();
  }, []);

  useEffect(() => {
    const fetchIds = async () => {
      setIsLoadingOptions(true);
      const brands = await fetchOptions('brand');
      const filteredBrands = brands.filter((el: string | null) => !!el);
      const uniqBrands = removeDuplicates(filteredBrands);
      const brandOptions = mapOptions(uniqBrands, 'brand')
      setBrandOptions(brandOptions)
      setIsLoadingOptions(false)
    }
    fetchIds();
  }, []);


  return (
    <div className={cls.Filter}>
      <h2 className={cls.label}>Filters</h2>
     <div className={cls.filter__items}>
       <div className={cls.filter__item}>
         <label htmlFor="product" className={cls.label}>Product</label>
         <Select
           placeholder={'product'}
           value={selectedProduct}
           onChange={(value) => handleSelectChange(value, 'product')}
           options={productOption}
           name={'product'}
           isDisabled={isLoadingOptions}
         />
       </div>
       <div className={cls.filter__item}>
       <label htmlFor="price" className={cls.label}>Price</label>
       <Select
         placeholder={'price'}
         value={selectedPrice}
         onChange={(value) => handleSelectChange(value, 'price')}
         options={priceOptions}
         name={'price'}
         isDisabled={isLoadingOptions}
       />
       </div>
       <div className={cls.filter__item}>
       <label htmlFor="brand" className={cls.label}>Brand</label>
       <Select
         placeholder={'brand'}
         value={selectedBrand}
         onChange={(value) => handleSelectChange(value, 'brand')}
         options={brandOptions}
         name={'brand'}
         isDisabled={isLoadingOptions}
       />
       </div>
     </div>
    </div>
  )
})