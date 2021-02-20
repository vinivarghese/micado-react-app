import React, { useEffect, useState } from "react";
// import { csv } from "d3";
import { DataGrid, Columns } from "@material-ui/data-grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { CsvData } from "../../common/interfaces/CsvData";

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
		let resultSet = csvResult;
		const filteredCsvData: CsvData[] = [];

		if (searchQuery) {
			// eslint-disable-next-line
			const filteredResult = resultSet.map((item: any) => {
				if (item.species.startsWith(searchQuery)) {
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
		<div>
			{isLoading && (
				<div className={classes.root}>
					<LinearProgress color="primary" />
				</div>
			)}
			<div
				className="CsvDataGrid"
				style={{ height: 400, width: "100%", textAlign: "center" }}
			>
				<div
					style={{ display: "flex", height: "100%", justifyContent: "center" }}
				>
					<div style={{ flexGrow: 1 }}>
						<DataGrid rows={csvData} columns={columns} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CsvDataGrid;
