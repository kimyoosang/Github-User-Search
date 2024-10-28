import axios, { AxiosError } from 'axios'

interface GitHubErrorResponse {
  message: string
  documentation_url?: string
}

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 5000,
  headers: {
    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<GitHubErrorResponse>) => {
    if (error.response) {
      return Promise.reject({
        statusCode: error.response.status,
        message: error.response.data?.message || 'Unknown Error',
      })
    }
    return Promise.reject({
      statusCode: 503,
      message: 'No response from server',
    })
  },
)

export { axiosInstance }
