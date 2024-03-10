import Select from "react-select";
import React, {useEffect, useState} from "react";

import {SelectOption} from "@/config/types.ts";
import cls from "./Filter.module.css";
import {fetchAllItems} from "@/lib/fetchAllItems.ts";
import {mapOptions} from "@/components/ItemsGallery/config/mapOptions.ts";
import {fetchOptions} from "@/lib/fetchOptions.ts";
import {getUniqIds} from "@/lib/getUniqIds.ts";

const removeDuplicates = (arr: string[]): string[] => {
  return [...new Set(arr)];
};

export const Filter = () => {
  const [productOption, setProductOptions] = useState<SelectOption[]>();
  const [priceOptions, setPriceOptions] = useState<SelectOption[]>();
  const [brandOptions, setBrandOptions] = useState<SelectOption[]>();

  const [isLoadingOptions, setIsLoadingOptions] = useState(true);

  const [selectedOption, setSelectedOption] = useState<SelectOption>();


  useEffect(() => {
    const fetchIds = async () => {
      setIsLoadingOptions(true);
      const productsName = await fetchOptions('product');
      const uniqProductsName = getUniqIds(productsName);
      const productsOptions = mapOptions(uniqProductsName)
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
      const priceOptions = mapOptions(uniqPrices)
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
      const brandOptions = mapOptions(uniqBrands)
      setBrandOptions(brandOptions)
      setIsLoadingOptions(false)
    }
    fetchIds();
  }, []);



  const handleChange = (value: SelectOption | null) => {
    if(value){
      setSelectedOption(value);
    }
  };

  return (
    <div className={cls.Filter}>
      <h2 className={cls.label}>Filters</h2>
     <div className={cls.filter__items}>
       <div className={cls.filter__item}>
         <label htmlFor="product" className={cls.label}>Product</label>
         <Select
           placeholder={'product'}
           defaultValue={selectedOption}
           onChange={handleChange}
           options={productOption}
           name={'product'}
           isDisabled={isLoadingOptions}
         />
       </div>
       <div className={cls.filter__item}>
       <label htmlFor="price" className={cls.label}>Price</label>
       <Select
         placeholder={'price'}
         defaultValue={selectedOption}
         onChange={handleChange}
         options={priceOptions}
         name={'price'}
         isDisabled={isLoadingOptions}
       />
       </div>
       <div className={cls.filter__item}>
       <label htmlFor="brand" className={cls.label}>Brand</label>
       <Select
         placeholder={'brand'}
         defaultValue={selectedOption}
         onChange={handleChange}
         options={brandOptions}
         name={'brand'}
         isDisabled={isLoadingOptions}
       />
       </div>
     </div>
    </div>
  )
}