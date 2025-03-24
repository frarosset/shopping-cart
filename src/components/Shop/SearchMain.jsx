import Heading from "../Generic/Heading.jsx";
import { useState } from "react";
import Input from "../Form/Input.jsx";

function SearchMain({ className = "" }) {
  const [query, setQuery] = useState("");

  return (
    <main className={className}>
      <header>
        <Heading>Search</Heading>
      </header>
      <Input
        id="query"
        name="query"
        value={query}
        setValue={setQuery}
        type="search"
        maxLength={50}
        placeholder="What are you looking for?"
      />
    </main>
  );
}

export default SearchMain;
