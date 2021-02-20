import React, { useState } from "react";
import "./App.css";
import CsvDataGrid from "./components/CsvDataGrid/CsvDataGrid";
import SearchBox from "./components/SearchBox/SearchBox";
import { SearchQuery } from "./common/interfaces/SearchQuery";
import CsvFileUploader from "./components/CsvFileUploader/CsvFileUploader";
import { CsvData } from "./common/interfaces/CsvData";

function App() {
	const [searchQuery, setSearchQuery] = useState<SearchQuery>({
		searchQuery: "",
	});

	const [csvResult, setCsvResult] = useState<CsvData[]>([]);

	return (
		<div className="App">
			<SearchBox
				SetSearchQuery={(query: SearchQuery) => setSearchQuery(query)}
			/>
			{csvResult.length <= 0 && (
				<CsvFileUploader
					SetCsvDataResult={(result: CsvData[]) => setCsvResult(result)}
				/>
			)}

			{csvResult.length > 0 && (
				<CsvDataGrid
					searchQuery={searchQuery.searchQuery}
					csvResult={csvResult}
				/>
			)}
		</div>
	);
}

export default App;
