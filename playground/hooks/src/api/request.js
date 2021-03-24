import {apiUrl} from '../data/urls'

// type RequestOps = {
//   path: string,
//   headers?: { [key: string]: string },
//   body?: string,
//   method?: 'GET' | 'POST' | 'DELETE'
// }

export async function request({path, headers = {'Content-Type': 'application/json'},
                                body, method= 'GET'} = {}) {
  const opts = {headers, method}
  if (body) {
    opts.body = body;
  }
  try {
    const response = await fetch(`${apiUrl}${path}`, opts);
    if (response.status < 400) {
      return response.json();
    } else {
      const error = await response.text()
      throw new Error(error ? error : `Request failed! ${response.status}, ${response.statusText}`);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}
