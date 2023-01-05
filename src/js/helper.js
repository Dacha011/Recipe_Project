import { TIMEOUT_SEC } from "./config.js"

// export const getJSON = async function(id){
//     try{
//         const res = await Promise.race([timeout(TIMEOUT_SEC), fetch(id)]);
//         const data = await res.json();                        
//         //throw error if res.ok is not true
//         if(!res.ok) throw new Error(`${data.message} ${res.status}`); 
//         return data; //return data, after it has been treated with .json()
//     } catch(err){
//         throw err; 
//         //how to propagate the error, so it won't be resolved in this module
//         //if we don't want for the promise to be rejected in this module, in the catch(err) block we RETHROW the error, so this async functiin
//         //will be rejected on some other place, where the getJSON f(x) has been called, in this case - model.js
//     }
// }

const timeout = function (s) { //and then   Promice.race[timeout(1),fetch(id)]
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second 💥💥💥`));
      }, s * 1000);
    });
  };


//   export const sendJSON = async function(url,uploadData) {
//     try {
//       const fetchPro = fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type' : 'application/json',   // here we specify that the data will be in JSON format
//         },
//         body: JSON.stringify(uploadData)
//       })

//         const res = await Promise.race([timeout(TIMEOUT_SEC), fetchPro]);
//         const data = await res.json();      //this will return the sent data       

//         if (!res.ok) throw new Error(`${data.message} ${res.status}`);         
//         return data; //return data, after it has been treated with .json()

//     } catch(err){
//         throw err;         
//     }
// }

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {      //ternary operator, if there is upload data 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // here we specify that the data will be in JSON format
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);  //if no upload

    const res = await Promise.race([timeout(TIMEOUT_SEC), fetchPro]);
    const data = await res.json(); //this will return the sent data

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data; //return data, after it has been treated with .json()
  } catch (err) {
    throw err;
  }
};