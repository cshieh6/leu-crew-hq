"use client";

import CalendarSync from "./CalendarSync";


export default function Header() {

  return (

    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24
      }}
    >

      <div>

        <h1
          style={{
            margin: 0,
            fontSize: 32
          }}
        >
          🏡 Leu Crew HQ
        </h1>


        <p
          style={{
            marginTop: 6,
            color: "#666"
          }}
        >
          Your family command center
        </p>

      </div>


      <CalendarSync />


    </header>

  );

}