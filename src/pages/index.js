import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import { Footer } from '../components/Footer'

//nextJs対応
//audioを if (process.browser) { }で囲む
    

import {useState, useEffect,useRef, useCallback, memo} from "react";


const RadioBtn =(props) => {
  return(
    <div>
      <input 
        type="radio" 
        id={props.id}
        name={props.name} 
        value={props.value}
        onChange={props.onChange}
      />
      <label 
        htmlFor={props.htmlFor}
      >
        {props.text}
      </label>
    </div>
  )
}




const Header=memo(()=>{
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
});

const Title=memo((props)=>{
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
});

const Button =memo((props) =>{
  console.log("Child1 Buttonレンダリング");
  const button ={
    width: "100px",
    padding: "8px",
    borderRradius: "8px",
    textAlign: "center",
    color: "white",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "20px",
    display: "block",
    //Props用
    background: props.background,
    cursor: props.cursor,
  }
  return(
    <button 
      style={button} 
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
});

// const Furigana =(props) => {
//   const furigana ={
//     fontSize : "13px",
//   }

//   return(
//     <>
//   <p 
//     style={furigana}
//   >
//     {props.children}
//   </p>
//   </>
//   )
// };

const ClueBox =memo((props) => {
  console.log("Child1 CluBoxレンダリング");
  const clueBox ={
    width: "80%",
    margin: "40px 3%",
  }
  return(
    <div 
      style={clueBox}
    >
      <input 
        type="text"
        size="100"
        placeholder = "ここに読み句が表示されます"
        //props用
        defaultValue={props.placeholder}
      />
    </div>
  )
});

const PlayArea =memo((props) => {
  console.log("Child1 PlayAreaレンダリング");
  const playArea = {
    height: "750px",
    margin: "0 auto",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    /* flexで絵札一覧を中央に配置 */
    display:"flex",
    justifyContent: "center",
    position: "relative",
    //差し込み用(props)
    backgroundImage: props.backgroundImage, 
  }
  return(
    <main style={playArea}>
      <ListCards
        //const CardGrid用
        karutaLists={props.karutaLists}
        isAnswered = {props.isAnswered}
        //handleClick用(useState)
        basicLists={props.basicLists}
        currentTurn={props.currentTurn}
        score={props.score}
        setIsAnswered={props.setIsAnswered}
        setIsPopup={props.setIsPopup}
        setScore={props.setScore}
        setIsScored={props.setIsScored}
        //handleClick用(関数実行)
        stopTimer={props.stopTimer}
        playEffect={props.playEffect}
        placeHand={props.placeHand}
        pcPlayer={props.pcPlayer}
        // onClick={() =>props.handleClick()} 
      />
      {/* player用 */}
      <MiniArea
        miniArray = {props.miniCard} 
        bottom = "0px"
        left ="0px"
      />
      {/* PC用 */}
      <MiniArea
        miniArray = {props.miniCardPc} 
        top = "15px"
        left ="0px"
      />
      </main>
    )
});

const MiniArea =memo((props) => {
  console.log("Child2 MiniArea レンダリング");
  const miniArea ={
    position: "absolute",
    top: props.top,
    bottom: props.bottom,
    left: props.left,
    listStyle: "none",
    /* ミニ絵札（手前）をflexで配置 */
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "left",
    gap: "2px",
  }

  return(
    <ul style={miniArea}>
      {props.miniArray.map(picture =>{
      return(
        <li key={picture}>
          <MiniCard src={picture} />
        </li>
      )
      })}
    </ul>
  )
});

 /* ミニ絵札*/
const MiniCard =memo((props) => {
  console.log("Child3 MiniCardレンダリング");
  const miniCard = {
    maxWidth: "50px",
    maxHeight: "40px",
  }
  return(
    <img 
      alt="miniCard" 
      style={miniCard}  
      src={props.src} 
    />
  )
});

const ListCards =memo((props) =>{
  console.log("Child2 listCards レンダリング");
  /* 絵札エリア(Grid) */
  const listCards = {
    width: "960px",
    height: "650px",
    margin: "50px auto 10px",
    /*子要素の絵札をgrid制御*/
    display: "grid",
    gridTemplateColumns: "repeat(8, 100px)",
    gridTemplateRows: "repeat(6, 100px)",
    // gridTemplateColumns: "repeat(5, 160px)",
    // gridTemplateRows: "repeat(3, 160px)",
    justifyCcontent: "center",
    alignContent: "center",
    justifyItems: "center",
    alignItems: "start",
    /* 位置(ShowEfudaが基点） */
    top: "0px",
    position: "absolute",
  }
  return(
    <ul style={listCards}>
      <CardGrid
        //const CardGrid用
        karutaLists={props.karutaLists}
        isAnswered = {props.isAnswered}
        //handleClick用(useState)
        basicLists={props.basicLists}
        currentTurn={props.currentTurn}
        score={props.score}
        setIsAnswered={props.setIsAnswered}
        setIsPopup={props.setIsPopup}
        setScore={props.setScore}
        setIsScored={props.setIsScored}
        //handleClick用(関数実行)
        stopTimer={props.stopTimer}
        playEffect={props.playEffect}
        placeHand={props.placeHand}
        pcPlayer={props.pcPlayer}
        // onClick={() =>props.handleClick()} 
      />
    </ul>
  )
});

const CardGrid =memo((props) => {
  console.log("Child3 CardGrid レンダリング");
  const cardGrid = {
    /*子要素のimg画像を中央に配置*/
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  }
   return(
    <>
    {props.karutaLists.map((list) =>{
      return(
        <li style={cardGrid} key={list.id} >
          {props.isAnswered ? (
            <Card
              src={list.answer} 
              />
             ):(
            <Card
            //const Card用
              src={list.answer} 
              id ={list.id}
              //handleClick用(useState)
              basicLists={props.basicLists}
              currentTurn={props.currentTurn}
              score={props.score}
              setIsAnswered={props.setIsAnswered}
              setIsPopup={props.setIsPopup}
              setScore={props.setScore}
              setIsScored={props.setIsScored}
              //handleClick用(関数実行)
              stopTimer={props.stopTimer}
              playEffect={props.playEffect}
              placeHand={props.placeHand}
              pcPlayer={props.pcPlayer}
              // onClick={() =>props.handleClick()} 
            />
           )}
            <Hand
              src={list.hand}
            />
            {/* PC用 */}
            <Hand
              src={list.handPc}
            /> 
        </li> 
      )
    })}
    </>
   )
});

const Card =memo((props) =>{
  console.log("Child4 Cardレンダリング");
  const handleClick = (selectedId)=> { 
    props.setIsAnswered(true);      //絵札のクリックを不可にする
    props.stopTimer();              //タイマー解除（PCplayer)
    //正解の場合
    if (selectedId ===props.basicLists[props.currentTurn].id) {　　//配列のIDを比較
      props.playEffect(1);
      props.setIsPopup(true);       
      props.placeHand();
      //player独自の操作
      props.setScore(props.score + 1);    //スコア加点
      props.setIsScored(true)       //ミニ絵札表示（手前）の有無を決める基準
      //最後の１枚を撮った場合に加点
      if (props.currentTurn===props.basicLists.length -2)
      props.setScore(props.score + 2);   
    }
    //不正解の場合
    else{
      setTimeout(()=>{props.pcPlayer()}, 300);
    }
  }//handleClick

  /*絵札表示*/
  const card = {
    /*絵札用*/
    width: "95px",
    height: "95px",
    // width: "150px",
    // height: "150px",
    objectFit: "scale-down", /*原画比率維持*/
    cursor: props.cursor,
    opacity: props.opacity,
  }
  return(
    <>
      <img 
        style = {card}
        alt ="" 
        src={props.src}  
        id ={props.id}
        onClick={()=>handleClick(props.id)} //handleClick関数をここに移動した場合
        //表示画像のリンク切れの場合、非表示にする
        onError={e => e.target.style.display = 'none'}
      />
    </>
  )
});

const Hand =memo((props) =>{
  console.log("Child4 Handレンダリング");
  const hand = {
    width: "110px",
    height: "110px",
    objectFit: "scale-down", /*原画比率維持*/
    position: "absolute", /*これがないと画像が縦に並ぶ*/
  }
  return(
    <>
      {/* マジックコード */}
      {props.src === "" ? 
      null : 
      <img 
        style={hand} 
        alt =""
        src={props.src}  
        onError={e => e.target.style.display = 'none'} 
        /> 
      }
    </> 
  )
});

const WindowBtn =memo((props) =>{
  console.log("Child3 WindowBtn レンダリング");
  const windowBtn ={
    display:"block",
    background: "#3498db",
    padding: "8px",
    borderRradius: "4px",
    textAalign: "center",
    color: "#fff",
    boxShadow: "0 4px 0 #287fb9",
    width: "150px",
    margin:"5px auto",
    cursor: "pointer",
  }
  return(
    <div>
      <button 
        style = {windowBtn} 
        onClick={props.onClick}
      >
        {props.windowBtnMsg}
      </button>
    </div>
  )
});

const Popup = memo((props) => {
  console.log("Child2 Popup レンダリング");
  const popupWindow ={
    /* Box枠の設定 */
    width: "200px",
    background: "#fff",
    padding: "30px",
    boxSshadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    border:"solid",
    borderRradius: "4px",
    margin: "0 auto", /* 画面を中央に配置 */
    textAlign: "center",/* 画面内要素を中央に */
    transition: "0.001s",
    /* 画面の位置設定（基点は親要素のshowEfuda) */
    position: "absolute",
    top: "250px",
    left: "0px",
    right: "0",
  }
  /*メッセージ（ポップアップ）*/
  const popupMsg ={
    fontSize:"18px"
  }
  /*画像（ポップアップ画面）*/
  const popupImg = {
    maxWidth: "150px",
    maxHeight: "150px",
  }
  
  return(
    <div style={popupWindow}> 
      <p style={popupMsg}>
        {props.popupMsg}
      </p>
   
    {/* 本番用 */}
    <img 
      alt="efuda" 
      style={popupImg} 
      src={props.basicLists[props.currentTurn].answer} 
    />
    <p>
      {/* {props.basicLists[props.currentTurn].subject}  */}
      {/* 日本語 */}
      {props.basicLists[props.currentTurn].daizai}  
    </p> 
    <p>
      {/* {props.basicLists[props.currentTurn].country}  */}
      {/* 日本語 */}
      {props.basicLists[props.currentTurn].kuni} 
    </p> 
    <img 
      alt ="flag" 
      src={props.basicLists[props.currentTurn].flag} 
    />  
    
    {props.currentTurn<props.basicLists.length-3 &&
      <WindowBtn 
        onClick={props.onClick} 
        windowBtnMsg="次" 
      />
    } 
    {props.currentTurn===props.basicLists.length-3 &&
      <WindowBtn 
        onClick={props.onClick}  
        windowBtnMsg="次に取ると、最後の札ももらえます" 
      />
    }
    {props.currentTurn===props.basicLists.length-2 &&
      <WindowBtn 
        onClick={props.onClick} 
        windowBtnMsg="結果を見る" 
      />
    } 
    </div>
  )
}); //<Popup/>---------------------------------------------------------

const Result = memo((props)=>{
  console.log("Child2 resultレンダリング");
  /* 画面枠（試合結果） */
  const resultWindow ={
    width: "200px",
    background: "#fff",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    // margin: "0 auto",
    borderRadius: "4px",
    textAlign: "center",
    transition: "1.1s",
    /* 画面の位置設定（基点は親要素のshowEfuda) */
    position: "absolute",
    top: "400px",
    left: "0px",
    right: "0",
  }
  /*スコア通知（試合結果）*/
  const resultScore = {
    fontSize: "24px",
  }
  /*メッセージ（試合結果）*/
    const resultMsg = {
    fontSize: "24px",
  }
  /*画像（試合結果画面）*/
  const resultImg = {
    maxWidth: "200px",
    maxHeight: "200px",
  }

  return(
    <div>
    {/* 本番用 */}
      <div style={resultWindow}> 
        <p 
          style={resultScore}>
          {props.score}枚取りました。
        </p>

        {props.score >= props.basicLists.length * 0.5 ? (
          <> 
            <p 
              style={resultMsg}
              >
              勝ちました！
            </p>
            <img 
              alt ="prize" 
              style={resultImg} 
              src="../images/gold.png" />
          </>
          ):(
            <p 
              style={resultMsg}
            >
              残念！負けました
            </p>
          )
          }
          <WindowBtn 
            onClick={props.onClick} 
            windowBtnMsg="もう一回？" 
          />
      </div>
</div> 
  )
});//<Result/>----------------------------------------------------------------


const Main=(props) => {

  //■■■■■useState■■■■■
  //  const [basicLists,setBasicLists] = useState(dataLists);    　non-API
   const [basicLists,setBasicLists] = useState([]);  //API利用時
   const [karutaLists,setKarutaLists] = useState(basicLists);  //絵札用データ配列
   const [miniCard, setMiniCard] = useState([]);      //ミニ絵札データ配列
   const [miniCardPc, setMiniCardPc] = useState([]);  //ミニ絵札データ配列（PC)
  
   const [currentTurn, setCurrentTurn] = useState(0);         //turnカウント
   const [score, setScore] = useState(0);                     //スコア・カウント
   const [isScored, setIsScored] = useState(false);           //player得点の有無
  
   const [isPlaced, setIsPlaced] = useState(false)            //「札を並べる」ボタンの反応制御
   const [isStarted, setIsStarted] = useState(false)           //「ゲーム開始」ボタンの反応制御
   const [isAnswered, setIsAnswered] = useState(true);        //絵札クリックの可否を制御
  
   const [isKaruta, setIsKaruta] = useState(false);           //絵札一覧の表示・非表示
   const [isPopup, setIsPopup] = useState(false);             //ポップアップの表示・非表示
   const [isResult, setIsResult] = useState(false);           //ゲーム結果の表示・非表示

   const [placeholder, setPlaceholder] = useState('');        //読み句一文字づつ表示
   const countLetter = useRef(0);                              //読み句文字数カウント 
   const timerRef = useRef(null);                              //タイマー設定用  

   const [language, setLanguage]= useState("default")
   const [level, setLevel]= useState("default")
   const [area, setArea]= useState("default")
  
// Sounds------------------------------------------------------------------
const effectSounds = [
  "sounds/effects/siin.mp3",
  "sounds/effects/pan.mp3", 
  "sounds/effects/bubu.mp3", 
  "sounds/effects/chan.mp3",
  "sounds/effects/clap.mp3",
  "sounds/effects/chiin.mp3", 
]
  //札の準備ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  //■■■■■useEffect (API)■■■■■ 
    //APIデータ取得
    useEffect (() => {
      getApiLists();
      //下のコメント（不要なwarningを出さないようにするため）
      // eslint-disable-next-line 
    },[]);
  
  //  APIデータを取得
    const getApiLists = useCallback(async () => {
      const res =await fetch("https://server-karuta2020.herokuapp.com/api/v1/karuta");
      const json = await res.json();
      setBasicLists(json);
    },[]);

  //    //読み句、絵札をセット（並べ替え、指定枚数選出）
     const setCards =() => {
      shuffle(basicLists)
      // shuffle(basicLists).splice(0,195)
      const result = shuffle([...basicLists]);
      setKarutaLists(result)
    };
  
  //エリア別札選出（例：アジア）
     
      
    const chooseArea = () => {
      switch (area){
        case "default":
        {
       
            const Asia= basicLists.filter(list => list.area==="Asia");
            setBasicLists(Asia);
            setKarutaLists(Asia);
            const result = shuffle([...Asia]);
            setBasicLists(result)
            const result2 = shuffle([...Asia]);
            setKarutaLists(result2)
            setArea("default")
          
        break
        }

        case "Asia":
        {
            const Asia= basicLists.filter(list => list.area==="Asia");
            setBasicLists(Asia);
            setKarutaLists(Asia);
            const resultAsia = shuffle([...Asia]);
            setBasicLists(resultAsia)
            const resultAsia2 = shuffle([...Asia]);
            setKarutaLists(resultAsia2)
        break
        }
        case "Africa":
          {
            const Africa= basicLists.filter(list => list.area==="Africa");
            setBasicLists(Africa);
            setKarutaLists(Africa);
            const resultAfrica = shuffle([...Africa]);
            setBasicLists(resultAfrica)
            const resultAfrica2 = shuffle([...Africa]);
            setKarutaLists(resultAfrica2)
          break
          }
          case "Europe":
            {
            const Europe= basicLists.filter(list => list.area==="Europe");
            setBasicLists(Europe);
            setKarutaLists(Europe);
            const resultEurope = shuffle([...Europe]);
            setBasicLists(resultEurope)
            const resultEurope2 = shuffle([...Europe]);
            setKarutaLists(resultEurope2)
          break
            }

          case "Americas":
            {
            const Americas= basicLists.filter(list => list.area==="Americas");
            setBasicLists(Americas);
            setKarutaLists(Americas);
            const resultAmericas = shuffle([...Americas]);
            setBasicLists(resultAmericas)
            const resultAmericas2 = shuffle([...Americas]);
            setKarutaLists(resultAmericas2)
          break
            }
          case "Oceania":
            {
            const Oceania= basicLists.filter(list => list.area==="Oceania");
            setBasicLists(Oceania);
            setKarutaLists(Oceania);
            const resultOceania = shuffle([...Oceania]);
            setBasicLists(resultOceania)
            const resultOceania2 = shuffle([...Oceania]);
            setKarutaLists(resultOceania2)
          break
            }
        default:
          {
            const Asia= basicLists.filter(list => list.area==="Asia");
            setBasicLists(Asia);
            setKarutaLists(Asia);
            const resultDafault = shuffle([...Asia]);
            setBasicLists(resultDafault)
            const resultDefault2 = shuffle([...Asia]);
            setKarutaLists(resultDefault2)
          }
      }//switch
    }//chooseArea

   //シャッフル関数
   const shuffle=(arr) => { 
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
    }
    
        //「札を並べる」ボタンを押すーーーーーーーーーーー
        
    const handleSet = () => {
      setCards();
      chooseArea();
      setIsKaruta(true);  //絵札一覧を表示
      setIsPlaced(true);  //「札を並べる」ボタンの反応停止
      playEffect(0);       //効果音 
    };//handleSet

    //「ゲーム開始」ボタンを押すーーーーーーーーー
    const handleStart =() => {
      startTimer();           //タイマー設定（１枚目のみ）
      setIsAnswered(false);   //絵札のクリック可能にする
      setIsStarted(true)　    //「ゲーム開始」ボタンの反応停止
      readClue(currentTurn);  //読み句の読みあげ
    }//handleStart 

  
      //読み句一文字づつ表示
      const isFirstRender = useRef(false)
  
      useEffect(() => { // このeffectは初回レンダー時のみ呼ばれるeffect
        isFirstRender.current = true
      }, [])

         //switch
      useEffect(() => {// 『count』 が更新された場合『と』初回レンダー時に動くeffect
        if(isFirstRender.current) { // 初回レンダー判定
          isFirstRender.current = false // もう初回レンダーじゃないよ代入
        } else 
        {
          let clueWords ="";
          switch (language){
            case "japanese":
              clueWords = basicLists[currentTurn].yomiku //日本語
              break
            case "english":
              clueWords = basicLists[currentTurn].clue //英語
              break
            default:
              clueWords = basicLists[currentTurn].clue //英語
          }
          
          // const clueWords = basicLists[currentTurn].yomiku //日本語
          // const clueWords = basicLists[currentTurn].clue //英語
          const showClue =()=> {
            if(currentTurn < basicLists.length-1){
              setPlaceholder(prev => prev + clueWords[countLetter.current]);
              countLetter.current++;
            }
          }
          if (countLetter.current <clueWords.length) {
            let addChar = setTimeout(()=>{showClue(currentTurn)} , 100);
            return () => clearTimeout(addChar);
          }
        } // eslint-disable-next-line
      }, [placeholder, isStarted]);  


      //読みあげ （引数あり）
      if (process.browser) {
        // windowやdocumentを使う処理を記述
        let clueSounds=new Audio();
      }
  
 
  const readClue = (currentNum)=> {

    if (currentNum < basicLists.length -1){
    
      //switch
    switch (language){
      case "default":
        clueSounds.src = basicLists[currentNum].read; //英語
        setLanguage("default")
        break

      case "japanese":
        clueSounds.src = basicLists[currentNum].yomu; //日本語
        break

      case "english":
        clueSounds.src = basicLists[currentNum].read; //英語
        break

      default:
        clueSounds.src = basicLists[currentNum].read; //英語
    }

    clueSounds.play();}
    clueSounds.preload = "auto";
    clueSounds.loop = false;
  }

  //効果音 

  if (process.browser) {
    // windowやdocumentを使う処理を記述
  let effect=new Audio();
  }
 

  const playEffect= (effectNum)=> {
    effect.preload = "auto";
    effect.src = effectSounds[effectNum];
    effect.load();
    effect.loop = false;
    effect.play();
  }
  
  //PcPlayer--------------------------------------
   //PC player timer （useCallback付けると御作動する）
  //  const startTimer = () => {
  //     timerRef.current = setTimeout(() => {
  //       pcPlayer();
  //     }, 5000);
  //   };

  const startTimer = () => {
    switch (level){
      case "default":
        timerRef.current = setTimeout(() => {
        pcPlayer();
        }, 8000);
        setLevel("default")
        break
  
      case "levelOne":
        timerRef.current = setTimeout(() => {
          pcPlayer();
          }, 12000);
        break
  
      case "levelTwo":
        timerRef.current = setTimeout(() => {
          pcPlayer();
          }, 8000);
        break
      case "levelThree":
        timerRef.current = setTimeout(() => {
          pcPlayer();
          }, 5000);
        break
    
      default:
        timerRef.current = setTimeout(() => {
          pcPlayer();
          }, 8000);
    
    }//switch
  }; //startTiemr
 

  const stopTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  //timer2 (引数 newCurrentTurn)
  //useCallback付けると誤作動
  // const startTimer2 = (newCurrentTurn) => {
  //   timerRef.current = setTimeout(() => {
  //     pcPlayer2(newCurrentTurn);
  //   }, 5000);
  // };

  //switch
  const startTimer2 = (newCurrentTurn) => {
    switch (level){
      case "default":
        timerRef.current = setTimeout(() => {
          pcPlayer2(newCurrentTurn);
        }, 8000);
        setLevel("default")
        break
  
      case "levelOne":
        timerRef.current = setTimeout(() => {
          pcPlayer2(newCurrentTurn);
          }, 12000);
        break
  
      case "levelTwo":
        timerRef.current = setTimeout(() => {
          pcPlayer2(newCurrentTurn);
          }, 8000);
        break
      case "levelThree":
        timerRef.current = setTimeout(() => {
          pcPlayer2(newCurrentTurn);
          }, 5000);
        break
    
      default:
        timerRef.current = setTimeout(() => {
          pcPlayer();
          }, 8000);
    
    }//switch
  };

  //PCplayerの動き　引数なし
   const pcPlayer = () =>{
    placeHandPc();
    setIsPopup(true);
    playEffect(2);
    setIsAnswered(true);
  }
  //PCplayer2の動き　(引数 newCurrentTurn)
   const pcPlayer2 = (newCurrentTurn) =>{
    placeHandPc2(newCurrentTurn);
    setIsPopup(true);
    setIsAnswered(true);
    playEffect(3);
  }

  //ポップアップボタンを押した場合-----------------------------
  const pressPopupBtn = () => {

    //setCurrentTurn変更がすぐ反映されないため手動で１を加える（or最初の句が２回読まれる）
    const newCurrentTurn = currentTurn + 1;
    setCurrentTurn(newCurrentTurn);
   
   //いろいろ消す
   hide();
   
   //ミニ絵札表示(手前)
   if (isScored) {
     addMini(currentTurn);
     //最後の１枚を追加表示
     if (currentTurn === basicLists.length -2 ){
       addMini(currentTurn + 1);
      }
   }
   else {
     addMiniPc(currentTurn);
     //最後の１枚を追加表示
     if (currentTurn === basicLists.length -2 ){
       addMiniPc(currentTurn + 1);
     }
   }
   
   //次の準備ーーーーーーーーーーーーーーーーーーーーーーーーーーーー

   // 「次」ボタンを押した時
    if (currentTurn < basicLists.length-1) { //0,1,2,3,4,5]

     //readClueの引数に手動で１を加えた数値を入れる
     setTimeout(()=>{readClue(newCurrentTurn)}, 500);
     setIsAnswered(false);   //絵札のクリックを可にする
     setIsScored(false);    
     countLetter.current=0;  //表示する読み句の文字数をゼロに戻す
    }

   //タイマー設定（最後手前の札まで
   // currentTurnでなくnewCurrentTurnにする。or 終了後に最後のタイマーが作動しポップアップが表示される。
    if (newCurrentTurn < basicLists.length-1) {
    // startTimer(newCurrentTurn);
    startTimer2(newCurrentTurn);
      }
    
    //「結果を見る」ボタンを押した時
   if (currentTurn === basicLists.length - 2) { //5
      setIsResult(true);    //結果画面を表示する
      soundResult();        //結果画面表示時の効果音
   }
 };//pressPopupBtn

//消す（ポップアップボタン押した後）
  const hide =() => {

    //読み句を消す？？
    setPlaceholder("");

    //絵札と手を消す
    if(isScored){
      eraseEfudaHand();
     }
    else{
      eraseEfudaHandPc();
    }
    //ポップアップ画面を消す
    setIsPopup(false);      

    //最後の１枚を消す
    if (currentTurn === basicLists.length - 2) { 
      eraseLast();          
    }
  }

  // //正解の絵札の上に手を表示
  const placeHand = () => {
    const result = karutaLists.map(list => list.id===basicLists[currentTurn].id ? {...list, hand:"/images/hand.png"} : list)
    setKarutaLists(result);  
  };
  
  //手を表示(PC playerお手つき、PCplayer１回目用)
  const placeHandPc = () => {
    const result = karutaLists.map(list => list.id===basicLists[currentTurn].id ? {...list, handPc:"/images/handPc.png"} : list )
    setKarutaLists(result);  
  };

  // //手を表示(PC playerお手つき, 2回目以降用)
  const placeHandPc2 = (currentNum) => {
    const result = karutaLists.map(list => list.id===basicLists[currentNum].id ? {...list, handPc:"/images/handPc.png"} : list )
    //currentTurnの更新時期のずれにより、不要な所に手や絵が表示されてしまう。その手を消すために以下を実行
    const result1 = result.map(list => list.id===basicLists[currentTurn].id ? {...list, answer:"", handPc:"", hand:""} : list )
    setKarutaLists(result1);  
  } 
  //重要：絵と手を別々の関数にすると、片方しか機能しない。なので同時に処理する

  //正解の絵と手を消す(player)-同じ行にanswer, handを書ける
  const eraseEfudaHand = () => {
    // const result = karutaLists.map(list => list.id===basicLists[currentTurn].id ? {...list, answer:""} : list )
    const result = karutaLists.map(list => list.id===basicLists[currentTurn].id ? {...list, answer:"", hand:""} : list )
    setKarutaLists(result);  
  } 

  //正解の絵と手(PC)を消す
  const eraseEfudaHandPc = () => {
    // const result = karutaLists.map(list => list.id===basicLists[currentTurn].id ? {...list, answer:""} : list )
    const result = karutaLists.map(list => list.id===basicLists[currentTurn].id ? {...list, answer:"", handPc:""} : list )
    setKarutaLists(result);  
  } 

  //最後2枚の絵札と手(player, pc)を消す
  const eraseLast = () => {
    // const result = karutaLists.map(list => list.id===basicLists[currentTurn].id ? {...list, answer: ""} : list )
    const result = karutaLists.map(list => list.id===basicLists[currentTurn].id ? {...list, answer: "", hand:"", handPc:""} : list )
    const result2 = result.map(list => list.id===basicLists[currentTurn+1].id ? {...list, answer: ""} : list )
    setKarutaLists(result2);  
  }

  //引数にcurrentTurnを入れないとうまくいかない
  //mini絵札を追加する(player)
  const addMini = (currentTurn) => {
    setMiniCard((prevminiCard) => {
      const newminiCard = [...prevminiCard, basicLists[currentTurn].answer]
      return newminiCard;
    });
  }
  
  //mini絵札を追加する(PC)
  const addMiniPc = (currentTurn) => {
    setMiniCardPc((prevminiCardPc) => {
      const newminiCardPc = [...prevminiCardPc, basicLists[currentTurn].answer]
      return newminiCardPc;
    });
  }

   //結果画面表示時の効果音
   const soundResult =() => {
    if (score>=basicLists.length * 0.5) {
      playEffect(4);
    }else
    {
      playEffect(5);
    }
  }

//次のゲーム
const newGame =() => {
  window.location.reload();
}

//switch
const checkJapanese =(e) => {
  setLanguage("japanese")
}

const checkEnglish =(e) => {
  setLanguage("english")
}

const playLevelOne =(e) => {
  setLevel("levelOne")
}

const playLevelTwo =(e) => {
  setLevel("levelTwo")
}
const playLevelThree=(e) => {
  setLevel("levelThree")
}

const chooseAsia=(e) => {
  setArea("Asia")
}

const chooseEurope=(e) => {
  setArea("Europe")
}
const chooseAfrica=(e) => {
  setArea("Africa")
}
const chooseAmericas=(e) => {
  setArea("Americas")
}
const chooseOceania=(e) => {
  setArea("Oceania")
}

let backgroundImage="";

{switch(area){
  case "default":
    backgroundImage="url(../images/worldmap.png)" 
    break
  case "Asia":
    backgroundImage="url(../images/worldmap2.png)" 
    break
  case "Europe":
    backgroundImage="url(../images/tatami-1.png)" 
  break
  case "Africa":
    backgroundImage="url(../images/tatami-1.png)" 
  break
  case "Americas":
    backgroundImage="url(../images/tatami-1.png)" 
  break
  case "Oceania":
    backgroundImage="url(../images/tatami-1.png)" 
  break

  default:
    backgroundImage="url(../images/worldmap.png)" 

  }
}
  // let clusWords=""

  // switch (language){
  //   case "japanese":
  //     const clueWords = basicLists[currentTurn].yomiku //日本語
  //     break
  //   case "english":
  //     const clueWords = basicLists[currentTurn].clue //英語
  //     break
  //   default:
  //     const clueWords = basicLists[currentTurn].clue //英語
  // }

  const radioBox = {
    /* flexで配置 */
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "left",
    gap: "15px"
  }

  //------JSX------------------------------------------------------------------------------
  return (
    <div>

      <div style={radioBox}>
        <RadioBtn
          id="japanese"
          name="language"
          value="japanese"
          htmlFor="japanese"
          text ="Japanese（日）"
          onChange={()=> checkJapanese()}
        />
        <RadioBtn
          id="english"
          name="language"
          value="english"
          htmlFor="english"
          text ="English（英）"
          onChange={()=> checkEnglish()}
        />
      </div>

      <div style={radioBox}>
        <RadioBtn
          id="levelOne" 
          name="level" 
          value="levelOne"
          htmlFor="levelOne"
          text ="初級"
          onChange={()=> playLevelOne()}
        />
        <RadioBtn
          id="leveTwo" 
          name="level" 
          value="levelTwo"
          htmlFor="levelTwo"
          text ="中級"
          onChange={()=> playLevelTwo()}
        />
        <RadioBtn
          id="levelThree" 
          name="level" 
          value="levelThree"
          onChange={()=> playLevelThree()}
          htmlFor="levelThree"
          text ="上級"
        />
      </div>

      <div style={radioBox}>
        <RadioBtn
          id="Asia" 
          name="area" 
          value="Asia"
          onChange={()=> chooseAsia()}
          htmlFor="Asia"
          text="アジア"
        />
        <RadioBtn
          id="Europe" 
          name="area" 
          value="Europe"
          onChange={()=> chooseEurope()}
          htmlFor="Europe"
          text="ヨーロッパ"
        />
        <RadioBtn
          id="Africa" 
          name="area" 
          value="Africa"
          onChange={()=> chooseAfrica()}
          htmlFor="Africa"
          text="アフリカ"
        />
        <RadioBtn
          id="Aerimcas" 
          name="area" 
          value="Aerimcas"
          onChange={()=> chooseAmericas()}
          htmlFor="Aerimcas"
          text="アメリカ"
        />
        <RadioBtn
          id="Oceania" 
          name="area" 
          value="Oceania"
          onChange={()=> chooseOceania()}
          htmlFor="Oceania"
          text="オセアニア"
        />
      </div>

      {/* 札を並べた後 */}
      {isPlaced ?         
        <>
          {/* ゲーム開始ボタンを押した後 */}
          {isStarted ?　　
            <Button 
              background="grey" 
            >
              ゲーム中
            </Button>
            :             
            // ゲーム開始ボタンを押す前
            <Button 
              background="red" 
              cursor="pointer" 
              onClick={()=> handleStart()}
            >
              ゲーム開始
            </Button>
          }
        </>
      : 
      　//札を並べていない場合
        <Button 
          background="Blue" 
          cursor="pointer" 
          onClick={()=>handleSet()}
        >
          札を並べる
        </Button>
      }

        {/* <Furigana>
        {basicLists[currentTurn].furigana}
        </Furigana> */}

        <ClueBox
          placeholder={placeholder}  
        />

        <PlayArea 
          //const PlayArea用
          backgroundImage={backgroundImage}
          //const CardGrid用
          karutaLists={karutaLists} 
          isAnswered = {isAnswered}
          //const MiniArea用
          miniCard={miniCard}
          miniCardPc={miniCardPc}
          //handleClick用(useState)
          basicLists={basicLists}
          currentTurn={currentTurn}
          score={score}
          setIsAnswered={setIsAnswered}
          setIsPopup={setIsPopup}
          setScore={setScore}
          setIsScored={setIsScored}
          //handleClick用(関数実行)
          stopTimer={stopTimer}
          playEffect={playEffect}
          placeHand={placeHand}
          pcPlayer={pcPlayer}
          // onClick={()=>handleClick()} 
        />

      {isPopup ? 
        <>
        {isScored ?
          <Popup 
            popupMsg="取りました"
            basicLists={basicLists} 
            currentTurn={currentTurn} 
            onClick={()=>pressPopupBtn()} 
          />
          : 
          <Popup 
            popupMsg="残念、取られました！"
            basicLists={basicLists} 
            currentTurn={currentTurn}
            onClick={()=>pressPopupBtn()} 
          />
        }
        </>
        : null
      } 
  
      {isResult&&
        <Result  
          // isResult={isResult} 
          basicLists={basicLists} 
          currentTurn={currentTurn}
          score ={score}
          onClick={()=>newGame()} 
        />
      } 
     
    </div>        
    ) //return

}//Main

const Footer = () => {
  const footer ={
    textAlign: "center"
  }
  return(

    <p style={footer}>©<a href="https://ondoku3.com/">ondoku3.com</a>(声:<a href="https://ondoku3.com/">音読さん)</a></p>
  )
}



export const App=()=> {
  console.log("Appレンダリング");
  return(
    <div>
        <Head>
        <title>世界200ケ国かるた</title>
         <meta name="description" content="Generated by create next app" />
         <link rel="icon" href="/favicon.ico" />
       </Head>
      <Header />
      <Main />
      <Footer />
    </div>
  )
} //App

export default App;




// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>世界200ケ国かるた</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing{' '}
//           <code className={styles.code}>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h2>Documentation &rarr;</h2>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h2>Learn &rarr;</h2>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/master/examples"
//             className={styles.card}
//           >
//             <h2>Examples &rarr;</h2>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//           >
//             <h2>Deploy &rarr;</h2>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <Footer/>
//     </div>
//   )
// }
