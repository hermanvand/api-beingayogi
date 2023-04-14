import { getDatasourceEntries } from '../../../lib/storyblok';

export default async function handler(req, res) {
    // set params
    let params = {};
    params.datasource = "subjects"

    // go
    // console.log("Go", params)
    let data = await getDatasourceEntries(params);

    res.status(200).json(data)
}
