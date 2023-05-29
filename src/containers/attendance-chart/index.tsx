import React from 'react'
// import { useQuery } from 'react-query'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Box } from '@mui/material'
import { SEMESTER_WEEK } from '@constants/common'
// import { getClassAttendanceAnalytic } from '@services/index'
// import Loading from '@components/Loading'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type Props = {}

const AttendanceChart: React.FC<Props> = () => {
  // const { status: chartStatus, data: chartData } = useQuery(
  //   'attendance-chart',
  //   () => {
  //     return getClassAttendanceAnalytic()
  //   }
  // )

  // if (chartStatus != 'success') {
  //   return <Loading />
  // }

  // const analyticData = chartData?.data

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Ирц бүртгэлийн тойм',
      },
    },
  }

  const labels = SEMESTER_WEEK

  const data = {
    labels,
    datasets: [
      // {
      //   label: 'Ирсэн',
      //   data: analyticData?.total_present,
      //   borderColor: 'rgb(255, 99, 132)',
      //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
      // },
      // {
      //   label: 'Ирээгүй',
      //   data: analyticData?.total_absent,
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
      // {
      //   label: 'Чөлөөтэй',
      //   data: analyticData?.total_free,
      //   borderColor: 'rgb(235, 80, 152)',
      //   backgroundColor: 'rgba(235, 80, 152, 0.5)',
      // },
      // {
      //   label: 'Өвчтэй',
      //   data: analyticData?.total_sick,
      //   borderColor: 'rgb(70, 262, 135)',
      //   backgroundColor: 'rgba(70, 262, 135, 0.5)',
      // },
    ],
  }

  return (
    <Box sx={{ width: '100%', mb: 6 }}>
      <Line options={options} data={data} />
    </Box>
  )
}
export default AttendanceChart
