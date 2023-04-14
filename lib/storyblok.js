import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react";

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

/* get datasource entries, datasource name is in params*/
async function getDatasourceEntries(params) {

    params = params || {};
    params.version = "published";
    //console.log("PARAMS" + JSON.stringify(params))

    let res;
    try {
        res = await storyblokApi.get("cdn/datasource_entries", params );
        // console.log("SUCCESS!!!" + JSON.stringify(res))
    }
    catch(error) {
        // log the error
        console.log("ERROR!!!" + error)
        res = {"data":{"datasource_entries":[]}}
    }
    return {
        entries:res.data.datasource_entries
    }
}

/* get a specific item from storyblok */
async function getSearchDataById(id, params) {

    params = params || {};
    params.version = "published";
    //console.log("PARAMS" + JSON.stringify(params))

    let res;
    try {
        res = await storyblokApi.get("cdn/stories/" + id, params );
        // console.log("SUCCESS!!!" + JSON.stringify(res))
    }
    catch(error) {
        // log the error
        console.log("ERROR!!!" + error)
        res = {"data":{"story":{}}}
    }
    return {
        story:res.data.story
    }
}

/* zoekmogelijkheden, qeuryType=
    - all (default)
    - term
        "search_term": term
    - subject
        "filter_query[onderwerp][in]": term
    - challenge
        "filter_query[challenge][in]": term
*/
async function getSearchDataByQuery (space, term, queryType) {

    let params = {};
    params.starts_with = space;
    params.version = "published";

    switch (queryType) {
        case "term":
            params.search_term = term;
            break;
        case "subject":
            params["filter_query[onderwerp][in]"] = term;
            break;
        case "challenge":
            params["filter_query[challenge][in]"] = term;
            break;
    }
    // console.log("PARAMS" + JSON.stringify(params))

    let res;
    try {
        res = await storyblokApi.get("cdn/stories", params );
        // console.log("SUCCESS!!!" + JSON.stringify(res))
    }
    catch(error) {
        // log the error
        console.log("ERROR!!!" + error)
        res = {"data":{"stories":[]}}
    }
    return {
        stories:res.data.stories
    }
}

export { getDatasourceEntries, getSearchDataById, getSearchDataByQuery }