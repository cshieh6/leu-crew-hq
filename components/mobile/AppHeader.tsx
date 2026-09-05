"use client";

export default function AppHeader({
  title,
  subtitle
}:{
  title:string;
  subtitle?:string;
}){

return (

<div
style={{
marginBottom:20
}}
>

<h1
style={{
fontSize:30,
marginBottom:5
}}
>
{title}
</h1>


{
subtitle &&
<div
style={{
color:"#666",
fontSize:15
}}
>
{subtitle}
</div>
}

</div>

);

}