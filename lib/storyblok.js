import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react";

storyblokInit({
    accessToken: process.env.STORYBLOK_API_KEY,
    bridge: false,
    apiOptions: {
    cache: {
        type: 'none'
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
    // bubble up the error
    res = await storyblokApi.get("cdn/datasource_entries", params );

    return {
        entries:res.data.datasource_entries
    }

}

/* get a specific story from storyblok */
async function getStoryBySlug(slug, params) {

    params = params || {};
    params.version = "published";
    //console.log("PARAMS" + JSON.stringify(params))

    let res;
    // bubble up the error
    res = await storyblokApi.get("cdn/stories/" + slug, params );

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
    // bubble up the error
    res = await storyblokApi.get("cdn/stories", params );

    return {
        stories:res.data.stories
    }
}

export { getDatasourceEntries, getStoryBySlug, getStoriesByQuery }