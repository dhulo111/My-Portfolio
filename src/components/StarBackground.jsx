import { useEffect, useState } from "react";
function Starbackground(){
  const [stars,setStars]=useState([]);
  const [meteor,setMeteor]=useState([]);
  useEffect(()=>{
    generetstar();
    generetmeteor();

    const handleresize=()=>{
      generetstar();
    }
    window.addEventListener("resize",handleresize);

    return ()=> window.removeEventListener("resize",handleresize);
  },[])
  function generetstar(){
    const numberofstar=Math.floor(window.innerWidth*window.innerHeight/10000);
    const newstar=[];
    for(let i=0;i<numberofstar;i++){
      newstar.push({
        id:i,
        size:Math.random()*3+1,
        x:Math.random()*100,
        y:Math.random()*100,
        opacity:Math.random()*0.5+0.5,
        animationDuration:Math.random()*4+2
      });
    }
    setStars(newstar);
  }
    function generetmeteor(){
      const numberofmeteor=5;
      const newmeteor=[];
      for(let i=0;i<numberofmeteor;i++){
        newmeteor.push({
          id:i,
          size:Math.random()*3+1,
          x:Math.random()*100,
          y:Math.random()*20,
          opacity:Math.random()*0.5+0.5,
          animationDuration:Math.random()*4+2
        });
    }
      setMeteor(newmeteor);
  };
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star)=>(
        <div key={star.id} className="star animate-pulse-subtle" style={{
          width:star.size+"px",
          height:star.size+"px",
          left:star.x+"%",
          top:star.y+"%",
          opacity:star.opacity,
          animationDuration:star.animationDuration+"s",
        }}></div>
      ))}

      {meteor.map((meteor)=>(
        <div key={meteor.id} className="meteor animate-meteor" style={{
          width:meteor.size*30+"px",
          height:meteor.size+"px",
          left:meteor.x+"%",
          top:meteor.y+"%",
          animationDelay:meteor.delay,
          animationDuration:meteor.animationDuration+"s",
        }}></div>
      ))}     
    </div>
  )
}

export default Starbackground;