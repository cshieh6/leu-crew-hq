"use client";

import Card from "@/components/Card";


type DashboardCardProps = {
  title: string;
  icon: string;
  count: string;
  children: React.ReactNode;
};


export default function DashboardCard({
  title,
  icon,
  count,
  children,
}: DashboardCardProps) {

  return (

    <Card
      emoji={icon}
      title={title}
      subtitle={count}
    >

      {children}

    </Card>

  );

}