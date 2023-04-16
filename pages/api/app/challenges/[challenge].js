import validator from 'validator';
import { getStoriesByQuery } from '../../../../lib/storyblok';

export default async function handler(req, res) {

    let status = 200;
    let data = {};
    
    // read query
    let { challenge } = req.query;

    // clean term
    var chars = 'a-zA-Z0-9_.~:\\-\\s';
    let term = validator.whitelist(challenge, chars)

    // set params
    let params = {};
    params.starts_with = "practice/challenges/";
    params["filter_query[challenge][in]"] = term;

    // go
    // console.log("Go", params)
    try {
        data = await getStoriesByQuery(params);
    } catch (error) {
        status = 404;
        data.name = error.name;
        data.message = error.message;
        //console.log("ERROR: " + error.message)
    }

    res.status(status).json(data)
    
}
