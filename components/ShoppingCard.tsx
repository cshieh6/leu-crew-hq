"use client";

type Item = {
  id:number;
  text:string;
  completed:boolean;
  store?:string | null;
};


type ShoppingCardProps = {
  shopping:Item[];

  newItem:string;
  setNewItem:(value:string)=>void;

  newItemStore:string;
  setNewItemStore:(value:string)=>void;

  addItem:()=>void;
  deleteItem:(id:number)=>void;

  toggleShoppingItem:
  (
    id:number,
    completed:boolean
  )=>void;
};



const stores = [
  "Costco",
  "Target",
  "Trader Joe's",
  "99 Ranch Market",
  "Zion",
  "General"
];



export default function ShoppingCard({

  shopping,
  newItem,
  setNewItem,
  newItemStore,
  setNewItemStore,
  addItem,
  deleteItem,
  toggleShoppingItem

}:ShoppingCardProps){


  const grouped =
    stores.map(store=>({

      store,

      items:
        shopping.filter(
          item =>
            (item.store || "General")
            === store
        )

    }))
    .filter(
      group =>
        group.items.length > 0
    );



return (

<section

style={{
border:"1px solid #ddd",
borderRadius:16,
padding:20
}}

>


<h2>
🛒 Shopping
</h2>



<div
style={{
display:"flex",
gap:8,
marginBottom:10
}}
>


<input

style={{
flex:1,
padding:10,
borderRadius:8,
border:"1px solid #ccc"
}}

value={newItem}

onChange={
(e)=>
setNewItem(
e.target.value
)
}

placeholder="Add item"

/>



<select

value={newItemStore}

onChange={
(e)=>
setNewItemStore(
e.target.value
)
}

>

{
stores.map(store=>(

<option
key={store}
value={store}
>
{store}
</option>

))
}

</select>



<button
onClick={addItem}
>
Add
</button>


</div>





{
grouped.map(group=>(


<div

key={group.store}

style={{
marginTop:20
}}

>


<h3>
🏬 {group.store}
</h3>



{
group.items.map(item=>(


<div

key={item.id}

style={{

display:"flex",
justifyContent:"space-between",
alignItems:"center",

padding:10,
marginBottom:8,

borderRadius:8,
background:"#f7f7f7"

}}

>


<div
style={{
display:"flex",
gap:10,
alignItems:"center"
}}
>


<input

type="checkbox"

checked={item.completed}

onChange={()=>
toggleShoppingItem(
item.id,
item.completed
)
}

/>


<span

style={{

textDecoration:
item.completed
?
"line-through"
:
"none",

opacity:
item.completed
?
0.5
:
1

}}

>

{item.text}

</span>


</div>



<button

onClick={()=>
deleteItem(
item.id
)
}

style={{
border:"none",
background:"transparent",
cursor:"pointer"
}}

>
✕
</button>



</div>


))

}



</div>


))

}


</section>

);


}