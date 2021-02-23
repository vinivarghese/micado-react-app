export interface subSeriesName {
	testsByDay: number;
	testsCumulative: number;
	activeCases: number;
	deceasedCases: number;
	recoveredCases: number;
}

export interface SummaryTable {
	March2020: subSeriesName;
	April2020: subSeriesName;
	May2020: subSeriesName;
	June2020: subSeriesName;
	July2020: subSeriesName;
	August2020: subSeriesName;
	September2020: subSeriesName;
	October2020: subSeriesName;
	November2020: subSeriesName;
	December2020: subSeriesName;
	January2021: subSeriesName;
	February2021: subSeriesName;
}
