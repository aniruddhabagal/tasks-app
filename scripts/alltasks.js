let user=JSON.parse(localStorage.getItem("user"))


let date = new Date()
const offset = date.getTimezoneOffset()
date = new Date(date.getTime() - (offset*60*1000))
let today= date.toISOString().split('T')[0]

let taskDetails=[]

let displayItems=[]

let prevData=JSON.parse(localStorage.getItem("pendingTasks"))

if(prevData)
{
    taskDetails=prevData
    
}

let displayTasks = ()=>{
    //console.log(displayItems)
    document.getElementById("ul").innerHTML=""
    if(displayItems.length>0){
        displayItems.map((item)=>{
            document.getElementById("ul").innerHTML+=item
        })
    }
    else{
    document.getElementById("ul").innerHTML=`
    <div style="font-weight: 600;
    font-size:xx-large;
    padding: 0;
    margin: 15px 15px;
    display:flex;
    justify-content: center;
    align-items: center;
    text-shadow: 0px 0px 9px rgba(253, 253, 253, 0.55);">
    No tasks!
    </div>
    `}


}

let fetchTasks=()=>{
        let tod=document.getElementById('dateInput').value
        let tr=JSON.parse(localStorage.getItem("pendingTasks"))
       // console.log(tr)
        displayItems=[]
        tr.forEach((element) => {
                if(element.date===tod)
                displayItems.push(
                    `<li>${element.task}</li>`
                )

        })    
       // console.log(tr)

      //  localStorage.setItem("pendingTasks",JSON.stringify(tr))

        //console.log(displayItems    )
        displayTasks()
       
    
}


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


     setTimeout(displayTime, 1000);
}

displayTime()

