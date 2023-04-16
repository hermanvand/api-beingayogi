import validator from 'validator';
import { getStoriesByQuery } from '../../../lib/storyblok';

/* input params
- q [string]
*/
export default async function handler(req, res) {

    let status = 200;
    let data = {};
    
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
