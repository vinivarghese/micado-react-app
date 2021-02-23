export interface CsvData {
	class: string;
	category: string;
	indicator_name: string;
	series_name: string;
	sub_series_name: string;
	parameter: string;
	value: string;
	units: string;
	date_last_updated: string;
}

export interface CsvDataExtended extends CsvData {
	intValue: number;
	year?: number;
	month?: number;
}

export interface CsvDataExtendedWithRowIndex extends CsvDataExtended {
	index: number;
}
