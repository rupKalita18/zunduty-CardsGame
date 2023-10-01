import React from 'react';
import styles from "./Timer.module.css";

interface TimerProps{
    seconds:number
}

const Timer:React.FC<TimerProps>=({seconds})=>{
    return <div className={styles.timer}>Time:{seconds}</div>;
}

export default Timer;