import {
	createStyles,
	LinearProgress,
	makeStyles,
	Theme,
} from "@material-ui/core";
import { ColDef, DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { CsvData } from "../../common/interfaces/CsvData";
import { SummaryTable } from "../../common/interfaces/SummaryTable";
import { useSummaryTableData } from "../../Hooks/useSummaryTableData";
import {
	RemoveNullRowsFromCsvData,
	GetCsvExtendedData,
} from "../../utils/HelperMethods";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./SummaryTableMetrics.css";

interface Props {
	csvResult: CsvData[];
	SetSummaryDataResult: (summaryData: SummaryTable) => void;
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

const SummaryTableMetrics: React.FC<Props> = ({
	csvResult,
	SetSummaryDataResult,
}) => {
	const { isLoading, error, summarizeResults } = useSummaryTableData();
	const [summaryData, setSummaryData] = useState<SummaryTable>();
	const classes = useStyles();

	useEffect(
		() => {
			const removedNullCsvData = RemoveNullRowsFromCsvData(csvResult);
			const csvExtendedResult = GetCsvExtendedData(removedNullCsvData);
			const data = summarizeResults(csvExtendedResult);
			if (error === "No error") {
				setSummaryData(data);
				if (data) {
					SetSummaryDataResult(data);
				}
			}
		},
		// eslint-disable-next-line
		[error]
	);

	const columns: ColDef[] = [
		{
			field: "monthAndYear",
			headerName: "Month and Year",
			width: 230,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "testsByDay",
			headerName: "Test By Day",
			width: 230,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "testsCumulative",
			headerName: "Total Tests Cumulative",
			width: 230,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "activeCases",
			headerName: "Active Cases",
			width: 230,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "deceasedCases",
			headerName: "Deceased Cases",
			width: 230,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "recoveredCases",
			headerName: "Recovered Cases",
			width: 230,
			headerAlign: "center",
			align: "center",
		},
	];

	const rows = [
		{
			id: 1,
			monthAndYear: "March 2020",
			testsByDay: summaryData?.March2020.testsByDay,
			testsCumulative: summaryData?.March2020.testsCumulative,
			activeCases: summaryData?.March2020.activeCases,
			deceasedCases: summaryData?.March2020.deceasedCases,
			recoveredCases: summaryData?.March2020.recoveredCases,
		},
		{
			id: 2,
			monthAndYear: "April 2020",
			testsByDay: summaryData?.April2020.testsByDay,
			testsCumulative: summaryData?.April2020.testsCumulative,
			activeCases: summaryData?.April2020.activeCases,
			deceasedCases: summaryData?.April2020.deceasedCases,
			recoveredCases: summaryData?.April2020.recoveredCases,
		},
		{
			id: 3,
			monthAndYear: "May 2020",
			testsByDay: summaryData?.May2020.testsByDay,
			testsCumulative: summaryData?.May2020.testsCumulative,
			activeCases: summaryData?.May2020.activeCases,
			deceasedCases: summaryData?.May2020.deceasedCases,
			recoveredCases: summaryData?.May2020.recoveredCases,
		},
		{
			id: 4,
			monthAndYear: "June 2020",
			testsByDay: summaryData?.June2020.testsByDay,
			testsCumulative: summaryData?.June2020.testsCumulative,
			activeCases: summaryData?.June2020.activeCases,
			deceasedCases: summaryData?.June2020.deceasedCases,
			recoveredCases: summaryData?.June2020.recoveredCases,
		},
		{
			id: 5,
			monthAndYear: "July 2020",
			testsByDay: summaryData?.July2020.testsByDay,
			testsCumulative: summaryData?.July2020.testsCumulative,
			activeCases: summaryData?.July2020.activeCases,
			deceasedCases: summaryData?.July2020.deceasedCases,
			recoveredCases: summaryData?.July2020.recoveredCases,
		},
		{
			id: 6,
			monthAndYear: "August 2020",
			testsByDay: summaryData?.August2020.testsByDay,
			testsCumulative: summaryData?.August2020.testsCumulative,
			activeCases: summaryData?.August2020.activeCases,
			deceasedCases: summaryData?.August2020.deceasedCases,
			recoveredCases: summaryData?.August2020.recoveredCases,
		},
		{
			id: 7,
			monthAndYear: "September 2020",
			testsByDay: summaryData?.September2020.testsByDay,
			testsCumulative: summaryData?.September2020.testsCumulative,
			activeCases: summaryData?.September2020.activeCases,
			deceasedCases: summaryData?.September2020.deceasedCases,
			recoveredCases: summaryData?.September2020.recoveredCases,
		},
		{
			id: 8,
			monthAndYear: "October 2020",
			testsByDay: summaryData?.October2020.testsByDay,
			testsCumulative: summaryData?.October2020.testsCumulative,
			activeCases: summaryData?.October2020.activeCases,
			deceasedCases: summaryData?.October2020.deceasedCases,
			recoveredCases: summaryData?.October2020.recoveredCases,
		},
		{
			id: 9,
			monthAndYear: "November 2020",
			testsByDay: summaryData?.November2020.testsByDay,
			testsCumulative: summaryData?.November2020.testsCumulative,
			activeCases: summaryData?.November2020.activeCases,
			deceasedCases: summaryData?.November2020.deceasedCases,
			recoveredCases: summaryData?.November2020.recoveredCases,
		},
		{
			id: 10,
			monthAndYear: "December 2020",
			testsByDay: summaryData?.December2020.testsByDay,
			testsCumulative: summaryData?.December2020.testsCumulative,
			activeCases: summaryData?.December2020.activeCases,
			deceasedCases: summaryData?.December2020.deceasedCases,
			recoveredCases: summaryData?.December2020.recoveredCases,
		},
		{
			id: 11,
			monthAndYear: "January 2021",
			testsByDay: summaryData?.January2021.testsByDay,
			testsCumulative: summaryData?.January2021.testsCumulative,
			activeCases: summaryData?.January2021.activeCases,
			deceasedCases: summaryData?.January2021.deceasedCases,
			recoveredCases: summaryData?.January2021.recoveredCases,
		},
		{
			id: 12,
			monthAndYear: "February 2021",
			testsByDay: summaryData?.February2021.testsByDay,
			testsCumulative: summaryData?.February2021.testsCumulative,
			activeCases: summaryData?.February2021.activeCases,
			deceasedCases: summaryData?.February2021.deceasedCases,
			recoveredCases: summaryData?.February2021.recoveredCases,
		},
	];

	return (
		<div className="Summary_Table_Outer">
			<div className="Summary_Table_Inner">
				<Box borderBottom={1}>
					{isLoading && (
						<div className={classes.root}>
							<LinearProgress color="primary" />
						</div>
					)}
					<Typography variant="h5" display="block" gutterBottom>
						Detailed breakdown of data
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
								<DataGrid rows={rows} columns={columns} />
							</div>
						</div>
					</div>
				</Box>
			</div>
		</div>
	);
};

export default SummaryTableMetrics;
