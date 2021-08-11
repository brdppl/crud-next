import axios from 'axios'
import { env } from '../environments/env'

const list = async (): Promise<any> => {
    // return new Promise<any>((resolve, reject) => {
    //     axios.get(`${env.baseUrl}/news`)
    //     .then((res: any) => {
    //         resolve(res)
    //     })
    //     .catch((err: any) => {
    //         reject(err)
    //     })
    // })

    try {
        return await axios.get(`${env.baseUrl}/news`)
    } catch(err) {
        throw err
    }
}

const create = async (data: any): Promise<any> => {
    try {
        return await axios.post(`${env.baseUrl}/news`, data)
    } catch(err) {
        throw err
    }
}

const update = async (id: string, data: any): Promise<any> => {
    try {
        return await axios.put(`${env.baseUrl}/news/${id}`, data)
    } catch(err) {
        throw err
    }
}

const remove = async (id: string): Promise<any> => {
    try {
        return await axios.delete(`${env.baseUrl}/news/${id}`)
    } catch(err) {
        throw err
    }
}

export { list, create, update, remove }