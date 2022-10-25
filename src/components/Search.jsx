import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import stocks from "../db/stocks.json";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from '../redux/reducers'

export default function Search() {
  const OPTIONS_LIMIT = 10;
  const defaultFilterOptions = createFilterOptions();
  let bestMatches = [];
  const [matches, setMatches] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [inputText, setInputText] = useState('');
  const [textFieldLabel, setTextFieldLabel] = useState('Search');
  const dispatch = useDispatch();

  const filterOptions = (options, state) => {
    return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
  };

  // const FetchSearch = async () => {
  //   await axios
  //     .get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${process.env.REACT_APP_STOCKS_API_KEY}`)
  //     .then(({ data }) => {
  //       if ('bestMatches' in data) {
  //         for (let i = 0; i < data.bestMatches.length; i++) {
  //           bestMatches.push(data.bestMatches[i])
  //         }
  //         setMatches(bestMatches);
  //       }
  //     })
  // };
  // const FetchSearch = async () => {
  //   await axios
  //     .get({stocks})
  //     .then(({ data }) => {  
  //         bestMatches.push(Object.entries(data));
  //         setMatches(bestMatches);
  //       }
  //     )
  // };

  // useEffect(() => {
  //   FetchSearch();
  // }, [keyword]);

  return (
    <>
      <Autocomplete
        className="nav__search"
        PaperComponent={({ children }) => (
          <Paper style={{ background: '#02a4a4', color: 'white' }}>{children}</Paper>
        )}
        filterOptions={filterOptions}
        disablePortal
        id='stock_search'
        getOptionLabel={(stocks) => `${stocks.symbol}`}
        options={stocks}
        onChange={(event, newValue) => {
          if (newValue && newValue.symbol) {
            dispatch(setSearch(newValue.symbol));
            // console.log(newValue["1. symbol"])
          }
        }}
        inputValue={inputText}
        onInputChange={(event, newInputValue) => {
          setInputText(newInputValue);
          if (newInputValue) {
            setKeyword(newInputValue)
          }
        }}
        isOptionEqualToValue={(option, value) =>
          option.symbol === value.symbol
        }
        noOptionsText={"Please Make Sure That The Stock Name is Valid"}
        renderOption={(props, stocks) => (
          <Box style={{ display: 'flex', justifyContent: 'space-between' }} component="li" {...props} >
            <div>{stocks.symbol}</div>
            <div>{stocks.name}</div>
          </Box>
        )}
        style={{ backgroundColor: "pink !important" }}
        renderInput={(params) => <TextField
          {...params} label={textFieldLabel} variant="outlined"
          onFocus={() => setTextFieldLabel("")}
          onBlur={() => setTextFieldLabel("Search")}
        />}
        // sx={{ width: '30%' }}
      >
      </Autocomplete>

    </>
  )
}
