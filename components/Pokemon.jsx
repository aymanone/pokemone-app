import {useState} from "react";
function Pokemon(props){
    const [comments,useComments]=useState([]);
    const pokemon=props.pokemon;
    const handleComment=(event)=>{
        if (event.key=="Enter" && event.target.value !="" ){
            let comment=event.target.value;
            event.target.value="";
            
        useComments([...comments,comment]);
        }
    }
    return (
        <>
        <h1>pokemon : {pokemon.name}</h1>
        <h2>pokemon abilities</h2>
        <ul>
        {pokemon.abilities.map((item,i)=><li key={i}>{item.ability.name}</li>)}
        </ul>
        <input type="text" onKeyDown={handleComment}></input>
        <ol>
        {comments.map((comment,i)=><li key={i}>{comment}</li>)}
        </ol>
        </>
    )

}
export default Pokemon;