import { CsvData, CsvDataExtended } from "../common/interfaces/CsvData";
import { subSeriesName, SummaryTable } from "../common/interfaces/SummaryTable";

export const ChangeDateFormat = (date: string) => {
	const dateArray = date.split("/");
	const formattedDate = `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`;
	return new Date(formattedDate);
};

export const GetCsvExtendedData = (csvData: CsvData[]) => {
	const csvDataExtended = csvData.map((item) => {
		const date = ChangeDateFormat(item.parameter);
		const data: CsvDataExtended = {
			class: item.class,
			category: item.category,
			indicator_name: item.indicator_name,
			series_name: item.series_name,
			sub_series_name: item.sub_series_name,
			parameter: item.parameter,
			month: date.getMonth(),
			year: date.getFullYear(),
			value: item.value,
			intValue: parseInt(item.value) | 0,
			units: item.units,
			date_last_updated: item.date_last_updated,
		};
		return data;
	});
	return csvDataExtended;
};

export const RemoveNullRowsFromCsvData = (csvData: CsvData[]) => {
	const result = csvData.filter((item) => item.class);
	return result;
};

export const ConvertStringToInt = (value: string) => {
	const result = parseInt(value);
	if (Number.isInteger(result)) {
		return result;
	} else {
		return 0;
	}
};

export const SumOfSubSeriesWithYearAndMonth = (
	csvData: CsvDataExtended[],
	subSeriesName: string,
	year: number,
	month: number
) => {
	const result = csvData.filter(
		(item) =>
			item.sub_series_name === subSeriesName &&
			item.year === year &&
			item.month === month
	);
	const total = result.reduce((a, b) => {
		return a + b.intValue;
	}, 0);
	return total;
};

export const getMonthlySummaryTableData = (
	csvData: CsvDataExtended[],
	month: number,
	year: number
) => {
	const result: subSeriesName = {
		testsByDay: SumOfSubSeriesWithYearAndMonth(
			csvData,
			"Tests by day",
			year,
			month
		),
		testsCumulative: SumOfSubSeriesWithYearAndMonth(
			csvData,
			"Total tests (cumulative)",
			year,
			month
		),
		activeCases: SumOfSubSeriesWithYearAndMonth(csvData, "Active", year, month),
		deceasedCases: SumOfSubSeriesWithYearAndMonth(
			csvData,
			"Deceased",
			year,
			month
		),
		recoveredCases: SumOfSubSeriesWithYearAndMonth(
			csvData,
			"Recovered",
			year,
			month
		),
	};
	return result;
};

export const getSummaryTableData = (csvData: CsvDataExtended[]) => {
	const summaryData: SummaryTable = {
		March2020: getMonthlySummaryTableData(csvData, 2, 2020),
		April2020: getMonthlySummaryTableData(csvData, 3, 2020),
		May2020: getMonthlySummaryTableData(csvData, 4, 2020),
		June2020: getMonthlySummaryTableData(csvData, 5, 2020),
		July2020: getMonthlySummaryTableData(csvData, 6, 2020),
		August2020: getMonthlySummaryTableData(csvData, 7, 2020),
		September2020: getMonthlySummaryTableData(csvData, 8, 2020),
		October2020: getMonthlySummaryTableData(csvData, 9, 2020),
		November2020: getMonthlySummaryTableData(csvData, 10, 2020),
		December2020: getMonthlySummaryTableData(csvData, 11, 2020),
		January2021: getMonthlySummaryTableData(csvData, 0, 2021),
		February2021: getMonthlySummaryTableData(csvData, 1, 2021),
	};

	return summaryData;
};

export const GenerateRowIndexForList = (csvData: CsvDataExtended[]) => {
	const result = csvData.map((item: any, index: number) => {
		item.index = index + 1;
		return item;
	});
	return result;
};

export const ConvertSummaryObjectIntoRows = (summaryData: SummaryTable) => {
	const data: any = [
		{
			id: 1,
			monthNameAndYear: "March 2020",
			testsByDay: summaryData.March2020.testsByDay,
			testsCumulative: summaryData.March2020.testsCumulative,
			activeCases: summaryData.March2020.activeCases,
			deceasedCases: summaryData.March2020.deceasedCases,
			recoveredCases: summaryData.March2020.recoveredCases,
		},
		{
			id: 2,
			monthNameAndYear: "April 2020",
			testsByDay: summaryData.April2020.testsByDay,
			testsCumulative: summaryData.April2020.testsCumulative,
			activeCases: summaryData.April2020.activeCases,
			deceasedCases: summaryData.April2020.deceasedCases,
			recoveredCases: summaryData.April2020.recoveredCases,
		},
		{
			id: 3,
			monthNameAndYear: "May 2020",
			testsByDay: summaryData.May2020.testsByDay,
			testsCumulative: summaryData.May2020.testsCumulative,
			activeCases: summaryData.May2020.activeCases,
			deceasedCases: summaryData.May2020.deceasedCases,
			recoveredCases: summaryData.May2020.recoveredCases,
		},
		{
			id: 4,
			monthNameAndYear: "June 2020",
			testsByDay: summaryData.June2020.testsByDay,
			testsCumulative: summaryData.June2020.testsCumulative,
			activeCases: summaryData.June2020.activeCases,
			deceasedCases: summaryData.June2020.deceasedCases,
			recoveredCases: summaryData.June2020.recoveredCases,
		},
		{
			id: 5,
			monthNameAndYear: "July 2020",
			testsByDay: summaryData.July2020.testsByDay,
			testsCumulative: summaryData.July2020.testsCumulative,
			activeCases: summaryData.July2020.activeCases,
			deceasedCases: summaryData.July2020.deceasedCases,
			recoveredCases: summaryData.July2020.recoveredCases,
		},
		{
			id: 6,
			monthNameAndYear: "August 2020",
			testsByDay: summaryData.August2020.testsByDay,
			testsCumulative: summaryData.August2020.testsCumulative,
			activeCases: summaryData.August2020.activeCases,
			deceasedCases: summaryData.August2020.deceasedCases,
			recoveredCases: summaryData.August2020.recoveredCases,
		},
		{
			id: 7,
			monthNameAndYear: "September 2020",
			testsByDay: summaryData.September2020.testsByDay,
			testsCumulative: summaryData.September2020.testsCumulative,
			activeCases: summaryData.September2020.activeCases,
			deceasedCases: summaryData.September2020.deceasedCases,
			recoveredCases: summaryData.September2020.recoveredCases,
		},
		{
			id: 8,
			monthNameAndYear: "October 2020",
			testsByDay: summaryData.October2020.testsByDay,
			testsCumulative: summaryData.October2020.testsCumulative,
			activeCases: summaryData.October2020.activeCases,
			deceasedCases: summaryData.October2020.deceasedCases,
			recoveredCases: summaryData.October2020.recoveredCases,
		},
		{
			id: 9,
			monthNameAndYear: "November 2020",
			testsByDay: summaryData.November2020.testsByDay,
			testsCumulative: summaryData.November2020.testsCumulative,
			activeCases: summaryData.November2020.activeCases,
			deceasedCases: summaryData.November2020.deceasedCases,
			recoveredCases: summaryData.November2020.recoveredCases,
		},
		{
			id: 10,
			monthNameAndYear: "December 2020",
			testsByDay: summaryData.December2020.testsByDay,
			testsCumulative: summaryData.December2020.testsCumulative,
			activeCases: summaryData.December2020.activeCases,
			deceasedCases: summaryData.December2020.deceasedCases,
			recoveredCases: summaryData.December2020.recoveredCases,
		},
		{
			id: 11,
			monthNameAndYear: "January 2021",
			testsByDay: summaryData.January2021.testsByDay,
			testsCumulative: summaryData.January2021.testsCumulative,
			activeCases: summaryData.January2021.activeCases,
			deceasedCases: summaryData.January2021.deceasedCases,
			recoveredCases: summaryData.January2021.recoveredCases,
		},
		{
			id: 12,
			monthNameAndYear: "February 2020",
			testsByDay: summaryData.February2021.testsByDay,
			testsCumulative: summaryData.February2021.testsCumulative,
			activeCases: summaryData.February2021.activeCases,
			deceasedCases: summaryData.February2021.deceasedCases,
			recoveredCases: summaryData.February2021.recoveredCases,
		},
	];

	return data;
};
