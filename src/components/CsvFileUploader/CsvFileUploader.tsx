import React, { useCallback, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

interface Props {}

interface CsvData {
	class: string;
	category: string;
	indicator_name: string;
	series_name: string;
	sub_series_name: string;
	parameter: string;
	value: number;
	units: string;
	date_last_updated: string;
}

const useStyles = makeStyles({
	root: {
		width: "100%",
		maxWidth: 500,
	},
});

const CsvFileUploader: React.FC<Props> = (props: Props) => {
	const [csvData, setCsvData] = useState<CsvData[]>([]);

	const classes = useStyles();

	let fileReader: FileReader;

	const handleFileRead = useCallback((e: ProgressEvent) => {
		if (fileReader.result) {
			const content = fileReader.result.toString();
			const arr = content.split("\n");
			let jsonObj: CsvData[] = [];
			const headers = arr[0].split(",");
			for (let i = 1; i < arr.length; i++) {
				let data = arr[i].split(",");
				let obj: any = {};
				for (let j = 0; j < data.length; j++) {
					obj[headers[j].trim()] = data[j].trim();
				}
				jsonObj.push(obj);
			}
			console.log(jsonObj);
			setCsvData(jsonObj);
		}
	}, []);

	const uploadCsvFile = useCallback((event) => {
		const file = event.target.files[0];
		fileReader = new FileReader();
		fileReader.onloadend = handleFileRead;
		fileReader.readAsText(file);
	}, []);

	return (
		<div className={classes.root}>
			<Typography variant="h6" display="block" gutterBottom>
				Upload CSV input file
			</Typography>
			<input
				className="csv-input"
				type="file"
				accept=".csv"
				onChange={uploadCsvFile}
			/>
			<p />
		</div>
	);
};

export default CsvFileUploader;
