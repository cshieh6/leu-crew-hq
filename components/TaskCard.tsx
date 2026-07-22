"use client";

type Task = {
  id:number;
  text:string;
  completed:boolean;
  due_date?:string | null;
};


type TaskCardProps = {
  tasks:Task[];
  newTask:string;
  setNewTask:(value:string)=>void;

  newTaskDueDate:string;
  setNewTaskDueDate:(value:string)=>void;
  addTask:()=>void;
  deleteTask:(id:number)=>void;
  toggleTask:(id:number, completed:boolean)=>void;
};



function daysUntil(date:string){

  const today =
    new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );


  const target =
    new Date(date);

  target.setHours(
    0,
    0,
    0,
    0
  );


  return Math.ceil(
    (
      target.getTime()
      -
      today.getTime()
    )
    /
    86400000
  );

}



function TaskList({
  title,
  icon,
  tasks,
  deleteTask,
  toggleTask
}:{
  title:string;
  icon:string;
  tasks:Task[];
  deleteTask:(id:number)=>void;
  toggleTask:(id:number, completed:boolean)=>void;
}){


  if(tasks.length===0)
    return null;


  return (

    <div
      style={{
        marginTop:20
      }}
    >

      <h3>
        {icon} {title}
      </h3>


      {
        tasks.map(task=>(

          <div
            key={task.id}
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
                checked={task.completed}
                onChange={()=>
                  toggleTask(
                    task.id,
                    task.completed
                  )
                }
              />


              <div>

                <div
                  style={{
                    textDecoration:
                      task.completed
                      ?
                      "line-through"
                      :
                      "none",

                    opacity:
                      task.completed
                      ?
                      0.5
                      :
                      1
                  }}
                >
                  {task.text}
                </div>


                {
                  task.due_date &&

                  <small>
                    Due:{" "}
                    {
                      new Date(
                        task.due_date
                      )
                      .toLocaleDateString(
                        "en-US",
                        {
                          month:"short",
                          day:"numeric"
                        }
                      )
                    }
                  </small>

                }

              </div>

            </div>


            <button
              onClick={()=>
                deleteTask(
                  task.id
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





export default function TaskCard({

  tasks,
  newTask,
  setNewTask,
  newTaskDueDate,
  setNewTaskDueDate,
  addTask,
  deleteTask,
  toggleTask

}:TaskCardProps){



  const active =
    tasks.filter(
      task =>
        !task.completed
    );



  const overdue =
    active.filter(
      task =>
        task.due_date
        &&
        daysUntil(
          task.due_date
        ) < 0
    );



  const upcoming =
    active.filter(
      task =>
        !task.due_date
        ||
        daysUntil(
          task.due_date
        ) >= 0
    );



  const completed =
    tasks.filter(
      task =>
        task.completed
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
        ✅ Tasks
      </h2>



      <div
        style={{
          display:"flex",
          gap:8
        }}
      >

        <input

  style={{
    flex:1,
    padding:10,
    borderRadius:8,
    border:"1px solid #ccc"
  }}

  value={newTask}

  onChange={(e)=>
    setNewTask(e.target.value)
  }

  placeholder="Add task"

/>

<input

  type="date"

  value={newTaskDueDate}

  onChange={(e)=>
    setNewTaskDueDate(e.target.value)
  }

/>


        <button
          onClick={addTask}
        >
          Add
        </button>


      </div>




      <TaskList
        title="Overdue"
        icon="🔴"
        tasks={overdue}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
      />



      <TaskList
        title="Upcoming"
        icon="📋"
        tasks={upcoming}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
      />



      <TaskList
        title="Completed"
        icon="✅"
        tasks={completed}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
      />



    </section>

  );

}