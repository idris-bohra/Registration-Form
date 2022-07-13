console.log("i am running")

let display_name = document.getElementById('display_name');
let display_age = document.getElementById('display_age');
let display_number = document.getElementById('display_number');

let named = document.getElementById('name');
let age = document.getElementById('age');
let number = document.getElementById('number');

let num;




display_name.style.display = "none";
display_age.style.display = "none";
display_number.style.display = "none";


try{named.addEventListener("change" , (e)=>{
    if(e.target.value.length < 3)
    {
        
        display_name.style.display = "block";
        display_name.style.color = "red"

    }
    else
    {
        display_name.style.display = "none";
    }
    
})}
catch{
    console.log(err);
}

try
{age.addEventListener("change" , (e)=>{
    if(e.target.value.length > 2 || e.target.value.length === 0 || e.target.value === "0")
    {
        
        display_age.style.display = "block";
        display_age.style.color = "red"

    }
    else
    {
        display_age.style.display = "none";
    }
    
})}
catch(err)
{
    console.log(err);
}

try
{ 
number.addEventListener("change" , (e)=>{
    if(e.target.value.length > 10 || e.target.value.length < 10)
    {
        
        display_number.style.display = "block";
        display_number.style.color = "red"

    }
    else
    {
        display_number.style.display = "none";
    }
    
})
}
catch(err)
{
    console.log(err);
}
// function fun()
// {
//     if(display_number.style.display !== "none")
//     {
//         // location.reload();
//         console.log("red")
//     }
// }