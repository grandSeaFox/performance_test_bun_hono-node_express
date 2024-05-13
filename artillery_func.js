module.exports = {
  // Generates a random query from predefined options and sets caching preference
  randomQuery: (context, events, done) => {
    const queries = [
      "MSFT",
      "AAPL",
      "GOOGL",
      "AMZN",
      "FB",
      "NFLX",
      "A",
      "IBM",
      "CSCO",
      "AA",
      "AAP",
      "MO",
      "MCD",
    ];
    const cacheOpts = ["true", "false"];
    const randomIndex = Math.floor(Math.random() * queries.length);
    const randomCacheIndex = Math.floor(Math.random() * cacheOpts.length);

    context.vars.query = queries[randomIndex];
    context.vars.cache = cacheOpts[randomCacheIndex];

    done();
  },
};
