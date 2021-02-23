import { useState } from "react";
import { CsvDataExtended } from "../common/interfaces/CsvData";
import { SummaryTable } from "../common/interfaces/SummaryTable";
import { getSummaryTableData } from "../utils/HelperMethods";

export const useSummaryTableData = () => {
	const [isLoading, setIsLoading] = useState<Boolean>(false);
	const [error, setError] = useState<string>();
	const [summaryResult, setSummaryResult] = useState<SummaryTable>();

	const summarizeResults = (csvData: CsvDataExtended[]) => {
		try {
			setIsLoading(true);
			const summaryData = getSummaryTableData(csvData);
			setSummaryResult(summaryData);
			setError("No error");
			return summaryData;
		} catch (e) {
			setError(e);
		} finally {
			setIsLoading(false);
			return summaryResult;
		}
	};

	return { isLoading, error, summarizeResults };
};
