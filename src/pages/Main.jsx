import AppBar from '../components/AppBar';
import Chart from '../components/Chart';
import News from '../components/News';
import Grid from '@mui/material/Grid';
export default function Main() {
  return (
    <div>
        <AppBar/>
        <Grid container >
          <Grid xs={9}>
            <Chart/>
          </Grid>
          <Grid xs={3}>
            <News/>
          </Grid>
        </Grid>
    </div>
  )
}