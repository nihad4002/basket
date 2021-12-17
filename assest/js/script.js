addcard = document.querySelectorAll(".addcard")
let basket=localStorage.getItem("basket")
if(localStorage.getItem("basket")===null){
    localStorage.setItem("basket",JSON.stringify([]))
}
addcard.forEach((card) => {
    card.addEventListener("click",function(e){
        e.preventDefault();
        if(localStorage.getItem("basket")===null){
            localStorage.setItem("basket",JSON.stringify([]))
        }
        let basket=JSON.parse(localStorage.getItem("basket"));
        let cost = this.previousElementSibling.children[0].innerText;
        let model = this.parentElement.children[0].innerText;
        let img = this.parentElement.previousElementSibling.src;
        let id = this.getAttribute("data-id");
        
        let existproduct = basket.find((value)=>value.id==id)
        
        if(existproduct==undefined){
            let product={
                cost,
                model,
                img,
                id,
                count : 1
            }
    
            basket.push(product)
        }
        else{
            existproduct.count++
        }        

        localStorage.setItem("basket",JSON.stringify(basket))
        countproduct();
        totalprice();

        
    })
});



let shoppingbasket = document.querySelector(".shoppingbasket")
let div = document.createElement("div")
div.style.width = "200px"
div.style.height = "600px"
div.style.top="65px"
div.style.left="1316px"
div.style.position="fixed"
div.style.border="1px solid black"
div.style.overflow = "scroll"

shoppingbasket.addEventListener("click",function(){
    if(localStorage.getItem("basket") === null || localStorage.getItem("basket") == "[]"){
        let p = document.createElement("p")
        div.style.top="65px"
        div.style.left="1316px"
        div.style.position="fixed"
        div.style.border="1px solid black"
        p.innerText="you basket empety"
        div.style.backgroundColor = "red"
        div.append(p)
        document.body.append(div)
    }
    let basket = JSON.parse(localStorage.getItem("basket"));
        

        basket.forEach((value)=>{
            let img = document.createElement("img")
            let cost = document.createElement("p")
            let count = document.createElement("p")

            img.src = value.img;
            cost.innerText = "Cost : " + value.cost;
            count.innerText = "Count : " + value.count;
            img.style.width = "200px"
            img.style.height = "200px"
            div.append(img,cost,count)
            document.body.append(div)
            localStorage.clear();
        })
})










function countproduct(){
    let basket = JSON.parse(localStorage.getItem("basket"));
    let countelement = document.querySelector(".countproduct");
    let count = 0;
    basket.forEach(function(value){
        count+=value.count
    })
    countelement.innerText = count;
}


function totalprice() {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let priceelement = document.querySelector(".totalprice");
    let total=0
    basket.forEach(function (value) {
        total+=value.cost*value.count
    })
    priceelement.innerText = total;
}