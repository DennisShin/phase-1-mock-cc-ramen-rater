// write your code here

function addRamen(ramen){
    const ramenImg = document.createElement("img");
    ramenImg.src = ramen.image;
    ramenImg.addEventListener("click", (e) => {
        console.log(ramen.id + " was clicked!")
        //change ramen details
        document.querySelector(".detail-image").src = ramen.image
        document.querySelector(".name").textContent = ramen.name
        document.querySelector(".restaurant").textContent = ramen.restaurant
        document.querySelector("#rating-display").textContent = ramen.rating
        document.querySelector("#comment-display").textContent = ramen.comment
    })
    document.querySelector("#ramen-menu").append(ramenImg);
}

fetch("http://localhost:3000/ramens")
.then(res => res.json())
.then(ramens => {
    ramens.forEach(ramen => {
       addRamen(ramen);
    })
})

document.querySelector("#new-ramen").addEventListener("submit", (e) => {
    e.preventDefault();
    let newRam = {
        "name": e.target.name.value,
        "restaurant": e.target.restaurant.value,
        "image": e.target.image.value,
        "rating": e.target.rating.value,
        "comment": e.target["new-comment"].value   
    }

    addRamen(newRam)
    document.querySelector("#new-ramen").reset();
})
