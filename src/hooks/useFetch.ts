import {useEffect, useState} from 'react';

interface useFetchArgs {
  service: any,
  params?: any,
  isLazy?: boolean
  defaultState?: any
}

export const useFetch = (props: useFetchArgs) => {
    const {
      service,
      params,
      isLazy = false,
      defaultState = null,
    } = props;

    const [data, setData] = useState(defaultState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetch = async () => {
      try {
        setIsLoading(true);

        const res = await service(params);
        if (res !== null) {
          if (res.status === 200) {
            const responseData = await res.json();
            setData(responseData);
          } else {
            throw new Error();
          }
        }
      } catch (e) {
        setError(e);

      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      if (!isLazy) {
        fetch();
      }
    }, []);

    return [data, isLoading, {info: error, hasError: Boolean(error)}, fetch];
  }
;
