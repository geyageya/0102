
export const Title=(props)=>{
    console.log("Child 2 Titleレンダリング");
    const title= {
      color: "#979797",
    }
    return(
      <h1 
        style={title}
      >
        {props.children}
      </h1>
    )
  }