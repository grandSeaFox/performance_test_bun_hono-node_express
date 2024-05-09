const SearchBar = () => {
  return (
    <div>
      <h1>Stock Search</h1>
      <form action="/search" method="get">
        <input type="text" name="query" placeholder="Enter a stock symbol" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
