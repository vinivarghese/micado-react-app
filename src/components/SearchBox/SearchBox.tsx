import React, { useCallback, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import { SearchQuery } from "../../common/interfaces/SearchQuery";
import "./SearchBox.css";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
// import "date-fns";
// import DateFnsUtils from "@date-io/date-fns";
// import {
// 	MuiPickersUtilsProvider,
// 	KeyboardDatePicker,
// } from "@material-ui/pickers";
// import Grid from "@material-ui/core/Grid";

interface Props {
	SetSearchQuery: (searchQuery: SearchQuery) => void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& .MuiTextField-root": {
				margin: theme.spacing(1),
				width: "25ch",
			},
		},
		button: {
			margin: theme.spacing(1),
			backgroundColor: "#66d7d1",
			padding: "10px",
			size: "medium",
		},
	})
);

const SearchBox: React.FC<Props> = ({ SetSearchQuery }) => {
	const classes = useStyles();

	const [searchString, setSearchString] = useState<string>("");
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	const onTextChangeEvent = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value;
			setSearchString(value);
		},
		[setSearchString]
	);

	const onClearSearchClickEvent = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			setSearchString("");
			const searchStringQuery: SearchQuery = {
				searchQuery: "",
			};
			SetSearchQuery(searchStringQuery);
		},
		[SetSearchQuery]
	);

	const onSearchStringClickEvent = useCallback(() => {
		const searchStringQuery: SearchQuery = {
			searchQuery: searchString,
		};
		SetSearchQuery(searchStringQuery);
	}, [SetSearchQuery, searchString]);

	const handleStartDateChange = useCallback((date) => {
		setStartDate(date);
	}, []);

	const handleEndDateChange = useCallback((date) => {
		setEndDate(date);
	}, []);

	return (
		<div className="SearchBox">
			<Box>
				<form className={classes.root} noValidate autoComplete="off">
					<Tooltip
						title="Search is available only on sub series name"
						placement="right"
					>
						<TextField
							id="outlined-basic"
							label="Enter sub series name"
							variant="outlined"
							onChange={onTextChangeEvent}
							value={searchString}
						/>
					</Tooltip>

					{/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Grid container justify="space-around">
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="MM/dd/yyyy"
							margin="normal"
							id="date-picker-inline"
							label="Date picker inline"
							value={startDate}
							onChange={handleStartDateChange}
							KeyboardButtonProps={{
								"aria-label": "change date",
							}}
						/>
						<KeyboardDatePicker
							margin="normal"
							id="date-picker-dialog"
							label="Date picker dialog"
							format="MM/dd/yyyy"
							value={endDate}
							onChange={handleEndDateChange}
							KeyboardButtonProps={{
								"aria-label": "change date",
							}}
						/>
					</Grid>
				</MuiPickersUtilsProvider> */}
				</form>

				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					endIcon={<SearchIcon />}
					onClick={onSearchStringClickEvent}
				>
					Search
				</Button>

				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					endIcon={<DeleteIcon />}
					onClick={onClearSearchClickEvent}
				>
					Clear Search
				</Button>
			</Box>
		</div>
	);
};

export default SearchBox;
