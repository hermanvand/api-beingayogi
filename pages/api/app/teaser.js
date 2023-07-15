import { getStoryBySlug } from '../../../lib/storyblok';

export default async function handler(req, res) {

    let status = 200;
    let data = {};

    // go
    // console.log("Go")
    try {
        data = await getStoryBySlug("practice/teaser");
    } catch (error) {
        status = 404;
        data = {};
        data.name = error.name;
        data.message = error.message;
        //console.log("ERROR: " + error.message)
    }

    res.status(status).json(data)

}
