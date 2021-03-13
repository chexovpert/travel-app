import React from "react";

export default () => {
  return (
    <header class="header-container">
      <nav class="header">
        <logo>
          <h1>Travel app</h1>
        </logo>
        <form>
          <input type="text" placeholder="search" />
          <button>Search</button>
        </form>

        <select>
          <option>English</option>
          <option>Russian</option>
          <option>Belarussian</option>
        </select>
      </nav>
    </header>
  );
};
