import React, { useEffect, useState } from "react";
import { DataGrid, Columns } from "@material-ui/data-grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { CsvData } from "../../common/interfaces/CsvData";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./CsvDataGrid.css";
import { RemoveNullRowsFromCsvData } from "../../utils/HelperMethods";

interface Props {
	searchQuery: string;
	csvResult: CsvData[];
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			"& > * + *": {
				marginTop: theme.spacing(2),
			},
		},
	})
);

const CsvDataGrid: React.FC<Props> = ({ searchQuery, csvResult }) => {
	const [csvData, setCsvData] = useState<CsvData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const classes = useStyles();

	useEffect(() => {
		setIsLoading(true);
		let resultSet = RemoveNullRowsFromCsvData(csvResult);
		const filteredCsvData: CsvData[] = [];

		if (searchQuery) {
			// eslint-disable-next-line
			const filteredResult = resultSet.map((item: any) => {
				if (
					item.sub_series_name
						.toLowerCase()
						.startsWith(searchQuery.toLowerCase())
				) {
					filteredCsvData.push(item);
				}
				return item;
			});

			resultSet = filteredCsvData;
		}

		const csv = resultSet.map((item: any, index: number) => {
			item.id = index + 1;
			return item;
		});
		setCsvData(csv);

		setIsLoading(false);
	}, [csvResult, searchQuery]);

	const columns: Columns = [
		{
			field: "class",
			headerName: "Class",
			width: 200,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "category",
			headerName: "Category",
			width: 200,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "indicator_name",
			headerName: "Indicator Name",
			width: 200,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "series_name",
			headerName: "Series Name",
			width: 200,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "sub_series_name",
			headerName: "Sub Series Name",
			width: 200,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "parameter",
			headerName: "Parameter",
			width: 200,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "value",
			headerName: "Value",
			width: 200,
			type: "number",
			headerAlign: "center",
			align: "center",
		},
		{
			field: "units",
			headerName: "Units",
			width: 200,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "date_last_updated",
			headerName: "Date Last Updated",
			width: 200,
			headerAlign: "center",
			align: "center",
		},
	];

	return (
		<div className="Data-Grid">
			<Box borderBottom={1}>
				{isLoading && (
					<div className={classes.root}>
						<LinearProgress color="primary" />
					</div>
				)}

				<Typography variant="h5" display="block" gutterBottom>
					Uploaded input data
				</Typography>
				<div
					className="CsvDataGrid"
					style={{ height: 400, width: "100%", textAlign: "center" }}
				>
					<div
						style={{
							display: "flex",
							height: "100%",
							justifyContent: "center",
						}}
					>
						<div style={{ flexGrow: 1 }}>
							<DataGrid rows={csvData} columns={columns} />
						</div>
					</div>
				</div>
			</Box>
		</div>
	);
};

export default CsvDataGrid;
