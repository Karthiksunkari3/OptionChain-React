// import OrderDataFeed from "./socket/OrderDataFeed";
import MarketDataFeed from "./optionChain/MarketDataFeed";
import Form from "./form/FormComponent";
import "./App.css";

function App() {
  const auth_token = "eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI3Q0FCUjYiLCJqdGkiOiI2NjQ1OGU5ZWVlMjliZDYxZjgxZjI5NzciLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaWF0IjoxNzE1ODM0NTI2LCJpc3MiOiJ1ZGFwaS1nYXRld2F5LXNlcnZpY2UiLCJleHAiOjE3MTU4OTY4MDB9.M_1PUZABcOpceVHrDS7ekzpYdWHAwycMQ644dwvyDzM";

  return (
    <div className="app-container">
      {/* <Form/> */}
      <MarketDataFeed token={auth_token} />
      {/* <OrderDataFeed token={auth_token} /> */}
    </div>
  );
}

export default App;
