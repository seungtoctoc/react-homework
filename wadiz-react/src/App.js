import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import Board from "./components/Campaign";
import { useEffect, useState } from "react";

function App() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    getCampaigns();
  }, []);

  const getCampaigns = async () => {
    try {
      const campaignUrl = "/api/campaign";
      const campaignResp = await axios.get(campaignUrl);

      setCampaigns(campaignResp);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <div className="App">
      <Board campaigns={campaigns}></Board>
    </div>
  );
}

export default App;
