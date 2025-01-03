import { Title } from "@mantine/core";

import DetailCard from "./DetailCard";
import { ProjectStats } from "../types/Project";
import { formatCurrency } from "../utils";

interface FinancialSummaryProps {
  projectStats: ProjectStats | null;
}

function FinancialSummary({ projectStats }: FinancialSummaryProps) {
  const financialStats = [
    {
      label: "Total Hours",
      value: projectStats?.totalHours.toFixed(1),
      span: 6,
    },
    {
      label: "Total Revenue",
      value: projectStats?.totalRevenue
        ? formatCurrency(projectStats.totalRevenue)
        : "-",
      span: 6,
    },
    {
      label: "Total Cost",
      value: projectStats?.totalCost
        ? formatCurrency(projectStats.totalCost)
        : "-",
      span: 6,
    },
    {
      label: "Total Profit",
      value: projectStats?.totalProfit
        ? formatCurrency(projectStats.totalProfit)
        : "-",
      span: 6,
    },
  ];

  return (
    <>
      <Title order={3}>Financial Summary</Title>
      <DetailCard fields={financialStats} />
    </>
  );
}

export default FinancialSummary;
