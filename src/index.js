// write your code here
const deleteForm = document.querySelector("#delete-ramen");
let idCounter = 1
let selectedId;

//Show Ramens!
fetch("http://localhost:3000/ramens")
.then(res => res.json())
.then(ramens => {
    selectedId = ramens[0].id;
    ramens.forEach(ramen => addRamen(ramen))
    showRamen(ramens[0])
})

//Add New Ramen Image!
function addRamen(ramen){
    const ramenImg = document.createElement("img");
    ramenImg.src = ramen.image;
    ramenImg.addEventListener("click", (e) => {
        console.log(ramen.id + " was clicked!")
        //For change and delete handling
        selectedId = ramen.id;
        //change ramen details
        showRamen(ramen)
    })
    document.querySelector("#ramen-menu").append(ramenImg);
    idCounter++;
}

//Show Selected Ramen Details!
function showRamen(ramen){
        document.querySelector(".detail-image").src = ramen.image
        document.querySelector(".name").textContent = ramen.name
        document.querySelector(".restaurant").textContent = ramen.restaurant
        document.querySelector("#rating-display").textContent = ramen.rating
        document.querySelector("#comment-display").textContent = ramen.comment
}

//New Ramen Form Handler!
document.querySelector("#new-ramen").addEventListener("submit", (e) => {
    e.preventDefault();
    //New ramen details based on form values!
    let newRam = {
        "id": idCounter,
        "name": e.target.name.value,
        "restaurant": e.target.restaurant.value,
        "image": e.target.image.value,
        "rating": parseInt(e.target.rating.value),
        "comment": e.target["new-comment"].value   
    }
    fetch("http://localhost:3000/ramens",{
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(newRam)
    })
    .then(res => res.json())
    .then(ramen => {
        selectedId = ramen.id
        addRamen(ramen)
        showRamen(ramen)
        document.querySelector("#new-ramen").reset();
    })
})

//Edit Ramen Form Handler!
document.querySelector("#edit-ramen").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(selectedId)
    fetch(`http://localhost:3000/ramens/${selectedId}`, {
        method: "PATCH",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify({
            "rating":parseInt(e.target.rating.value),
            "comment": e.target["new-comment"].value
        })
    })
    .then(res => res.json())
    .then(newRamen => {
        console.log(newRamen)
        showRamen(newRamen)
        alert("Item Updated!")
        document.querySelector("#edit-ramen").reset();
    })
    // document.querySelector("#rating-display").textContent = parseInt(e.target.rating.value);
    // document.querySelector("#comment-display").textContent = e.target["new-comment"].value;
})

//Delete Ramen Form Handler!
deleteForm.addEventListener("submit", (e) => {
    fetch(`http://localhost:3000/ramens/${selectedId}`, {
        method: "DELETE"
    })
})


