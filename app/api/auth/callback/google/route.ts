import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { supabaseAdmin } from "@/lib/supabaseAdmin";


export async function GET(
  request: NextRequest
) {

  const { searchParams } =
    new URL(request.url);


  const code =
    searchParams.get("code");


  if (!code) {

    return NextResponse.json(
      {
        error: "No authorization code received"
      },
      {
        status: 400
      }
    );

  }


  const oauth2Client =
    new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );


  const { tokens } =
    await oauth2Client.getToken(code);


  console.log(
    "GOOGLE TOKENS RECEIVED:",
    {
      hasAccessToken: !!tokens.access_token,
      hasRefreshToken: !!tokens.refresh_token
    }
  );


  if (!tokens.refresh_token) {

    return NextResponse.json(
      {
        error:
          "No refresh token received"
      },
      {
        status: 400
      }
    );

  }


  const {
    data,
    error
  } =
    await supabaseAdmin
      .from("google_connections")
      .insert({
        provider: "google",
        refresh_token: tokens.refresh_token
      })
      .select();


  console.log(
    "SUPABASE INSERT DATA:",
    data
  );


  console.log(
    "SUPABASE INSERT ERROR:",
    error
  );


  if (error) {

    return NextResponse.json(
      {
        error:
          "Failed to save Google connection",
        details:
          error.message
      },
      {
        status: 500
      }
    );

  }


  return NextResponse.json({
    message:
      "Google Calendar connected successfully!",
    saved:
      true
  });

}