// import OrderDataFeed from "./socket/OrderDataFeed";
import MarketDataFeed from "./optionChain/MarketDataFeed";
import Form from "./form/FormComponent";
import "./App.css";

function App() {
  const auth_token = "eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI3Q0FCUjYiLCJqdGkiOiI2NjNmMTgwMjk4ODdhODM4YmZjODlkNjkiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaXNBY3RpdmUiOnRydWUsInNjb3BlIjpbImludGVyYWN0aXZlIiwiaGlzdG9yaWNhbCJdLCJpYXQiOjE3MTU0MTA5NDYsImlzcyI6InVkYXBpLWdhdGV3YXktc2VydmljZSIsImV4cCI6MTcxNTQ2NDgwMH0.Yd69G8dE3ZAmVngm_rtGN4Tp7BhT_4EL0knjcjJHzfkgit ";

  return (
    <div className="app-container">
      {/* <Form/> */}
      <MarketDataFeed token={auth_token} />
      {/* <OrderDataFeed token={auth_token} /> */}
    </div>
  );
}

export default App;
