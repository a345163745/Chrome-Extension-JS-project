
let inputtext = document.getElementById("input-el")
let inputbtn = document.getElementById("input-btn")
let listinput = document.getElementById("list1")
let clearbtn = document.getElementById("clear-btn")
let tabbtn = document.getElementById("tab-btn")
let table = []
let LocalCheck = JSON.parse(localStorage.getItem("table"))
if(LocalCheck){
    table = LocalCheck
    RenderArray(table)
}

tabbtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        table.push(tabs[0].url)
        localStorage.setItem("table", JSON.stringify(table) )
        RenderArray(table)
    })
})

clearbtn.addEventListener("click",function(){
    localStorage.clear()
    table = []
    RenderArray(table)
    
})

inputbtn.addEventListener("click",function(){
    table.push(inputtext.value)
    inputtext.value = ""
    localStorage.setItem("table",JSON.stringify(table))
    RenderArray(table)
})

function RenderArray(e){
    let text = ""
    for(let i =0;i<e.length;i++){
        text+=`
            <li> 
                <a target='_blank' href='${e[i]}'>
                    ${e[i]}
                </a>
            </li>
            `
    }
    listinput.innerHTML =text
}