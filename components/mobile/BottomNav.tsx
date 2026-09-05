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
height:75,
background:"white",
borderTop:"1px solid #eee",
boxShadow:"0 -2px 10px rgba(0,0,0,.08)",
display:"flex",
justifyContent:"space-around",
alignItems:"center",
padding:"0 8px",
zIndex:100
}}
>

{
tabs.map(tab=>{

const active = activeTab === tab.id;

return (

<button
key={tab.id}
onClick={()=>setActiveTab(tab.id)}
style={{
background:"none",
border:"none",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center",
gap:3,
fontSize:12,
fontWeight:active ? 700 : 400,
color:active ? "#000" : "#777",
cursor:"pointer",
flex:1,
height:"100%"
}}
>

<div
style={{
fontSize:24,
transform:active ? "scale(1.1)" : "scale(1)",
transition:"transform .15s"
}}
>
{tab.icon}
</div>


<div>
{tab.label}
</div>


{
active &&
<div
style={{
width:5,
height:5,
borderRadius:"50%",
background:"#000",
marginTop:3
}}
/>
}


</button>

)

})

}

</nav>

);

}