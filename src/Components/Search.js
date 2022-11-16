import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL,options } from "../api";


const Search = ({onSearchChange}) =>{
    
    const [term,setTerm] = useState('');
    
    const handleChange = (e) =>{
        setTerm(e);
        onSearchChange(e);
    }

    const loadOptions = (input) =>{
        return fetch(`${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${input}`, options)
        .then(response => response.json())
        .then(response => {
            return {
                options : response.data.map((city)=>{
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`
                    }
                })
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <AsyncPaginate 
        placeholder="Enter City"
        debounceTimeout={600}
        value={term} 
        onChange={handleChange}
        loadOptions = {loadOptions}
        />
    );
}
export default Search;