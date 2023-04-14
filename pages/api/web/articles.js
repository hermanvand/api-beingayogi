import validator from 'validator';
import { getSearchDataByQuery } from '../../../lib/storyblok';

const space = "artikel/";

/* input params
- q [string]
- type [term|subject]
*/
export default async function handler(req, res) {
    // read query
    let query = req.query.q || "";
    let queryType = req.query.type || "all"

    // clean term
    var chars = 'a-zA-Z0-9_.~:\\-\\s';
    let term = validator.whitelist(query, chars)

    // go
    // console.log("Go", term, queryType)
    let data = await getSearchDataByQuery(space, term, queryType);

    res.status(200).json(data)
}
