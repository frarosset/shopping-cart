import Heading from "../Generic/Heading.jsx";

function SearchMain({ className = "" }) {
  return (
    <main className={className}>
      <header>
        <Heading>Search</Heading>
      </header>
    </main>
  );
}

export default SearchMain;
