import { useEffect, useState } from "react"


export default function Main() {
  const [memeclass,setmemeclass]= useState({
    imgurl:"http://i.imgflip.com/1bij.jpg",
    topText:"One does not simply",
    bottomText:"Walk into Mordor"

  })
  const[meme,setmeme]=useState([]);
  useEffect(()=>{

        fetch("https://api.imgflip.com/get_memes").then(res=>res.json()).then((items)=> setmeme(items.data.memes)
            
        );
        
      },[])
  function handleonChange(event){
    const {value}= event.currentTarget
    setmemeclass((prevmeme)=>({
      ...prevmeme,
      topText:value,
    }));
  }
  function getmemeimg(){
    const randomnum = Math.floor(Math.random()*meme.length)
    const imgurl1 = meme[randomnum].url;
    setmemeclass(prevMeme=>({...prevMeme,imgurl:imgurl1}))
  }
    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleonChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                    />
                </label>
                <button onClick={getmemeimg}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={memeclass.imgurl} />
                <span className="top">{memeclass.topText}</span>
                <span className="bottom">{memeclass.bottomText}</span>
            </div>
        </main>
    )
}