import {SelectOption} from "@/config/types.ts";

export const mapOptions = (items: string[]): SelectOption[] => {
  if (!items) {
    return []
  }
  return items.map((item, index) => ({label: item, value: index}))
}
