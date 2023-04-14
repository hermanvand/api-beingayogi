import validator from 'validator';
import { getStoriesByQuery } from '../../../../lib/storyblok';

export default async function handler(req, res) {
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
    let data = await getStoriesByQuery(params);

    res.status(200).json(data)
}
