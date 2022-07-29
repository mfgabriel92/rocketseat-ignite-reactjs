import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/Sidebar";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options: ApexOptions = {
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    foreColor: theme.colors.gray[500],
  },
  grid: { show: false },
  dataLabels: { enabled: false },
  tooltip: { enabled: false },
  xaxis: {
    type: "datetime",
    axisBorder: { color: theme.colors.gray[600] },
    axisTicks: { color: theme.colors.gray[600] },
    categories: [
      "2021-03-18T00:00:00.000Z",
      "2021-03-19T00:00:00.000Z",
      "2021-03-20T00:00:00.000Z",
      "2021-03-21T00:00:00.000Z",
      "2021-03-22T00:00:00.000Z",
      "2021-03-23T00:00:00.000Z",
      "2021-03-24T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.2,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series1 = [
  {
    name: "series1",
    data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 7)),
  },
];

const series2 = [
  {
    name: "series2",
    data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 7)),
  },
];

const series3 = [
  {
    name: "series2",
    data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 7)),
  },
];

function Dashboard() {
  return (
    <Flex flexDirection="column">
      <Header />
      <Flex width="100%">
        <Sidebar />
        <SimpleGrid
          flex="1"
          gap="1rem"
          minChildWidth="20rem"
          alignItems="flex-start"
          marginTop="1rem"
          height="fit-content"
          paddingX="1rem"
        >
          <Box padding="1rem" backgroundColor="gray.800" borderRadius="8px" overflow="hidden">
            <Text>Lorem ipsum</Text>
            <Chart type="area" height={160} options={options} series={series1} />
          </Box>
          <Box padding="1rem" backgroundColor="gray.800" borderRadius="8px" overflow="hidden">
            <Text>Lorem ipsum</Text>
            <Chart type="area" height={160} options={options} series={series2} />
          </Box>
          <Box padding="1rem" backgroundColor="gray.800" borderRadius="8px" overflow="hidden">
            <Text>Lorem ipsum</Text>
            <Chart type="area" height={160} options={options} series={series3} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export default Dashboard;
