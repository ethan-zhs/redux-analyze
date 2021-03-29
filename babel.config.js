"use strict";
module.exports = function (api) {
    api && api.cache(true);
    return {
        "presets": [
            ["@babel/preset-env", {
                "modules": false,
                "targets": {
                    "browsers": ["> 1%", "last 2 versions", "not ie <= 8"],
                    "node": "current"
                }
            }],
            "@babel/preset-react"
        ],
        "plugins": [
            "@babel/plugin-transform-runtime",
            "@babel/plugin-transform-modules-commonjs",
            "@babel/plugin-proposal-object-rest-spread",
            ["@babel/plugin-proposal-class-properties", { "loose" : true }]
        ]
    }
}
