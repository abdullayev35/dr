import axios from "./index.js"

class Contact {
    sendMessage = (data) => axios.post("Contacts",data)
}

export default new Contact()