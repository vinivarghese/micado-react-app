import React, { useState } from "react";
import "./App.css";
import CsvDataGrid from "./components/CsvDataGrid/CsvDataGrid";
import SearchBox from "./components/SearchBox/SearchBox";
import { SearchQuery } from "./common/interfaces/SearchQuery";
import CsvFileUploader from "./components/CsvFileUploader/CsvFileUploader";
import { CsvData } from "./common/interfaces/CsvData";
import SummaryTableMetrics from "./components/SummaryTableMetrics/SummaryTableMetrics";
import GroupedBarChart from "./components/GroupedBarChart/GroupedBarChart";
import { SummaryTable } from "./common/interfaces/SummaryTable";

function App() {
	const [searchQuery, setSearchQuery] = useState<SearchQuery>({
		searchQuery: "",
	});

	const [csvResult, setCsvResult] = useState<CsvData[]>([]);
	const [summaryResult, setSummaryResult] = useState<SummaryTable>();

	return (
		<div className="App">
			<img
				className="Micado_Logo"
				src="https://static.wixstatic.com/media/e96df6_a23e1e0949bc4b268a3823271aadb4eb~mv2.png/v1/fill/w_460,h_98,al_c,q_85,usm_0.66_1.00_0.01/Micado%20logo_1200%20dpi.webp"
				alt="Micado Logo"
			/>

			{csvResult.length > 0 && (
				<SearchBox
					SetSearchQuery={(query: SearchQuery) => setSearchQuery(query)}
				/>
			)}
			{csvResult.length <= 0 && (
				<CsvFileUploader
					SetCsvDataResult={(result: CsvData[]) => setCsvResult(result)}
				/>
			)}

			{/* {summaryResult && <GroupedBarChart datasets={summaryResult} />} */}

			{csvResult.length > 0 && (
				<SummaryTableMetrics
					csvResult={csvResult}
					SetSummaryDataResult={(result: SummaryTable) =>
						setSummaryResult(result)
					}
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
