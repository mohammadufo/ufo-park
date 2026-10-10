// Vercel Function entry. Every route is rewritten here (see vercel.json) and
// handed to the Nest app compiled by `nest build`, so the Nest CLI plugins
// for GraphQL and Swagger are applied exactly as in a normal build.
module.exports = require('../dist/src/serverless').default
