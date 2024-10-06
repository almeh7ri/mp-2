import { useState, useEffect } from 'react'
import {Coins} from './interfaces/Coins'
import styled from "styled-components";
import Cryptocurrency from "./components/Cryptocurrency.tsx";

const ParentDiv=styled.div`
        width: 80vw;
        margin: auto;
        border: 5px  #050320 solid;
        border-top: none;
`;

export default function App() {

    const [data, setData] = useState<Coins[]>([])
    useEffect(() => {
        async function fetchData(): Promise<void> {
            try {
                const rawData = await fetch("https://api.coincap.io/v2/assets"); // You can update this to CoinGecko if needed
                const jsonData = await rawData.json(); // Make sure to read the JSON body here
                console.log("Parsed Data:", jsonData); // Log the actual data
                setData(jsonData.data); // Access the `data` field from the response (as per CoinCap's structure)
            } catch (e) {
                console.log("There was the error: " + e);
            }
        }
        fetchData()
            .then(() => console.log(data))
            .catch((e: Error) => console.log("There was the error: " + e));
    }, [data]);
  return (
      <ParentDiv>
          <Cryptocurrency data={data}/>
      </ParentDiv>
  )
}
