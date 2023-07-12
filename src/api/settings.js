import axios from './index.js'

class Settings {
    getData = () => axios.get('Settings')
}

export default new Settings()