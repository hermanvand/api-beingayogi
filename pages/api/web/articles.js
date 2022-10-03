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
async function getSearchData(term, queryType) {
    let res;
    try {
        switch (queryType) {
            case "term":
                res = await storyblokApi.get("cdn/stories", { search_term:term, starts_with:"artikel", version:"published" });
                break;
            case "subject":
                res = await storyblokApi.get("cdn/stories", { "filter_query[onderwerp][in]":term, starts_with:"artikel", version:"published" });
                break;
            default:
                res = await storyblokApi.get("cdn/stories", { starts_with:"artikel", version:"published" });
                break;
        }
    }
    catch(error) {
        // log the error
        console.log("ERROR!!!" + error)
        res = {"data":{"story":{"content":"not found","title":"not found","description":"not found"}}}
    }
    return {
        stories:res.data.stories
    }
}

export default async function handler(req, res) {
    // read query
    let query = req.query.q || "";
    let queryType = req.query.type || "all"

    // clean term
    var chars = 'a-zA-Z0-9_.~:\\-\\s';
    let term = validator.whitelist(query, chars)

    // go
    let data = await getSearchData(term, queryType);

    res.status(200).json(data)
}
