import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from '../redux/reducers'

export default function Search() {
  let bestMatches = [];
  const [matches, setMatches] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [inputText, setInputText] = useState('');
  const [textFieldLabel, setTextFieldLabel] = useState('Search');
  const dispatch = useDispatch();

  const FetchSearch = async () => {
    await axios
      .get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=9H2WKPRIVEUYXYGL`)
      .then(({ data }) => {
        if ('bestMatches' in data) {
          for (let i = 0; i < data.bestMatches.length; i++) {
            bestMatches.push(data.bestMatches[i])
          }
          setMatches(bestMatches);
        }
      })
  };

  useEffect(() => {
    FetchSearch();
  }, [keyword]);

  return (
    <>
      <Autocomplete
        className="nav__search"
        PaperComponent={({ children }) => (
          <Paper style={{ background: '#02a4a4', color: 'white' }}>{children}</Paper>
        )}
        disablePortal
        id='stock_search'
        getOptionLabel={(matches) => `${matches["1. symbol"]}`}
        options={matches}
        onChange={(event, newValue) => {
          if (newValue && newValue["1. symbol"]) {
            dispatch(setSearch(newValue["1. symbol"]));
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
          option["1. symbol"] === value["1. symbol"]
        }
        noOptionsText={"Please Make Sure That The Stock Name is Valid"}
        renderOption={(props, matches) => (
          <Box style={{ display: 'flex', justifyContent: 'space-between' }} component="li" {...props} >
            <div>{matches["1. symbol"]}</div>
            <div>{matches["2. name"]}</div>
          </Box>
        )}
        style={{ backgroundColor: "pink !important" }}
        renderInput={(params) => <TextField
          {...params} label={textFieldLabel} variant="outlined"
          onFocus={() => setTextFieldLabel("")}
          onBlur={() => setTextFieldLabel("Search")}
        />}
        sx={{ width: '60%' }}
      >
      </Autocomplete>

    </>
  )
}
