let user=JSON.parse(localStorage.getItem("user"))
    //to get input of user name
    if(user)
    {
        console.log("hi")
    }
    else{  
        user=  prompt("Enter user name")
        if(user)
        localStorage.setItem("user",JSON.stringify(user))
        else{
            while(!user)
            user =  prompt("Enter user name")
        }
        localStorage.setItem("user",JSON.stringify(user))
    }

let date = new Date()
const offset = date.getTimezoneOffset()
date = new Date(date.getTime() - (offset*60*1000))
let today= date.toISOString().split('T')[0]

let taskDetails=[]
let todTaskDetails=[]
let displayItems=[]

//fetching data from previously stored arrays in local storage
let prevData=JSON.parse(localStorage.getItem("pendingTasks"))
let todData=JSON.parse(localStorage.getItem("todaysTasks"))
if(prevData)
{
    taskDetails=prevData
    
}
if(todData)
{
    todTaskDetails=todData
    
}

//display tasks in tasks list area
let displayTasks = ()=>{
    console.log(displayItems)
    document.getElementById("ul").innerHTML=""
    if(displayItems.length>0){
        displayItems.map((item)=>{
            document.getElementById("ul").innerHTML+=item
        })
    }
    else{
    document.getElementById("ul").innerHTML=`
    <div style="font-weight: 600;
    font-size:x-large;
    padding: 0;
    margin: 15px 15px;
    display:flex;
    justify-content: center;
    align-items: center;
    text-shadow: 0px 0px 9px rgba(253, 253, 253, 0.55);">
    No Tasks for Today!
    </div>
    `}


}

//fetching tasks from localstorage
let fetchTasks=(tod)=>{
    let tr1=JSON.parse(localStorage.getItem("todaysTasks"))
    if(tr1)
    {
        displayItems=[]
        tr1.forEach((element) => {
                displayItems.push(
                    `<li>${element.task}</li>`
                )
        })
        displayTasks()
    }
    else{
    let count=0
        let tr=JSON.parse(localStorage.getItem("pendingTasks"))
        displayItems=[]
        tr.forEach((element) => {
            if(element.date===tod)
            { 
                displayItems.push({
                    date:element.date,
                    task:element.task
                })
                count++
            }
        })    
        tr.splice(0,count)

        localStorage.setItem("pendingTasks",JSON.stringify(tr))

        displayTasks()
        count=0
    }
}

//function to display date, time and welcome message
let displayTime=()=>{
    let date = new Date()
    let curDate=date.getDate()
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let curMonth=month[date.getMonth()]
    let day=weekday[date.getDay()]
    var hours=date.getHours()
    let minutes=date.getMinutes()
    let seconds=date.getSeconds()
    var time="AM"
    if(hours==0)
    {hours=12
        time="AM"
    }

    else if(hours >=12)
    {
        time="PM"
        if(hours>12)
            hours-=12
    }

    hours= hours < 10 ? `0${hours}` : hours
    minutes= minutes < 10 ? `0${minutes}` : minutes
    seconds= seconds < 10 ? `0${seconds}` : seconds
    document.getElementById('clock').innerText=`${hours}:${minutes}:${seconds} ${time} `    
    document.getElementById('date').innerText=`${curDate} ${curMonth}, ${day} `
    let message
    if((hours>=4 && hours<12) && time=="AM")
    {
    message=`Good Morning ${user}! Have a great day!`
    document.getElementsByTagName("body")[0].style.backgroundImage= `url("../img/morning.jpg")`
    }
    if((hours==12 || hours<4) && time=="PM")
   { message=`Happy Afternoon ${user}!`
   document.getElementsByTagName("body")[0].style.backgroundImage= `url("../img/morning.jpg")`
   }
    if((hours>=4 && hours<9) && time=="PM")
    {message=`Pleasant Evening ${user}!`
    document.getElementsByTagName("body")[0].style.backgroundImage= `url("../img/evening.jpg")`
    }

    if(((hours>=9 && hours<12) && time=="PM")||((hours==12 || hours<4) && time=="AM"))
    {message=`Have a Good Night ${user}!`
    document.getElementsByTagName("body")[0].style.backgroundImage= `url("../img/night.jpg")`
    }

    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    let today= date.toISOString().split('T')[0]

    document.getElementById('welcome').innerText=message
    document.getElementById("dateInput").setAttribute("min",today)

    if((hours==12 && minutes==00 && seconds==0 && time=="AM"))
    {
        localStorage.removeItem("todaysTasks")
        displayItems=[]
        localStorage.setItem("todaysTasks",displayItems)
        location.reload()
        fetchTasks(today)
    }

     setTimeout(displayTime, 1000);
}


let pushTask=(dateSelected, taskInput)=>{
    if(dateSelected===today)
    {
        todTaskDetails.push({
            date:dateSelected,
            task:taskInput
        })
        localStorage.setItem("todaysTasks",JSON.stringify(todTaskDetails))

    }
    else{
        taskDetails.push({
            date:dateSelected,
            task:taskInput
        })
        localStorage.setItem("pendingTasks",JSON.stringify(taskDetails))
         let tr1=JSON.parse( localStorage.getItem("pendingTasks"))
        tr1.sort((a,b)=>
            a.date.localeCompare(b.date)
        )
        localStorage.setItem("pendingTasks",JSON.stringify(tr1))
    }
}



let handleAddTask=()=>{
    let taskInput=document.getElementById('newTaskInput').value
    let dateSelected=document.getElementById('dateInput').value
    if (taskInput==="")
    alert("Enter valid task")
    else if(dateSelected==="")
    alert("Enter valid date")
    else
    { pushTask(dateSelected, taskInput)
        alert("Task added successfully!")
        document.getElementById('newTaskInput').value=""
        document.getElementById('dateInput').value=today
    }
    fetchTasks(today)

}

displayTime()


