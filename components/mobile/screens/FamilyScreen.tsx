"use client";

import FamilyCard from "@/components/FamilyCard";
import KidsCard from "@/components/KidsCard";
import PetCard from "@/components/PetCard";
import BottomNav from "../BottomNav";


export default function FamilyScreen({
family,
events,
pets,
activeTab,
setActiveTab
}:any){

return (

<main
style={{
padding:20,
maxWidth:1200,
margin:"0 auto",
fontFamily:"system-ui"
}}
>

<h1>
👨‍👩‍👦 Family
</h1>


<FamilyCard
members={family}
/>


<KidsCard
events={events}
/>


<PetCard
pets={pets}
/>


<BottomNav
activeTab={activeTab}
setActiveTab={setActiveTab}
/>

</main>

);

}
