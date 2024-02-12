import {useRef,useState} from "react";
import {useQuery} from "react-query";
import Pokemon from "/components/Pokemon.jsx";
function Search(props){
    let storedSearches=useRef({});
    const inputRef=useRef("");
    const pokemonRef=useRef({pokemon:undefined,id:0});
    const [searchState,useSearchState]=useState({isPokemon:false,msg:"search for any pokemon"});
    const {data,status,error,refetch}=useQuery('pokemonData', () =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputRef.current.value}`).then(res =>{
      if(res.ok){return res.json();}
      throw new Error("something wrong")
     
    }
      
    ),
    {enabled:false}
  )
    const handleSearch= async()=>{
        let query=inputRef.current.value.trim();
        query=query.toLowerCase();
       if (query in storedSearches.current){
         pokemonRef.current.pokemon=storedSearches.current[query];
         pokemonRef.current.id+=1;
         inputRef.current.value="";
         useSearchState({isPokemon:true,msg:"search for any pokemon"});
        }
        else{
        const {data,isError}= await refetch().then((data)=>data);
        if(data && (!isError)){
          console.log(!isError);
          pokemonRef.current.pokemon=data;
          storedSearches.current[query]=data;
          pokemonRef.current.id+=1;
          inputRef.current.value="";
          useSearchState({isPokemon:true,msg:"search for any pokemon"});

        }
        else{

          useSearchState({isPokemon:false,msg:"sorry an error has occured try again"});
          
      
        }
      }
       
         
        
    }
    return (
        <>
        <h1> {searchState.msg} </h1>
        <input type="text" placeholder="type pokemon name" ref={inputRef} >
        </input>
        <button onClick={handleSearch}> search</button>
        {searchState.isPokemon? <Pokemon pokemon={pokemonRef.current.pokemon} key={pokemonRef.current.id}/>:""}
        </>
    )


}
export default Search;