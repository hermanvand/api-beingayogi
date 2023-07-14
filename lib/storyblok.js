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

async function getLatestVersionFromSpace() {

    let res;
    // bubble up the error
    res = await storyblokApi.get("cdn/spaces/me" );
    // console.log("DATA:\n" + JSON.stringify(res));

    return (
        res.data.space.version
    )

}

/* get datasource entries, datasource name is in params*/
async function getDatasourceEntries(params) {

    params = params || {};
    params.version = "published";

    // get latest cache version
    let cv = 0;
    try {
        cv = await getLatestVersionFromSpace();
    } catch (error) {
        cv = 0;
    }
    // console.log("CV:\n" + cv);

    if (cv != 0) {
        params.cv = cv;
    }
    // console.log("PARAMS:\n" + JSON.stringify(params))

    let res;
    // bubble up the error
    res = await storyblokApi.get("cdn/datasource_entries", params );
    // console.log("DATA:\n" + JSON.stringify(res.data));

    return {
        entries:res.data.datasource_entries
    }

}

/* get a specific story from storyblok */
async function getStoryBySlug(slug, params) {

    params = params || {};
    params.version = "published";

    // get latest cache version
    let cv = 0;
    try {
        cv = await getLatestVersionFromSpace();
    } catch (error) {
        cv = 0;
    }
    // console.log("CV:\n" + cv);

    if (cv != 0) {
        params.cv = cv;
    }
    // console.log("PARAMS:\n" + JSON.stringify(params))

    let res;
    // bubble up the error
    res = await storyblokApi.get("cdn/stories/" + slug, params );
    // console.log("DATA:\n" + JSON.stringify(res.data));

    return {
        story:res.data.story
    }

}

/* get a list of stories, filtered by params */
async function getStoriesByQuery (params) {

    params = params || {};
    params.version = "published";

    // get latest cache version
    let cv = 0;
    try {
        cv = await getLatestVersionFromSpace();
    } catch (error) {
        cv = 0;
    }
    // console.log("CV:\n" + cv);

    if (cv != 0) {
        params.cv = cv;
    }
    // console.log("PARAMS:\n" + JSON.stringify(params))

    let res;
    // bubble up the error
    res = await storyblokApi.get("cdn/stories", params );
    // console.log("DATA:\n" + JSON.stringify(res.data));

    return {
        stories:res.data.stories
    }
}

export { getDatasourceEntries, getStoryBySlug, getStoriesByQuery }