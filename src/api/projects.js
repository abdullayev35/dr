import axios from './index.js'
class Projects {
    getProjects = params => axios.get('SelectedProjects',{params})
    getProjectsCount = params => axios.get('SelectedProjects/count',{params})
    getProject = id => axios.get(`SelectedProjects/${id}`)
}

export default new Projects()