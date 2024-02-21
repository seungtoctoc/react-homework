import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useEffect, useState } from "react";

import Board from "./components/Board";
import Header from "./components/Header";

function App() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    getCampaigns();
  }, []);

  const getCampaigns = async () => {
    try {
      const campaignUrl = "/api/campaign";
      const campaignResp = await axios.get(campaignUrl);

      setCampaigns(campaignResp.data);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <div className="App">
      <Header></Header>
      <Board campaigns={campaigns}></Board>
    </div>
  );
}

export default App;
