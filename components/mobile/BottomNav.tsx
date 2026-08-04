"use client";

type BottomNavProps = {
  activeTab:string;
  setActiveTab:(tab:string)=>void;
};


export default function BottomNav({
  activeTab,
  setActiveTab
}:BottomNavProps){


const tabs = [
  {
    id:"home",
    label:"Home",
    icon:"🏠"
  },
  {
    id:"shopping",
    label:"Shop",
    icon:"🛒"
  },
  {
    id:"tasks",
    label:"Tasks",
    icon:"✅"
  },
  {
    id:"calendar",
    label:"Calendar",
    icon:"📅"
  },
  {
    id:"family",
    label:"Family",
    icon:"👨‍👩‍👦"
  }
];


return (

<nav
style={{
position:"fixed",
bottom:0,
left:0,
right:0,
height:70,
background:"white",
borderTop:"1px solid #ddd",
display:"flex",
justifyContent:"space-around",
alignItems:"center",
zIndex:100
}}
>

{
tabs.map(tab=>(

<button
key={tab.id}
onClick={()=>setActiveTab(tab.id)}
style={{
background:"none",
border:"none",
fontSize:13,
display:"flex",
flexDirection:"column",
alignItems:"center",
gap:4,
opacity:
activeTab===tab.id ? 1 : .5
}}
>

<span
style={{
fontSize:24
}}
>
{tab.icon}
</span>

{tab.label}

</button>

))

}

</nav>

);

}