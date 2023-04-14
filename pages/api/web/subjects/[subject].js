import validator from 'validator';
import { getStoriesByQuery } from '../../../../lib/storyblok';

export default async function handler(req, res) {
    // read query
    let { subject } = req.query;

    // clean term
    var chars = 'a-zA-Z0-9_.~:\\-\\s';
    let term = validator.whitelist(subject, chars)

    // set params
    let params = {};
    params.starts_with = "artikel/";
    params["filter_query[onderwerp][in]"] = term;
    
    // go
    // console.log("Go", params)
    let data = await getStoriesByQuery(params);

    res.status(200).json(data)
}
