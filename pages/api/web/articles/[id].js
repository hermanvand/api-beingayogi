import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react";
import validator from 'validator';

storyblokInit({
    accessToken: process.env.STORYBLOK_API_KEY,
    bridge: false,
    apiOptions: {
    cache: {
        clear: 'auto',
        type: 'memory'
    }
    },
    use: [apiPlugin]
});

const storyblokApi = getStoryblokApi();

/* zoekmogelijkheden, qeuryType=
    - all (default)
    - term
        "search_term": term
    - subject
        "filter_query[onderwerp][in]": term
*/
async function getSearchData(id) {
    let res;
    try {
        res = await storyblokApi.get("cdn/stories/" + id, { version:"published" });
        // console.log("SUCCESS!!!" + JSON.stringify(res))
    }
    catch(error) {
        // log the error
        console.log("ERROR!!!" + error)
        res = {"data":{"story":{"content":"not found","title":"not found","description":"not found"}}}
    }
    return {
        story:res.data.story
    }
}

export default async function handler(req, res) {
    // read query
    let { id } = req.query;

    // clean id
    var chars = '0-9';
    let cleanId = validator.whitelist(id, chars)

    // go
    // console.log("Go", cleanId)
    let data = await getSearchData(cleanId);

    res.status(200).json(data)
}
