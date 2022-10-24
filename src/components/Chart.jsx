import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './styles/Chart.scss';
export default function Chart() {

  const [chart, setChart] = useState([]);
  const { search } = useSelector((state) => state.searchValue);
  const chartData = []
  const [note, setNote] = useState('');
  let dataMax = 0;

  const fetchChart = async () => {
    await axios
      .get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${search}&apikey=X7Z2WNZQM80JPRHS`)
      .then(({ data }) => {
        if (data["Monthly Time Series"]) {
          for (const key in data["Monthly Time Series"]) {
            const value = parseFloat(data["Monthly Time Series"][key]["4. close"]);
            chartData.push({ "name": key, "value": value });
            if (value > dataMax) {
              dataMax = value;
            }
          }
          setNote("");
        }
        else if (data.Note) {
          setNote(data.Note)
        }
        setChart(chartData.reverse());
      })
  };

  useEffect(() => {
    fetchChart();
  }, [search]);

  return (
    <div className="chart">
      {note && <div>
        <p style={{ color: 'red', textAlign: 'center', margin: '0 5px' }}>{note}</p>
      </div>}
      <ResponsiveContainer width="100%" height={650}>
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
          <YAxis dataKey="value" type="number" domain={[0, "dataMax"]} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" />
          <Brush />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
