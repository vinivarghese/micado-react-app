import React, { useEffect, useRef, useState } from "react";
import { SummaryTable } from "../../common/interfaces/SummaryTable";
import {
	select,
	scaleBand,
	axisBottom,
	axisLeft,
	scaleLinear,
	stack,
	max,
	stackOrderAscending,
	scaleOrdinal,
	Axis,
	ScaleBand,
	interpolateBrBG,
	quantize,
} from "d3";
import { ConvertSummaryObjectIntoRows } from "../../utils/HelperMethods";
import Typography from "@material-ui/core/Typography";
import "./GroupedBarChart.css";

interface Props {
	datasets: SummaryTable;
}

const GroupedBarChart: React.FC<Props> = ({ datasets }) => {
	const dataRows = ConvertSummaryObjectIntoRows(datasets);
	const properties: string[] = Object.getOwnPropertyNames(dataRows[0]);
	const allKeys = properties.slice(2);
	const groupKey = properties[0];

	const [keys, setKeys] = useState(allKeys);
	const svgRef = useRef(null);
	const wrapperRef = useRef(null);

	const colors: any = {
		testsByDay: "#98abc5",
		testsCumulative: "#8a89a6",
		activeCases: "#7b6888",
		deceasedCases: "#6b486b",
		recoveredCases: "#a05d56",
	};

	useEffect(() => {
		const svg = select(svgRef.current);
		const height = 500;
		const width = 900;
		const margin = { top: 20, right: 30, bottom: 30, left: 40 };

		const x0 = scaleBand()
			.domain(dataRows.map((d: any) => d[groupKey]))
			.rangeRound([margin.left, width - margin.right])
			.paddingInner(0.1);

		const x1 = scaleBand()
			.domain(keys)
			.rangeRound([0, x0.bandwidth()])
			.padding(0.05);

		const y = scaleLinear()
			.domain(dataRows.map((d: any) => d.y))
			.nice()
			.rangeRound([height - margin.bottom, margin.top]);

		const xAxis = (g: any) =>
			g
				.attr("transform", `translate(0,${height - margin.bottom})`)
				.call(axisBottom(x0).tickSizeOuter(0))
				.call((g: any) => g.select(".domain").remove());

		const yAxis = (g: any) =>
			g
				.attr("transform", `translate(${margin.left},0)`)
				.call(axisLeft(y).ticks(null, "s"))
				.call((g: any) => g.select(".domain").remove())
				.call((g: any) =>
					g
						.select(".tick:last-of-type text")
						.clone()
						.attr("x", 3)
						.attr("text-anchor", "start")
						.attr("font-weight", "bold")
						.text(dataRows.y)
				);

		const color = scaleOrdinal()
			.domain(keys)
			.range(quantize(interpolateBrBG, keys.length));
		svg
			.append("g")
			.selectAll("g")
			.data(dataRows)
			.join("g")
			.attr("transform", (d: any) => `translate(${x0(d[groupKey])},0)`)
			.selectAll("rect")
			.data((d: any) => keys.map((key) => ({ key, value: d[key] })))
			.join("rect")
			// .attr("x", (d) => {
			// 	if (d && d.key) {
			// 		return x1(d.key);
			// 	} else {
			// 		return "boolean";
			// 	}
			// })
			.attr("y", (d) => y(d.value))
			.attr("width", x1.bandwidth())
			.attr("height", (d) => y(0) - y(d.value));
		// .attr("fill", (d) => color(d.key));

		svg.append("g").call(xAxis);

		svg.append("g").call(yAxis);
	}, [datasets]);

	return (
		<div className="Bar_Chart">
			<Typography variant="h5" display="block" gutterBottom>
				Summary of your data
			</Typography>
			<React.Fragment>
				<div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
					<svg ref={svgRef}>
						<g className="x-axis" />
						<g className="y-axis" />
					</svg>
				</div>

				<div className="fields">
					{allKeys.map((key) => (
						<div key={key} className="field">
							<input
								id={key}
								type="checkbox"
								checked={keys.includes(key)}
								onChange={(e) => {
									if (e.target.checked) {
										setKeys(Array.from(new Set([...keys, key])));
									} else {
										setKeys(keys.filter((_key) => _key !== key));
									}
								}}
							/>
							<label htmlFor={key} style={{ color: colors[key] }}>
								{key
									.split(/(?=[A-Z])/)
									.join(" ")
									.toUpperCase()}
							</label>
						</div>
					))}
				</div>
			</React.Fragment>
		</div>
	);
};

export default GroupedBarChart;
