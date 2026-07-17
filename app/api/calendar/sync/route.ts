import { NextResponse } from "next/server";
import { google } from "googleapis";
import { supabaseAdmin } from "@/lib/supabaseAdmin";


const LEU_CREW_CALENDAR_ID =
  "ed17b62359dc75125124c2bea3fe25ce943508034186b27860ed05aeae8b2653@group.calendar.google.com";



export async function GET() {


  const {
    data: connection,
    error: connectionError
  } =
    await supabaseAdmin
      .from("google_connections")
      .select("*")
      .order("created_at", {
        ascending:false
      })
      .limit(1)
      .single();



  if(connectionError || !connection){

    return NextResponse.json(
      {
        error:"No Google connection found"
      },
      {
        status:400
      }
    );

  }




  const oauth2Client =
    new google.auth.OAuth2(

      process.env.GOOGLE_CLIENT_ID,

      process.env.GOOGLE_CLIENT_SECRET,

      process.env.GOOGLE_REDIRECT_URI

    );



  oauth2Client.setCredentials({

    refresh_token:
      connection.refresh_token

  });




  const calendar =
    google.calendar({

      version:"v3",

      auth:oauth2Client

    });





  const response =
    await calendar.events.list({

      calendarId:
        LEU_CREW_CALENDAR_ID,


      timeMin:
        new Date().toISOString(),


      maxResults:50,


      singleEvents:true,


      orderBy:"startTime"

    });





  const googleEvents =
    response.data.items || [];





  for(const event of googleEvents){



    const start =
      event.start?.dateTime ||
      event.start?.date;



    const end =
      event.end?.dateTime ||
      event.end?.date;



    if(!start) continue;




    const isAllDayEvent =
      !!event.start?.date;




    const startDate =
      new Date(start);



    const endDate =
      end
        ? new Date(end)
        : null;






    const eventRecord = {


      google_event_id:
        event.id,



      title:
        event.summary ||
        "Untitled Event",



      date:

        isAllDayEvent

          ?

          event.start?.date

          :

          startDate.toLocaleDateString(
            "en-CA",
            {
              timeZone:
                "America/Los_Angeles"
            }
          ),




      start_time:

        event.start?.dateTime

          ?

          startDate.toLocaleTimeString(
            "en-US",
            {
              hour:"2-digit",
              minute:"2-digit",
              hour12:false,
              timeZone:
                "America/Los_Angeles"
            }
          )

          :

          null,





      end_time:

        endDate && event.end?.dateTime

          ?

          endDate.toLocaleTimeString(
            "en-US",
            {
              hour:"2-digit",
              minute:"2-digit",
              hour12:false,
              timeZone:
                "America/Los_Angeles"
            }
          )

          :

          null,





      source:
        "google",



      emoji:
        "📅",




      notes:
        event.description || null



    };






    console.log(
      "SYNCING EVENT:",
      eventRecord
    );






    const {
      data,
      error
    } =
      await supabaseAdmin
        .from("events")
        .upsert(

          eventRecord,

          {
            onConflict:
              "google_event_id"
          }

        )
        .select();





    console.log(
      "SUPABASE RESULT:",
      data
    );


    console.log(
      "SUPABASE ERROR:",
      error
    );



  }





  return NextResponse.json({

    synced:
      googleEvents.length,


    events:
      googleEvents.map(
        event =>
          event.summary
      )

  });



}