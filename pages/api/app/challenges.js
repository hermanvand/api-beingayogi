//import { getDatasourceEntries } from '../../../lib/storyblok';
import { getStoriesByQuery } from '../../../lib/storyblok';

export default async function handler(req, res) {

    let status = 200;
    let data = {};

    // read query
    let query = req.query.uuids || "";

    // clean uuids, only allow uuid's, seperated by ','
    var chars = 'a-fA-F0-9_,\\-';
    let uuids = validator.whitelist(query, chars)

    // set params
    let params = {};
    //params.datasource = "challenges"
    params.starts_with = "practice/challenges/";
    params.is_startpage = 1;
    if (uuids != "") {
        params.by_uuids = uuids;
    }

    // go
    // console.log("Go", params)
    try {
        //data = await getDatasourceEntries(params);
        data = await getStoriesByQuery(params);
    } catch (error) {
        status = 404;
        data.name = error.name;
        data.message = error.message;
        //console.log("ERROR: " + error.message)
    }

    res.status(status).json(data)

}