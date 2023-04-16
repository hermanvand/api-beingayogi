import { getDatasourceEntries } from '../../../lib/storyblok';

export default async function handler(req, res) {

    let status = 200;
    let data = {};

    // set params
    let params = {};
    params.datasource = "subjects"

    // go
    // console.log("Go", params)
    try {
        data = await getDatasourceEntries(params);
    } catch (error) {
        status = 404;
        data.name = error.name;
        data.message = error.message;
        //console.log("ERROR: " + error.message)
    }

    res.status(status).json(data)

}
