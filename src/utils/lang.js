import data from '../data.json'

const res = 'test'

class Lang {
    getCurrentText = () => {
        return data[localStorage.getItem('lang') || 'en']
    }
}

export default new Lang()