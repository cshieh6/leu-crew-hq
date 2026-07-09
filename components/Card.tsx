"use client";

import type { ReactNode } from "react";


type CardProps = {
  emoji?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};


export default function Card({
  emoji,
  title,
  subtitle,
  children,
}: CardProps) {

  return (

    <section
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: 24,
        padding: 24,
        background: "#fff",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >

      <div
        style={{
          display:"flex",
          alignItems:"center",
          gap:10,
          marginBottom:8,
        }}
      >

        {emoji && (
          <span
            style={{
              fontSize:28,
            }}
          >
            {emoji}
          </span>
        )}


        <h2
          style={{
            margin:0,
            fontSize:22,
          }}
        >
          {title}
        </h2>


      </div>


      {subtitle && (

        <p
          style={{
            marginTop:0,
            marginBottom:20,
            color:"#666",
          }}
        >
          {subtitle}
        </p>

      )}


      {children}


    </section>

  );

}