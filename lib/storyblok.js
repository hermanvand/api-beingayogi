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
    catch (error) {
        // log the error
        console.log("ERROR!!!" + error)
        res = {"data":{"datasource_entries":[]}}
    }
    return {
        entries:res.data.datasource_entries
    }
}

/* get a specific story from storyblok */
async function getStoryById(id, params) {

    params = params || {};
    params.version = "published";
    //console.log("PARAMS" + JSON.stringify(params))

    let res;
    try {
        res = await storyblokApi.get("cdn/stories/" + id, params );
        // console.log("SUCCESS!!!" + JSON.stringify(res))
    }
    catch (error) {
        // log the error
        console.log("ERROR!!!" + error)
        res = {"data":{"story":{}}}
    }
    return {
        story:res.data.story
    }
}

/* get a list of stories, filtered by params */
async function getStoriesByQuery (params) {

    params = params || {};
    params.version = "published";
    //console.log("PARAMS" + JSON.stringify(params))

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

export { getDatasourceEntries, getStoryById, getStoriesByQuery }