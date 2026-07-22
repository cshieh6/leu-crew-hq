"use client";

type Discussion = {
  id:number;
  text:string;
  completed:boolean;
  category?:string | null;
  priority?:string | null;
};


type DiscussCardProps = {

  discussions:Discussion[];

  newDiscussion:string;
  setNewDiscussion:(value:string)=>void;

  newDiscussionCategory:string;
  setNewDiscussionCategory:(value:string)=>void;

  newDiscussionPriority:string;
  setNewDiscussionPriority:(value:string)=>void;

  addDiscussion:()=>void;

  deleteDiscussion:(id:number)=>void;

  toggleDiscussion:(
    id:number,
    completed:boolean
  )=>void;

};



const categories = [
  "General",
  "Kids",
  "House",
  "Travel",
  "Money",
  "Health",
  "Work"
];



const priorities = [
  "Normal",
  "High"
];



function DiscussionList({
  title,
  icon,
  discussions,
  toggleDiscussion,
  deleteDiscussion
}:{
  title:string;
  icon:string;
  discussions:Discussion[];
  toggleDiscussion:(
    id:number,
    completed:boolean
  )=>void;
  deleteDiscussion:(id:number)=>void;
}){


  if(discussions.length===0)
    return null;


  return (

    <div
      style={{
        marginBottom:20
      }}
    >

      <h3>
        {icon} {title}
      </h3>


      {
        discussions.map(item=>(

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
                checked={
                  item.completed
                }
                onChange={()=>
                  toggleDiscussion(
                    item.id,
                    item.completed
                  )
                }
              />


              <span
                style={{
                  textDecoration:
                    item.completed
                    ? "line-through"
                    : "none",

                  opacity:
                    item.completed
                    ? 0.5
                    : 1
                }}
              >
                {item.text}
              </span>


            </div>



            <button
              onClick={()=>
                deleteDiscussion(
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

  );

}





export default function DiscussCard({

  discussions,

  newDiscussion,
  setNewDiscussion,

  newDiscussionCategory,
  setNewDiscussionCategory,

  newDiscussionPriority,
  setNewDiscussionPriority,

  addDiscussion,

  deleteDiscussion,

  toggleDiscussion

}:DiscussCardProps){



  const active =
    discussions.filter(
      item =>
        !item.completed
    );



  const completed =
    discussions.filter(
      item =>
        item.completed
    );



  const highPriority =
    active.filter(
      item =>
        item.priority === "High"
    );



  const grouped =
    categories.map(category=>({

      category,

      items:
        active.filter(
          item =>
            item.category === category
            &&
            item.priority !== "High"
        )

    }));



  const noCategory =
    active.filter(
      item =>
        !item.category
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
        💬 To Discuss
      </h2>



      <div
        style={{
          display:"flex",
          gap:8,
          marginBottom:20
        }}
      >

        <input
          style={{
            flex:1,
            padding:10,
            borderRadius:8,
            border:"1px solid #ccc"
          }}

          value={
            newDiscussion
          }

          onChange={(e)=>
            setNewDiscussion(
              e.target.value
            )
          }

          placeholder="Add discussion topic"
        />



        <select

          value={
            newDiscussionCategory
          }

          onChange={(e)=>
            setNewDiscussionCategory(
              e.target.value
            )
          }

        >

          {
            categories.map(category=>(

              <option
                key={category}
                value={category}
              >
                {category}
              </option>

            ))
          }

        </select>



        <select

          value={
            newDiscussionPriority
          }

          onChange={(e)=>
            setNewDiscussionPriority(
              e.target.value
            )
          }

        >

          {
            priorities.map(priority=>(

              <option
                key={priority}
                value={priority}
              >
                {priority}
              </option>

            ))
          }

        </select>



        <button
          onClick={addDiscussion}
        >
          Add
        </button>


      </div>





      <DiscussionList
        title="High Priority"
        icon="🔥"
        discussions={
          highPriority
        }
        toggleDiscussion={
          toggleDiscussion
        }
        deleteDiscussion={
          deleteDiscussion
        }
      />



      {
        grouped.map(group=>(

          <DiscussionList

            key={
              group.category
            }

            title={
              group.category
            }

            icon="📌"

            discussions={
              group.items
            }

            toggleDiscussion={
              toggleDiscussion
            }

            deleteDiscussion={
              deleteDiscussion
            }

          />

        ))
      }




      <DiscussionList
        title="Other"
        icon="📝"
        discussions={
          noCategory
        }
        toggleDiscussion={
          toggleDiscussion
        }
        deleteDiscussion={
          deleteDiscussion
        }
      />



      <DiscussionList
        title="Completed"
        icon="✅"
        discussions={
          completed
        }
        toggleDiscussion={
          toggleDiscussion
        }
        deleteDiscussion={
          deleteDiscussion
        }
      />


    </section>

  );

}