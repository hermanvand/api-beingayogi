import validator from 'validator';
import { getSearchDataById } from '../../../../../lib/storyblok';

export default async function handler(req, res) {

    //console.log("REQ" + JSON.stringify(req.query))

    // read query
    let { id, resolve_relations } = req.query;
    let params = {};

    if (resolve_relations) {
        params.resolve_relations = resolve_relations;
    }

    // clean id
    var chars = '0-9';
    let cleanId = validator.whitelist(id, chars)

    // go
    // console.log("Go", cleanId)
    let data = await getSearchDataById(cleanId, params);

    res.status(200).json(data)
}
