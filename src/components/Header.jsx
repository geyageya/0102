import {Title } from './Title';

export const Header=()=>{
    console.log("Child1 Headerレンダリング");
  
    const header ={
      maxWidth: "900px",
      height:"auto",
      margin: "0px auto 0",
      background: "#fff",
      borderRadius: "4px",
      padding: "0px",
      textAlign: "center",
      fontSize: "14px",
      fontFamily: "Verdana, sans-serif",
      position: "relative",
  }
    return(
      <div>
        <header style={header}>
          <Title>
            かるたで学ぼう、世界200ヶ国!
          </Title>
        </header>
      </div> 
    )
  };