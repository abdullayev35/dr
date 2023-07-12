import axios from "./index.js";

class News {
    getNews = () => axios.get('Blogs/langed')
    getSingleNews = id => axios.get(`Blogs/${id}`)
    getLastNews = params => axios.get('Blogs/last-langed',{params})

}

export default new News()