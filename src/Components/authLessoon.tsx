import axios, { AxiosResponse } from 'axios';

interface MyData {
    lessonTitle: string;
    lessonContent: string;
  // Add more properties as needed
}
const token: string = sessionStorage.getItem('token')!;
export const postDataWithToken = async (data: MyData ): Promise<MyData> => {
  try {
    const response: AxiosResponse<MyData> = await axios.post<MyData>('https://localhost:7237/api/User/create-course', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // adjust content type as per your API requirements
      }
    });

    console.log(response.data); // Handle response data
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // You can handle errors according to your application's logic
  }
}

// Usage example
 



// postDataWithToken(data, token)
//   .then(response => {
//     console.log('response',response)
//     // Handle success
//   })
//   .catch(error => {
//     console.log('error',error)
//   });
