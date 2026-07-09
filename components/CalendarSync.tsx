"use client";

import { useEffect, useState } from "react";


export default function CalendarSync() {

  const [syncing, setSyncing] =
    useState(false);

  const [lastSync, setLastSync] =
    useState<string | null>(null);



  async function syncCalendar(){

    try {

      setSyncing(true);


      await fetch(
        "/api/calendar/sync"
      );


      setLastSync(
        new Date()
          .toLocaleTimeString(
            [],
            {
              hour:"numeric",
              minute:"2-digit"
            }
          )
      );


    } catch(error){

      console.error(
        "Calendar sync failed",
        error
      );

    }
    finally {

      setSyncing(false);

    }

  }



  useEffect(() => {

    syncCalendar();

  }, []);



  return (

    <div
      style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-end",
        gap:6
      }}
    >

      <button
        onClick={syncCalendar}
        disabled={syncing}

        style={{
          border:"none",
          borderRadius:16,
          padding:"12px 18px",
          fontSize:16,
          cursor:"pointer",
          background:"#f5f5f5"
        }}
      >

        {
          syncing
          ?
          "⏳ Syncing..."
          :
          "🔄 Sync Calendar"
        }

      </button>


      {
        lastSync &&
        <span
          style={{
            fontSize:12,
            color:"#888"
          }}
        >
          Last synced {lastSync}
        </span>
      }


    </div>

  );

}