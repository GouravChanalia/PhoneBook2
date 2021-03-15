import axios from 'axios'

const url = 'http://localhost:3001/phonebook'

const getAll = () => {
    
    return axios.get(url).then(response => response.data)

}

const create = (newUser) => {

    return axios.post(url, newUser).then(response => response.data)

}

const deleteId = id => {

    return axios.delete(`${url}/${id}`).then(response => console.log(response))

}

const update = (id,updateUser) => {

    return axios.put(`${url}/${id}`, updateUser).then(response => response.data)

}

const services = {getAll, create, deleteId, update}

export default services