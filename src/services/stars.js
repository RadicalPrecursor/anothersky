import axios from 'axios'
const baseUrl = 'https://8uzg41vo47.execute-api.us-east-2.amazonaws.com/dev/anothersky-db-manager/'

const create = starData => {
    const request = axios.post(baseUrl, starData)
    return request.then(response => response.data)
}

const recall = skyName => {
    let recallRequest = {
        "operation": "recall",
        "skyName": skyName
    }
    const request = axios.post(baseUrl, recallRequest)
    return request.then(response => response.data)
}

export default { create, recall }
