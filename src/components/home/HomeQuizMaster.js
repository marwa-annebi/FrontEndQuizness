import axios from "axios";
import React, { useEffect, useState } from "react";
import "./../../css/homeQuizmaster.css";
export default function HomeQuizMaster() {
  const [companySettings, setcompanySettings] = useState([]);
  // const [domain_name, setdomain_name] = useState(null);
  const [subdomain, setSubDomain] = useState(null);
  useEffect(() => {
		const host = window.location.host; // gets the full domain of the app

		const arr = host  
			.split(".")
			.slice(0, host.includes("localhost") ? -1 : -2);
		if (arr.length > 0) setSubDomain(arr[0]);
    getCompanySettings();

	}, [companySettings])
  const getCompanySettings = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    let host = window.location.hostname;
    // let hostname = baseurl(host);

    const { data } = await axios.get(
      "/auth/getCompanySettings",
      { domainName: host },
      config
    );
  };


  return (
    // <div className="app">
    //   {companySettings ? (
    //     <div>
    //       <h1>Username</h1>
    //       <h3>{companySettings.firstName}</h3>
    //       {/* <h1>Age</h1>
    //       <h3>{requestedUser.age}</h3>
    //       <h1>Hobbies</h1>
    //       <ul>
    //         {requestedUser.hobbies.map((hobby) => (
    //           <li key={hobby}>{hobby}</li>
    //         ))}
    //       </ul> */}
    //     </div>
    //   ) : (
    //     <h1>Not Found</h1>
    //   )}
    // </div>
    <h1>hello</h1>
  );
}
