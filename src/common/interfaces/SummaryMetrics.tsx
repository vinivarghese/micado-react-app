import { Years } from "./Years";

export interface SummaryMetrics {
	totalTestsCumulative: Years;
	totalTestsByDay: Years;
	totalActiveCases: Years;
	totalDeceasedCases: Years;
	totalRecoveredCases: Years;
}
