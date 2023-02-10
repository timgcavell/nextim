export const config = {
    unstable_runtimeJS: false,
  };

  export default function handler(req, res) {
    res.send(`{
    "subject":"acct:timcavell@hachyderm.io",
    "aliases":
    [
        "https://hachyderm.io/@timcavell",
        "https://hachyderm.io/users/timcavell"
    ],
    "links":
    [
        {
            "rel":"http://webfinger.net/rel/profile-page",
            "type":"text/html",
            "href":"https://hachyderm.io/@timcavell"
        },
        {
            "rel":"self",
            "type":"application/activity+json",
            "href":"https://hachyderm.io/users/timcavell"
        },
        {
            "rel":"http://ostatus.org/schema/1.0/subscribe",
            "template":"https://hachyderm.io/authorize_interaction?uri={uri}"
        }
    ]
}`);
}
