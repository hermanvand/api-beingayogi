import validator from 'validator';
import { getSearchDataByQuery } from '../../../../lib/storyblok';

const space = "practice/challenges/";
const queryType = "challenge"

export default async function handler(req, res) {
    // read query
    let { challenge } = req.query;

    // clean term
    var chars = 'a-zA-Z0-9_.~:\\-\\s';
    let term = validator.whitelist(challenge, chars)

    // go
    // console.log("Go", term, queryType)
    let data = await getSearchDataByQuery(space, term, queryType);

    res.status(200).json(data)
}
