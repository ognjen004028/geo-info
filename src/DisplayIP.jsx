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
      <h3>IP Address:</h3>
      <ul>
        <li>{ip}</li>
      </ul>
    </div>
  );
}

export default DisplayIP;