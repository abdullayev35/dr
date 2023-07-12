import axios from "./index.js";

class Service{
    getServices = () => axios.get('/OurServices')
    getService = id => axios.get(`/OurServices/${id}`)
}

export default new Service()