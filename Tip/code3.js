const amt = document.getElementById("bill");
const tip = document.getElementById("tip");
const calc = document.getElementById("submit");
const tot = document.getElementById("p");

calc.addEventListener("click", ()=>{
    x = ((tip.value/100)*amt.value) + Number(amt.value)
    tot.textContent ="Total:$" + x
});