import React, { useEffect, useState } from "react";
import proto from "./marketDataFeed.proto";
import { Buffer } from "buffer";
import "./Style.css";
const protobuf = require("protobufjs");


// Initialize Protobuf root
let protobufRoot = null;
const initProtobuf = async () => {
  protobufRoot = await protobuf.load(proto);
  console.log("Protobuf part initialization complete");
};

// Function to get WebSocket URL
const getUrl = async (token) => {
  const apiUrl = "https://api-v2.upstox.com/feed/market-data-feed/authorize";
  let headers = {
    "Content-type": "application/json",
    Authorization: "Bearer " + token,
  };
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: headers,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const res = await response.json();
  return res.data.authorizedRedirectUri;
};

// Helper functions for handling Blob and ArrayBuffer
const blobToArrayBuffer = async (blob) => {
  if ("arrayBuffer" in blob) return await blob.arrayBuffer();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject();
    reader.readAsArrayBuffer(blob);
  });
};

// Decode Protobuf messages
const decodeProtobuf = (buffer) => {
  if (!protobufRoot) {
    console.warn("Protobuf part not initialized yet!");
    return null;
  }
  const FeedResponse = protobufRoot.lookupType(
    "com.upstox.marketdatafeeder.rpc.proto.FeedResponse"
  );
  return FeedResponse.decode(buffer);
};

// MarketDataFeed component
function MarketDataFeed({ token }) {
  const [isConnected, setIsConnected] = useState(false);
  const [rowData, setRowData] = useState([]);

  // Establish WebSocket connection
  useEffect(() => {
    const connectWebSocket = async (token) => {
      try {
        const wsUrl = await getUrl(token);
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
          setIsConnected(true);
          console.log("Connected");
          const data = {
            guid: "someguid",
            method: "sub",
            data: {
              mode: "full",
              instrumentKeys: ["NSE_FO|51561","NSE_FO|51562","NSE_FO|51563","NSE_FO|51564","NSE_FO|51565","NSE_FO|51567","NSE_FO|51571","NSE_FO|51572","NSE_FO|51573","NSE_FO|51574","NSE_FO|51575","NSE_FO|51576","NSE_FO|51577","NSE_FO|51580","NSE_FO|51583","NSE_FO|51584","NSE_FO|51585","NSE_FO|51586","NSE_FO|51588","NSE_FO|51589","NSE_FO|51591","NSE_FO|51596","NSE_FO|51597","NSE_FO|51598","NSE_FO|51599","NSE_FO|51600","NSE_FO|51601","NSE_FO|51602","NSE_FO|51603","NSE_FO|51610","NSE_FO|51611","NSE_FO|51614","NSE_FO|51615","NSE_FO|51616","NSE_FO|51617","NSE_FO|51618","NSE_FO|51621","NSE_FO|51622","NSE_FO|51623","NSE_FO|51624","NSE_FO|51625","NSE_FO|51626","NSE_FO|51627","NSE_FO|51628","NSE_FO|51629","NSE_FO|51630","NSE_FO|51631","NSE_FO|51632","NSE_FO|51633","NSE_FO|51634","NSE_FO|51635","NSE_FO|51638","NSE_FO|51639","NSE_FO|51645","NSE_FO|51646","NSE_FO|51650","NSE_FO|51651","NSE_FO|51652","NSE_FO|51653","NSE_FO|51654","NSE_FO|51655","NSE_FO|51656","NSE_FO|51657","NSE_FO|51658","NSE_FO|51659","NSE_FO|51660","NSE_FO|51661","NSE_FO|51662","NSE_FO|51663","NSE_FO|51664","NSE_FO|51665","NSE_FO|51666","NSE_FO|51667","NSE_FO|51668","NSE_FO|51669","NSE_FO|51670","NSE_FO|51671","NSE_FO|51672","NSE_FO|51673","NSE_FO|51674","NSE_FO|51678","NSE_FO|51688","NSE_FO|51689","NSE_FO|51690","NSE_FO|51691","NSE_FO|51692","NSE_FO|51693","NSE_FO|51694","NSE_FO|51695","NSE_FO|51696","NSE_FO|51697","NSE_FO|51698","NSE_FO|51699","NSE_FO|51700","NSE_FO|51701","NSE_FO|51702","NSE_FO|51703","NSE_FO|51704","NSE_FO|51705","NSE_FO|51706","NSE_FO|51707","NSE_FO|51708","NSE_FO|51709","NSE_FO|51710","NSE_FO|51711","NSE_FO|51712","NSE_FO|51713","NSE_FO|51714","NSE_FO|51715","NSE_FO|51716","NSE_FO|51717","NSE_FO|51718","NSE_FO|51719","NSE_FO|51720","NSE_FO|51721","NSE_FO|51722","NSE_FO|51723","NSE_FO|51724","NSE_FO|51725","NSE_FO|51726","NSE_FO|51727","NSE_FO|51728","NSE_FO|51729","NSE_FO|51730","NSE_FO|51731","NSE_FO|51732","NSE_FO|51733","NSE_FO|51734","NSE_FO|51735","NSE_FO|51736","NSE_FO|51737","NSE_FO|51738","NSE_FO|51739","NSE_FO|51740","NSE_FO|51741","NSE_FO|51742","NSE_FO|51747","NSE_FO|51748","NSE_FO|51751","NSE_FO|51752","NSE_FO|51755","NSE_FO|51756","NSE_FO|51757","NSE_FO|51758","NSE_FO|51759","NSE_FO|51760","NSE_FO|51761","NSE_FO|51773","NSE_FO|51774","NSE_FO|51775","NSE_FO|51776","NSE_FO|51783","NSE_FO|51784","NSE_FO|51792","NSE_FO|51793","NSE_FO|51804","NSE_FO|51809","NSE_FO|51810","NSE_FO|51811","NSE_FO|51819","NSE_FO|51820","NSE_FO|51827","NSE_FO|51839","NSE_FO|51850","NSE_FO|51857","NSE_FO|51858"],
           },
          };
          ws.send(Buffer.from(JSON.stringify(data)));
        };

        ws.onclose = () => {
          setIsConnected(false);
          console.log("Disconnected");
        };

        ws.onmessage = async (event) => {
          const arrayBuffer = await blobToArrayBuffer(event.data);
          let buffer = Buffer.from(arrayBuffer);
          let response = decodeProtobuf(buffer);
          const newData = extractDataFromFeed(JSON.stringify(response));
          updateRowData(newData);
        };

        ws.onerror = (error) => {
          setIsConnected(false);
          console.log("WebSocket error:", error);
        };

        return () => ws.close();
      } catch (error) {
        console.error("WebSocket connection error:", error);
      }
    };

    initProtobuf();
    connectWebSocket(token);
  }, [token]);

  // Function to update rowData state when new data is received
  // Function to update rowData state when new data is received
const updateRowData = (newData) => {
  setRowData((prevData) => {
    // Create a map to store the latest data for each instrument key
    const newDataMap = new Map(prevData.map((row) => [row.instrumentKey, row]));

    // Update the map with new data
    newData.forEach((row) => {
      newDataMap.set(row.instrumentKey, row);
    });

    // Convert the map back to an array of rows
    console.log(Array.from(newDataMap.values()));
    return Array.from(newDataMap.values());
  });
};  

const toFixed = (givendata) => {
  if(givendata && givendata!==undefined){
  return Number(givendata).toFixed(2);
  }else{
    return "00.00";
  }
}

// Function to format timestamp to HH:mm:ss format
const formatTimestamp = (timestamp) => {
  if (!timestamp || isNaN(timestamp)) {
    return "Invalid Timestamp";
  }

  const timestampNumber = parseInt(timestamp);
  const date = new Date(timestampNumber);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

  // Function to extract data from the feed
  const extractDataFromFeed = (feedData) => {
    const { feeds } = JSON.parse(feedData);
    const instrumentKeys = Object.keys(feeds);
    console.log(instrumentKeys,"instrumentKeys");
    const rows = [];



    // Iterate over each instrument key
    instrumentKeys.forEach((instrumentKey) => {
      const feed = feeds[instrumentKey];
      console.log(feed,"feed");
      if (feed && feed.ff && ( feed.ff.marketFF || feed.ff.indexFF)){
        const { ff } = feed;
        const { ltpc } = ff.marketFF || ff.indexFF;
        const {marketOHLC} = ff.marketFF || ff.indexFF;
        const {eFeedDetails} = ff.marketFF || ff.indexFF;
        const {optionGreeks} = ff.marketFF || ff.indexFF;
        rows.push({
          instrumentKey: instrumentKey,
          LTT: formatTimestamp(ltpc.ltt),
          LTP: ltpc.ltp,
          Open: marketOHLC.ohlc[0].open,
          High: marketOHLC.ohlc[0].high,
          Low: marketOHLC.ohlc[0].low,
          Close: marketOHLC.ohlc[0].close,
          Interval: marketOHLC.ohlc[0].interval,
          Ts: marketOHLC.ohlc[0].ts,
          Volume: marketOHLC.ohlc[0].volume,
          Vwap :eFeedDetails.atp,
          Vega	: toFixed(optionGreeks.vega),
          Theta	: toFixed(optionGreeks.theta),
          Gamma	: toFixed(optionGreeks.gamma),
          Delta	: toFixed(optionGreeks.delta),
          Iv :  toFixed(optionGreeks.iv),
        });
      }
    });

    return rows;
  };



  // Render the component
  return (
    <div className="feed-containe">
      <div className="header-sectio">
        <h1>Market Feed</h1>
        <h3 className={`status ${isConnected ? "connected" : "not-connected"}`}>
          Status: <span>{isConnected ? "Connected" : "Not Connected"}</span>
        </h3>
      </div>
      {isConnected && (
        <div className="feed-section">
          <div className="title"></div>
          <table className="example" style={{width:'150%'}}>
            <thead>
            <tr>
						<th colspan="15" className="CallsColor" style={{ backgroundColor: '#dc143c', color: '#fff' }}>Calls</th>
						<th colspan="1" className="strikecolor" style={{backgroundColor:'#6C7275'}}></th>	
						<th colspan="15" class="PuttsColor" style={{backgroundColor:'#7BC862', color: '#fff' }}>Puts</th>	
					  </tr>
              <tr>
                
                <th>LTT</th>
                <th>Vega</th>
                <th>Theta</th>
                 <th>Gamma</th>
                 <th>Delta</th>
                 <th>IV</th>
                 <th>OIChng</th>
                 <th>OI</th>
                 <th>Volume</th>
                 <th>Vwap</th>
                 <th>Bid</th>
                 <th>Ask</th>
                 <th>Chng</th>
                 <th>ChngPer</th>
               
                {/* <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Close</th>
                <th>Interval</th>
                <th>Ts</th> */}
               
                <th>LTP</th>
                {/* <th>Instrument Key</th> */}
                <th style={{backgroundColor: '#e2d87f',cursor:'pointer'}}>Strike Price</th>
                {/* <th>Instrument Key</th> */}
                <th>LTP</th>
                {/* <th>Ts</th>
                <th>Interval</th>
                <th>Close</th>
                <th>Low</th>
                <th>High</th>
                <th>Open</th> */}
                <th>ChngPer</th>
                <th>Chng</th>
                <th>Ask</th>
                <th>Bid</th>
                <th>Vwap</th>
                <th>Volume</th>
                <th>OI</th>
                <th>OIChng</th>
                <th>IV</th>
                <th>Delta</th>
                <th>Gamma</th>
                <th>Theta</th>
                <th>Vega</th>


                <th>LTT</th>
                
              </tr>
            </thead>
            <tbody>
              {rowData.map((row, index) => (
                <tr key={index} className="feed-item">
                  
                  <td>{row.LTT}</td>
                 
                  <td>{row.Vega}</td>
                 
                  <td>{row.Theta}</td>
                  <td>{row.Gamma}</td>
                  <td>{row.Delta}</td>
                  <td>{row.Iv}</td>
                  <td></td>
                  <td></td>
                  <td>{row.Volume}</td>
                  <td>{row.Vwap}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  {/* <td>{row.Open}</td>
                  <td>{row.High}</td>
                  <td>{row.Low}</td>
                  <td>{row.Close}</td>
                  <td>{row.Interval}</td>
                  <td>{row.Ts}</td> */}
                  <td>{row.LTP}</td>
                  {/* <td>{row.instrumentKey}</td> */}
                  <td></td>
                  {/* <td>{row.instrumentKey}</td> */}
                  <td>{row.LTP}</td>
                  {/* <td>{row.Ts}</td>
                  <td>{row.Interval}</td>
                  <td>{row.Close}</td>
                  <td>{row.Low}</td>
                  <td>{row.High}</td>
                  <td>{row.Open}</td> */}
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{row.Vwap}</td>
                  <td>{row.Volume}</td>
                  <td></td>
                  <td></td>
                  <td>{row.Iv}</td>
                  <td>{row.Delta}</td>
                  <td>{row.Gamma}</td>
                  <td>{row.Theta}</td>
                  <td>{row.Vega}</td>
                  <td>{row.LTT}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MarketDataFeed;
