import axios from "./index.js"

class Constants{

    getSafety = () => axios.get('Constants/safety-langed')
    getCareer = () => axios.get('Constants/career-langed')

    getAbout = () => axios.get('Constants/about-us-langed')
}

export default new Constants()