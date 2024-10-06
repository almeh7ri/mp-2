import styled from "styled-components";
import { Coins } from "../interfaces/Coins.ts"; // Importing the Coins interface from another file to use for typing the data

// Styling the main container that holds all the coins
const AllCoinsDiv = styled.div`
    display: flex;
    flex-flow: row wrap; // Flex container that wraps items into multiple rows
    justify-content: space-evenly; // Distribute space evenly between coin items
    background-color: lightblue; // Background color for the entire container
    margin: auto; // Center the container horizontally
    padding-left: 2%; // Add padding to the left side of the container (we will add margin on all other sides in SingleCoinDiv)
`;

// Styling each individual coin container
const SingleCoinDiv = styled.div<{ changePercent24h: number }>` // Accepts the changePercent24h as a prop for conditional styling
    width: 23%; // Each coin takes up 23% of the width (allows for multiple coins per row)
    margin: 1% 1% 1% 0; // Margins around each coin to create spacing between them
    display: flex;
    flex-direction: column; // Align elements vertically inside the coin container
    justify-content: center; // Center the content vertically
    padding: 3%; // Add padding around the coin content
    background-color: ${(props) => (props.changePercent24h > 0 ? '#018749' : '#E34234')}; // Green background if the price change is positive, red if negative
    border: ${(props) => (props.changePercent24h > 0 ? '3px darkgreen solid' : '3px darkred solid')}; // Green border if price is up in the last 24h, red if down
    font: italic calc(2px + 1vw) "Courier New"; 
    text-align: center; // Center align the text
`;

// Styling for the text container within each coin
const StyledTextDiv = styled.div`
    margin: 0; // Remove margin
    padding: 0; // Remove padding
`;

// Main Cryptocurrency component that takes in data as props and displays coins
export default function Cryptocurrency(props: { data: Coins[] }) {
    return (
        <AllCoinsDiv>
            {
                props.data.map((coin: Coins) => // Iterating through each coin in the data array
                    <SingleCoinDiv key={coin.id} changePercent24h={coin.changePercent24Hr}> {/*Each coin gets a unique key based on its ID and the color is conditionally rendered based on 24h change*/}
                        <StyledTextDiv>
                            <h2>{coin.name}</h2>  {/*Display the name of the cryptocurrency*/}
                            <h4>{coin.symbol}</h4> {/* Display the symbol (e.g., BTC for Bitcoin)*/}
                            <h4>${parseFloat(coin.priceUsd.toString()).toFixed(2)}</h4> {/*Display the price, formatted to two decimal places*/}
                            <h6>24h Change: {coin.changePercent24Hr >= 0 ? "+" : ""} {parseFloat(coin.changePercent24Hr.toString()).toFixed(3)}%</h6> {/*Show the 24h percentage change with appropriate sign and formatted to three decimal places*/}
                        </StyledTextDiv>
                    </SingleCoinDiv>
                )
            }
        </AllCoinsDiv>
    );
}
