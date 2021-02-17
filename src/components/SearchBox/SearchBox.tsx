import React, { useCallback, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import { SearchQuery } from "../../common/interfaces/SearchQuery";
import "./SearchBox.css";
import Tooltip from "@material-ui/core/Tooltip";

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

	return (
		<div className="SearchBox">
			<img
				className="Micado_Logo"
				src="https://static.wixstatic.com/media/e96df6_a23e1e0949bc4b268a3823271aadb4eb~mv2.png/v1/fill/w_460,h_98,al_c,q_85,usm_0.66_1.00_0.01/Micado%20logo_1200%20dpi.webp"
				alt="Micado Logo"
			/>

			<form className={classes.root} noValidate autoComplete="off">
				<Tooltip
					title="Search is available only on string columns"
					placement="right"
				>
					<TextField
						id="outlined-basic"
						label="Enter search string"
						variant="outlined"
						onChange={onTextChangeEvent}
						value={searchString}
					/>
				</Tooltip>
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
		</div>
	);
};

export default SearchBox;
