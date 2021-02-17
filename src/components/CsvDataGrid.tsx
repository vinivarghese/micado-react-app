import React, { useEffect, useState } from "react";
import { csv } from "d3";
import { DataGrid, Columns } from "@material-ui/data-grid";

interface Props {
	searchQuery: string;
}

interface CsvData {
	id: number;
	sepal_length: number;
	sepal_width: number;
	petal_length: number;
	petal_width: number;
	species: string;
}

const CsvDataGrid: React.FC<Props> = ({ searchQuery }) => {
	const [csvData, setCsvData] = useState<CsvData[]>([]);

	useEffect(() => {
		const fileUrl = "iris_sample.csv";
		csv(fileUrl).then((data: any) => {
			const filteredCsvData: CsvData[] = [];

			if (searchQuery) {
				const filteredResult = data.map((item: any) => {
					if (item.species.startsWith(searchQuery)) {
						filteredCsvData.push(item);
					}
					return item;
				});

				data = filteredCsvData;
			}

			const csv = data.map((item: any, index: number) => {
				item.id = index + 1;
				return item;
			});
			setCsvData(csv);
		});
	}, [searchQuery]);

	const columns: Columns = [
		{
			field: "sepal_length",
			headerName: "Sepal Length",
			type: "number",
			width: 300,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "sepal_width",
			headerName: "Sepal Width",
			type: "number",
			width: 300,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "petal_length",
			headerName: "Petal Length",
			type: "number",
			width: 300,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "petal_width",
			headerName: "Petal Width",
			type: "number",
			width: 300,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "species",
			headerName: "Species",
			width: 300,
			headerAlign: "center",
			align: "center",
		},
	];

	return (
		<div style={{ height: 400, width: "100%", textAlign: "center" }}>
			<div
				style={{ display: "flex", height: "100%", justifyContent: "center" }}
			>
				<div style={{ flexGrow: 1 }}>
					<DataGrid rows={csvData} columns={columns} />
				</div>
			</div>
		</div>
	);
};

export default CsvDataGrid;