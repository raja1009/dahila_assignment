import React,{useEffect,useState,useContext, createContext } from 'react'
import Header from '../Component/Header'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AES, enc } from 'crypto-js';
import CryptoJS from 'crypto-js'
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const DropContext = createContext();
export { DropContext };
const Home = () => {
 
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsto, setSearchResultsto] = useState([]);
  const [searchTermto, setSearchTermto] = useState('');
 


  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const fetchSuggestions = debounce(async (term) => {
    console.log("term",term)
    const payload={
      search_key:  term ,
      } 
      console.log(payload)
      const plaintextString = JSON.stringify(payload)
  
      const apiUrl = 'https://devadmin.altabooking.com/api/v2/flight/search-flight-airport';
      const apiKey = 'indusAltaR2PSM';
      const encryptionKey = 'aLtAeNCrypT';
      const cipherText =CryptoJS.AES.encrypt(plaintextString
        , encryptionKey);
       
    console.log("cipherText1",cipherText.toString())
  
      // Set up headers
      const headers = {
        apikey: apiKey,
        currency: 'U2FsdGVkX1/O0sFe9FnokQdTBRP/rRIlcPZEWbzHL9ncZwZzp/Fu/2Jnt0z8ukCA LQNDRknKwa5WdmjDRC2XA2a0gz/ZfvHeYTIq7fBZi9P4kQ7KvQYueLB2Rl4puqOTSQyBs bLGPc8cQ9KDZLMVapCruTsJcGzRnaOo1CZksLPMzmNOPqe+ePZk6UJiAUmoDS6p4JvL Cmpe0RATiqDh7g==',
      };
  
      try {
        const response = await axios.post(apiUrl, {
          request_data: cipherText.toString(),
        }, { headers });
        console.log("response",response)
        setSearchResults(response.data.main_data.data)
        setSearchResultsto(response.data.main_data.data)
    
      
      } catch (error) {
        // Handle errors
        console.error('API call error:', error);
      }
  }, 300);

  const handleChange = (e) => {
    const value = e.target.value;
      setSearchTerm(value);  
    fetchSuggestions(value);
  };

  const handleChangeTo = (e) => {
    if(searchResultsto){
      const value = e.target.value;
      setSearchTermto(value);
      fetchSuggestions(value);
    }
   
  };

  

  useEffect(() => {
  }, [searchTermto]);



  return (
    <>
     <DropContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
        searchTermto,
        setSearchTermto

      }}
    >

<Header/>
     <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
      //onSelect={handleTabClick}
    >
      <Tab eventKey="home" title="One way">
        
      <div className="searchable">
     <label>Flying from</label>
       <input list="browsers" name="browser" id="browser"  value={searchTerm}
        onChange={handleChange}/>
        <datalist id="browsers">

    {searchResults.map((result) => (
          <option key={result.id} value={result.short_name}>
            {result.short_name}
          </option>
        ))}
    </datalist>
      
    
     <label>Flying to</label>
       <input list="browsers" name="browser" id="browsers"  value={searchTermto}
        onChange={handleChangeTo}/>
        <datalist id="browsers">

    {searchResultsto.map((result) => (
          <option key={result.id} value={result.short_name}>
            {result.short_name}
          </option>
        ))}
    </datalist>
   
    </div>
   
      
      </Tab>
      <Tab eventKey="profile" title="Round-trip" disabled>
      Round-trip
      </Tab>
      <Tab eventKey="contact" title="multicity" disabled>
        multicity
      </Tab>
    </Tabs>
    </DropContext.Provider>
    
    </>
  

  )
}

export default Home