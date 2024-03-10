import {KeyType} from "@/services/ValantisService/ValantisService.ts";

export interface SelectOption {
  value: string | number;
  label: string | number;
  additionalKey: KeyType;
}