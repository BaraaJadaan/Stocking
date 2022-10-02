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
  import { useEffect, useState} from 'react'
  import {useSelector} from 'react-redux';
  import './styles/Chart.scss';
export default function Chart() {
  
    const [chart, setChart] = useState([]);
    const {search} = useSelector((state) => state.searchValue);
    const temp = []
    const [note, setNote] = useState('');
    
      const fetchChart = async () => {
        await axios
          .get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${search}&apikey=X7Z2WNZQM80JPRHS`)
          .then(({ data }) => {
            if(data["Monthly Time Series"]){
              for (const prop in data["Monthly Time Series"]) {
                temp.push(data["Monthly Time Series"][prop]);
              }
            }
            // for (const [key,value] of Object.entries(data["Monthly Time Series"])) {
            //   temp.push(value);
            // }
            else if(data.Note){
              setNote(data.Note)
            }
            
            setChart(temp)
          })
      }; 
      
      useEffect(() => {
        fetchChart();
      },[search]);
    
  return (
    <div className="chart">
      {note&&<div>
        <p style={{color:'red', textAlign:'center', margin:'0 5px'}}>{note}</p>
        </div>}
      <ResponsiveContainer width="100%" height={550}>
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
            <XAxis />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="4. close" stroke="#82ca9d" fill="#82ca9d" />
            <Brush />
          </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}
