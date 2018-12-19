/*
 * Copyright (C) 2018-present Arctic Ice Studio <development@arcticicestudio.com>
 * Copyright (C) 2018-present Sven Greb <development@svengreb.de>
 *
 * Project:    Nord Docs
 * Repository: https://github.com/arcticicestudio/nord-docs
 * License:    MIT
 */

/**
 * @file The Gatsby configuration.
 * @author Arctic Ice Studio <development@arcticicestudio.com>
 * @author Sven Greb <development@svengreb.de>
 * @see https://gatsbyjs.org/docs/gatsby-config
 * @since 0.1.0
 */

const { metadataNord, metadataNordDocs } = require("./src/data/project");
const { sourceInstanceTypes } = require("./src/config/internal/nodes");
const {
  BASE_DIR_CONTENT,
  BASE_DIR_ASSETS_IMAGES,
  BASE_DIR_CONFIG,
  BASE_DIR_PAGES,
  GOOGLE_UNIVERSAL_ANALYTICS_TRACKING_ID
} = require("./src/config/internal/constants");
const { BASE_PUBLIC_URL } = require("./src/config/routes/constants");

module.exports = {
  siteMetadata: {
    nord: { ...metadataNord },
    ...metadataNordDocs
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-remove-trailing-slashes",
    "gatsby-plugin-no-sourcemaps",
    "gatsby-transformer-yaml",
    "gatsby-plugin-svgr",
    {
      resolve: "gatsby-plugin-canonical-urls",
      options: {
        siteUrl: `${BASE_PUBLIC_URL}`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/${BASE_DIR_ASSETS_IMAGES}`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `${sourceInstanceTypes.blog.id}`,
        path: `${__dirname}/${BASE_DIR_CONTENT}/${sourceInstanceTypes.blog.path}/`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "config",
        path: `${__dirname}/${BASE_DIR_CONFIG}/`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `${sourceInstanceTypes.docs.id}`,
        path: `${__dirname}/${BASE_DIR_CONTENT}/${sourceInstanceTypes.docs.path}/`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/${BASE_DIR_PAGES}/`
      }
    },
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        /* The tracking IDs for all used "Google Marketing" products. */
        trackingIds: [GOOGLE_UNIVERSAL_ANALYTICS_TRACKING_ID],
        /* The configuration that gets passed to the `gtag.js`'s `config` command. */
        /* eslint-disable-next-line babel/camelcase */
        gtagConfig: { anonymize_ip: true },
        pluginConfig: {
          /*
           * Put the `gtag.js` tracking script in the HTML `<head>` instead of the `<body>` as recommended by Google.
           *
           * @see https://developers.google.com/analytics/devguides/collection/gtagjs
           */
          head: true,
          /*
           * Respect the 'Do Not Track' HTTP header.
           *
           * @see https://en.wikipedia.org/wiki/Do_Not_Track
           */
          respectDNT: true
        }
      }
    },
    /* NOTE: The following plugins must be listed last in this array to work properly! */
    "gatsby-plugin-netlify"
  ]
};
