import validator from 'validator';
import { getStoryBySlug } from '../../../../lib/storyblok';

export default async function handler(req, res) {

    let status = 200;
    let data = {};

    // read query
    //console.log("REQ" + JSON.stringify(req.query))
    let { slug, resolve_relations } = req.query;
    let params = {};

    if (resolve_relations) {
        params.resolve_relations = resolve_relations;
    }

    // clean slug
    // translate a--b--c to a/b/c
    slug = slug.replace(/\-\-/g, "/")
    // rfc 3986: unreserved chars = ALPHA / DIGIT / "-" / "." / "_" / "~"
    // add "/" because it is the path in de slug
    var chars = 'a-zA-Z0-9\\-._~\\/';
    let cleanSlug = validator.whitelist(slug, chars)

    // go
    // console.log("Go", cleanSlug, params)
    try {
        if (! slug.startsWith('artikel/')) {
            throw({'name':'handler error', 'message':'not a valid slug'});
        }

        data = await getStoryBySlug(cleanSlug, params);

    } catch (error) {
        status = 404;
        data.name = error.name;
        data.message = error.message;
        //console.log("ERROR: " + error.message)
    }

    res.status(status).json(data)

}
