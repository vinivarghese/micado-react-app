import React, { useState } from "react";
import "./App.css";
import CsvDataGrid from "./components/CsvDataGrid";
import SearchBox from "./components/SearchBox/SearchBox";
import { SearchQuery } from "./common/interfaces/SearchQuery";

function App() {
	const [searchQuery, setSearchQuery] = useState<SearchQuery>({
		searchQuery: "",
	});
	return (
		<div className="App">
			<SearchBox
				SetSearchQuery={(query: SearchQuery) => setSearchQuery(query)}
			/>
			<CsvDataGrid searchQuery={searchQuery.searchQuery} />
		</div>
	);
}

export default App;
