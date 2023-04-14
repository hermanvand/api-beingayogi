import validator from 'validator';
import { getStoriesByQuery } from '../../../lib/storyblok';

/* input params
- q [string]
*/
export default async function handler(req, res) {
    // read query
    let query = req.query.q || "";

    // clean term
    var chars = 'a-zA-Z0-9_.~:\\-\\s';
    let term = validator.whitelist(query, chars)

    // set params
    let params = {};
    params.starts_with = "artikel/";
    params.search_term = term;

    // go
    // console.log("Go", params)
    let data = await getStoriesByQuery(params);

    res.status(200).json(data)
}
