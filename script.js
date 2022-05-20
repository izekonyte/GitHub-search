"use strict"

const API_URL = "https://api.github.com/users/"
const app = document.getElementById("app")
const form = document.querySelector("form")
const search = document.querySelector("input")

// load  git  hub users  data 
function loadGitHub(name){
    return fetch (API_URL + name).then(responce => responce.json())
}


function loadCardData(data){

   app.innerHTML = 
   `
   <div class="card">
    <div>
        <img class =" avatar": src="${data.avatar_url}" alt="${data.name}">
    </div>
    <div class="user-info">
        <h2>${data.name}</h2>
        <p>${data.bio}</p>
<ul>
    <li>${data.followers} <strong>Folowers</strong></li>
    <li>${data.following} <strong>Folowing</strong></li>
    <li>${data.public_repos} <strong>repos</strong></li>
</ul>
<div id="repos">
    
    </div>
</div>
</div>
   
   `
   console.log(data)
  
}
// load  Git Hub reposzitorys  
function loadRepos(name){
    return fetch (API_URL + name + "/repos").then(responce => responce.json())
}

function addReposToCard(repos){
var allRepos = document.getElementById("repos")
var reposSlice = repos.slice(0, 10)



reposSlice.forEach(x =>{
    var reposEl = document.createElement("a")
    reposEl.classList.add("repo")
    reposEl.innerText = x.name
    reposEl.href = x.html_url
    reposEl.target = "_blank"
    allRepos.append(reposEl)
})
 
}

form.addEventListener("submit", function(e){
    e.preventDefault()
    var  user = search.value
    if(user){
loadGitHub(user).then(loadCardData)

loadRepos(user).then(addReposToCard)
    }
    search.value = ""
})


// First Load
loadGitHub("izekonyte").then(loadCardData)
loadRepos("izekonyte").then(addReposToCard)