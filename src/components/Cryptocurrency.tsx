import styled from "styled-components";
import {Coins} from "../interfaces/Coins.ts";

const AllCoinsDiv=styled.div`
    display: flex;
    flex-flow: row wrap;    
    justify-content: space-evenly;
    background-color: lightblue;
    margin: auto;
    padding-left: 2%;
`;

const SingleCoinDiv=styled.div<{changePercent24h: number}>`
    width: 23%;
    margin: 1% 1% 1% 0;
    display: flex;
    flex-direction: column;   
    justify-content: center;
    padding: 3%;
    background-color: ${(props)=>(props.changePercent24h > 0 ? '#018749' : '#E34234')};
    border:${(props)=>(props.changePercent24h > 0 ? '3px darkgreen solid' : '3px darkred solid')};
    font: italic  calc(2px + 1vw) "Courier New";
    text-align: center;
`;


const StyledTextDiv=styled.div`
    margin: 0;
    padding: 0;
`
export default function Cryptocurrency(props : { data:Coins[] } ){
    return (
        <AllCoinsDiv >
            {
                props.data.map((coin: Coins) =>
                    <SingleCoinDiv key={coin.id} changePercent24h={coin.changePercent24Hr}>
                        <StyledTextDiv>
                            <h2>{coin.name}</h2>
                            <h4>{coin.symbol}</h4>
                            <h4>${parseFloat(coin.priceUsd.toString()).toFixed(2)}</h4>
                            <h6> 24h Change: {coin.changePercent24Hr >= 0 ? "+" : ""} {parseFloat(coin.changePercent24Hr.toString()).toFixed(3)}%</h6>
                        </StyledTextDiv>
                    </SingleCoinDiv>
                )
            }
        </AllCoinsDiv>
    );
}