import axios from 'axios'

export const enum FetchStatus {
   Loading = 'loading',
   Resolved = 'resolved',
   Rejected = 'rejected',
}

export const newAxios = axios.create({
   baseURL: 'https://blog.kata.academy/api/',
   timeout: 3000,
})
