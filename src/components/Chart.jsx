import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
  import axios from 'axios';
  import { useEffect, useState} from 'react'
  import {useSelector} from 'react-redux';
  import './styles/Chart.scss';
export default function Chart() {
  
    let temp = [];
    let temp1 = [];
    const [chart, setChart] = useState('');
    const [chart1, setChart1] = useState('');
    const {search} = useSelector((state) => state.searchValue);
    
    
    useEffect(() => {
        fetchChart();
      },[search]);
    
      const fetchChart = async () => {
        await axios
          .get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${search}&outputsize=compact&apikey=2J87TY3KKGLCJ9OG`)
          .then(({ data }) => {
            
            for (const [key, value] of Object.entries(data["Monthly Time Series"])) {
                temp.push(value);
              }
            for (const [key, value] of Object.entries(data["Monthly Time Series"])) {
                temp1.push(parseFloat(value["4. close"]));
              }
              setChart(temp)
              setChart1(temp1)
              // console.log(search);
          })
      }; 
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height={500}>
          <AreaChart
            width={500}
            height={200}
            data={chart}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="4. close" stroke="#82ca9d" fill="#82ca9d" />
            <Brush />
          </AreaChart>
        </ResponsiveContainer>
     {console.log(search)}
     {console.log(chart1)}
    </div>
  )
}