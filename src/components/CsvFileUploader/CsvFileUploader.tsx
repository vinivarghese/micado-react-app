import React, { useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { CsvData } from "../../common/interfaces/CsvData";

interface Props {
	SetCsvDataResult: (csvData: CsvData[]) => void;
}

const useStyles = makeStyles({
	root: {
		width: "100%",
		maxWidth: 500,
		margin: "auto",
		justifyContent: "center",
		paddingTop: "10%",
		paddingBottom: "20%",
	},
});

const CsvFileUploader: React.FC<Props> = ({ SetCsvDataResult }) => {
	const classes = useStyles();

	let fileReader: FileReader;

	const handleFileRead = (e: ProgressEvent) => {
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
			SetCsvDataResult(jsonObj);
		}
	};

	const uploadCsvFile = useCallback((event) => {
		const file = event.target.files[0];
		// eslint-disable-next-line react-hooks/exhaustive-deps
		fileReader = new FileReader();
		fileReader.onloadend = handleFileRead;
		fileReader.readAsText(file);
	}, []);

	return (
		<div className={classes.root}>
			<Typography variant="h3" display="block" gutterBottom>
				Please upload your CSV input file
			</Typography>
			<div className="csv-input">
				<input type="file" accept=".csv" onChange={uploadCsvFile} />
			</div>
			<p />
		</div>
	);
};

export default CsvFileUploader;
