import axios from "./index.js"

class Certificates {
    getCertificates = () => axios.get('Certificates')
}

export default new Certificates()