import { useState, useEffect } from "react";
import axios from "axios";

function DisplayIP() {
  //creating IP state
  const [ip, setIP] = useState("");

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    //console.log(res.data);
    setIP(res.data.ip);
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  return (
    <div>
      <h2>IP Address:</h2>
      <h4>{ip}</h4>
    </div>
  );
}

export default DisplayIP;