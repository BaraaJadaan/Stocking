import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {setSearch} from '../redux/reducers'

export default function Search () {
    let temp = [];
    // let value = '';
    const [matches, setMatches] = useState('');
    const [keyword, setKeyword] = useState();
    const dispatch = useDispatch();
    const FetchSearch = async () => {
        await axios
          .get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=2J87TY3KKGLCJ9OG`)
          .then(({ data }) => {
            if(keyword){
            for(let i = 0; i<data.bestMatches.length; i++)
            {temp.push(data.bestMatches[i])}}
             setMatches(temp)
          })
      }; 

  useEffect(() => {
    FetchSearch();
  },[keyword]);

  return (
    <>
        <Autocomplete
            className="nav__search"
            disablePortal
            id='stock_search'
            getOptionLabel={(matches) => `${matches["1. symbol"]}`}
            options={matches}
            onChange={(event, newValue) => {
              dispatch(setSearch(newValue["1. symbol"]));
              }}
            // value={value}
            inputValue={keyword}
            onInputChange={(event, newInputValue) => {setKeyword(newInputValue)}}
            isOptionEqualToValue={(option, value) =>
                option["1. symbol"] === value["1. symbol"]
            }
            renderOption={(props, matches) =>(
                <Box style={{display:'flex', justifyContent:'space-between'}} component="li" {...props} >
                    <div>{matches["1. symbol"]}</div>
                    <div>{matches["2. name"]}</div>
                </Box>
            )}
            renderInput={(params) => <TextField {...params} label="Search" />}
            sx={{ width: '50%' }}
            >
        </Autocomplete> 
    </>
  )
}
