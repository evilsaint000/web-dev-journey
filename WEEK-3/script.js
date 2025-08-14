let ctr=1;
function deletetodo(id){
    const div = document.getElementById(id);
    div.parentNode.removeChild(div);
}



function addtodo(){
    const inputEl = document.querySelector('input');
    const value = inputEl.value;

    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', ctr);
    
    newDiv.innerHTML = "<div>" + value + "<button onclick='deletetodo("+ctr+")'>delete</button></div>";
    ctr++;
    document.querySelector('body').appendChild(newDiv);

    function deletetodo(){

    }

}