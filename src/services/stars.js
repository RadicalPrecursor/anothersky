import axios from 'axios'
const baseUrl = 'https://8uzg41vo47.execute-api.us-east-2.amazonaws.com/dev/anothersky-db-manager/'

const create = starData => {
    const request = axios.post(baseUrl, starData)
    return request.then(response => response.data)
}

const scan = () => {
    let contents = {
        "operation": "list",
        "tableName": "anothersky-db",
        "payload": {}
    }
    const request = axios.post(baseUrl, contents)
    return request.then(response => response.data)
}

const recall = id => {
    let recallRequest = {
        "operation": "read",
        "tableName": "anothersky-db",
        "payload": {
            "Key": {
                "id": parseInt(id)
            }
        }
    }
    const request = axios.post(baseUrl, recallRequest)
    return request.then(response => response.data)
}

export default { create, scan, recall }
