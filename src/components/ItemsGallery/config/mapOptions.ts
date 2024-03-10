import {SelectOption} from "@/config/types.ts";
import {KeyType} from "@/services/ValantisService/ValantisService.ts";

export const mapOptions = (items: string[], key: KeyType): SelectOption[] => {
  if (!items) {
    return []
  }

  return items.map((item, index) => ({label: key === 'price' ? Number(item) : item, value: index, additionalKey: key}))
}
