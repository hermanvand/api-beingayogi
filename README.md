Being a Yogi API
================

api.beingayogi.org

this api exposes
- articles
- articles?q=search_term
- articles/{slug}

- subjects
- subjects/{subject}

- challenges
  - get 'is_startpage' pages of all challenges
- challenges?uuids=list_of_uuids
  - get 'is_startpage' pages of a set of challenges
- challenges/{challenge}
  - get all pages of a specific challenge
- challenges/{challenge}/{slug}
  - get a specific page of a specific challenge

- teaser

- news