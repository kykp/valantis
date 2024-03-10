import {generateXAuth} from "@/config/generateXAuth.ts";

const uri = 'https://api.valantis.store:41000';

const password = 'Valantis';

export type KeyType = 'product' | 'brand' | 'price';

interface Params {
  offset?: number;
  limit?: number;
  ids?: string[];
  field?: string;
  price?: number;
  brand?: string | null;
  product?: string;
}

interface RequestData {
  action: string;
  params?:Params;
}

const getParams = (requestData: RequestData) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth': generateXAuth(password),
    },
    body: JSON.stringify(requestData),
  }
}

export class ValantisService {
  static getData = (data: { action: string; params: Params }) => fetch(uri, getParams(data));
}
