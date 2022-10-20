import {useEffect, useState} from 'react'
import axios, {AxiosRequestHeaders, Method} from 'axios'

// TODO: possibly add depends array in future
export function useAxios(url: string, params: { method: Method | string, headers?: AxiosRequestHeaders, data?: any }) {
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(false)

  const fetchData = async () => {
    const {method, headers, data} = params;
    return axios.request({
      url, method, headers, data
    })
      .then(res => setResponse(res.data))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    console.log('THIS IS A REFETCH!!!!');
    fetchData();
  }, []);

  useEffect(() => {
    if (reload) {
      console.log('THIS IS A RELOAD!!!!!!!!');
      const data = fetchData();
      console.log("ACTUAL DATA: " + JSON.stringify(data));
      setReload(false);
    }
  }, [reload]);

  const refetch = () => setReload(true);

  return {response, error, loading, refetch};
}
