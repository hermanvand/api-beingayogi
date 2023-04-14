import validator from 'validator';
import { getStoryById } from '../../../../lib/storyblok';

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
    // console.log("Go", cleanId, params)
    let data = await getStoryById(cleanId, params);

    res.status(200).json(data)
}
