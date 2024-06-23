// import { useCallback, useEffect, useState } from "react";

// // since the req should not be send imediately, we add a function to wrap the req sending logic 
// async function sendHttpRequest(url, config) {
//     const response = await fetch(url, config);

//     const resData = await response.json()

//     if (!response.ok) {
//         throw new Error(
//             resData.message || "Something went wrong"
//         )
//     }

//     // if we make it passed the if block it means that all is fine and should return the resData 
//     return resData;
// }

// export default function useHttp(url, config, initialData) {
//     const [error, setError] = useState();
//     const [isLoading, setIsLoading] = useState(false);
//     const [data, setData] = useState(initialData);

//     const sendRequest = useCallback(async function sendRequest() {
//         setIsLoading(true);
//         try {
//             const resData = await sendHttpRequest(url, config);
//             setData(resData)
//         } catch (error) {
//             setError(error.message || "Somethig went wrong")
//         }
//         setIsLoading(false)
//     },[url, config]);


//     useEffect(() =>{
//         if (config && (config === 'GET' || !config.method) || !config) {
//             sendRequest();
//         }
//     }, [sendRequest, config])


//     // the idea behind this custome hook is to expose the data to whichever comp using this hook 
//     return {
//         data,
//         isLoading,
//         error,
//         sendRequest
//     }

// }











import { useCallback, useEffect, useState } from 'react';

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || 'Something went wrong, failed to send request.'
    );
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async function sendRequest() {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, config);
        setData(resData);
      } catch (error) {
        setError(error.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
}