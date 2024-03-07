import {generateXAuth} from "@/config/generateXAuth.ts";

const uri = 'https://api.valantis.store:41000';

const password = 'Valantis';

interface RequestData {
  action: string;
  params: {
    offset?: number;
    limit?: number;
    ids?: string[];
  };
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
  static getData = (data:RequestData) => fetch(uri, getParams(data));
}
