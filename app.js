/* =====================================================
   LA SHISH PREMIUM APP JS
   VERSION FINALE
===================================================== */


const numeroWhatsApp = "2250749020302";



const allProducts = [

...(window.MENU_PLATS || []),
...(window.MENU_PIZZAS || []),
...(window.MENU_TACOS || []),
...(window.MENU_BOISSONS || [])

]
.filter(p => p.disponible !== false)
.sort((a,b)=>Number(a.id)-Number(b.id));





let cart = JSON.parse(localStorage.getItem("laShishCart")) || [];

if(!Array.isArray(cart)){
cart=[];
}



let activeCategory="ALL";
let searchTerm="";
let currentModalProduct=null;






const el={


categoryTabs:document.getElementById("categoryTabs"),

menuContainer:document.getElementById("menuContainer"),

searchInput:document.getElementById("searchInput"),

resetSearch:document.getElementById("resetSearch"),

cartItems:document.getElementById("cartItems"),

cartTotal:document.getElementById("cartTotal"),

mobileTotal:document.getElementById("mobileTotal"),

whatsappBtn:document.getElementById("whatsappBtn"),

modal:document.getElementById("optionModal"),

modalContent:document.getElementById("modalContent"),

closeModal:document.getElementById("closeModal"),

mobileCartBtn:document.getElementById("mobileCartBtn"),

closeCartMobile:document.getElementById("closeCartMobile"),

cartPanel:document.querySelector(".cart-panel")

};







function saveCart(){

localStorage.setItem(
"laShishCart",
JSON.stringify(cart)
);

}







function formatPrice(n){

return Number(n||0)
.toLocaleString("fr-FR");

}





function normalize(str){

return String(str||"")
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g,"");

}







function debounce(fn,time){

let timer;

return (...args)=>{

clearTimeout(timer);

timer=setTimeout(()=>fn(...args),time);

};

}








function getProductImageSrc(p){

return `images/${p.id}.webp`;

}





function handleImageError(img){

let id=img.dataset.productId;


if(!img.dataset.try){

img.dataset.try="jpg";

img.src=`images/${id}.jpg`;

return;

}


if(img.dataset.try==="jpg"){

img.dataset.try="png";

img.src=`images/${id}.png`;

return;

}



img.src="images/no-image.webp";


}








function getCategories(){

const map=new Map();


allProducts.forEach(p=>{

if(!map.has(p.categorie))

map.set(
p.categorie,
p.id
);


});


return [...map.keys()];

}








function renderCategoryTabs(){


const cats=getCategories();


el.categoryTabs.innerHTML=`

<button class="${activeCategory==="ALL"?"active":""}"
data-category="ALL">

Tout

</button>


${cats.map(c=>`

<button

class="${activeCategory===c?"active":""}"

data-category="${c}">

${escapeHtml(c)}

</button>

`).join("")}

`;


}









function renderMenu(){


renderCategoryTabs();


let products=allProducts.filter(p=>{


if(activeCategory!=="ALL"
&&
p.categorie!==activeCategory)

return false;



if(searchTerm){


return normalize(

[
p.nom,
p.description,
p.categorie
].join(" ")

)
.includes(normalize(searchTerm));


}


return true;


});





if(!products.length){

el.menuContainer.innerHTML=

`
<div class="search-empty">

Aucun produit trouvé

</div>
`;

return;

}






const groups=groupBy(products,"categorie");



el.menuContainer.innerHTML=

Object.keys(groups).map(cat=>`


<section class="category-block open">


<button class="category-header">

${escapeHtml(cat)}

<span>▲</span>

</button>



<div class="category-content">


<div class="products-grid">


${groups[cat].map(productCard).join("")}


</div>


</div>


</section>


`).join("");



}









function productCard(p){



let prix;


if(p.type==="pizza"){


prix=

Math.min(...p.tailles.map(t=>t.prix))
+
" FCFA";

}

else{


prix=

formatPrice(p.prix)
+" FCFA";


}



return `


<article class="product-card">


<img

class="product-img"

src="${getProductImageSrc(p)}"

loading="lazy"

decoding="async"

data-product-id="${p.id}"

onerror="handleImageError(this)"

>



<h4>

${escapeHtml(p.nom)}

</h4>


<p>

${escapeHtml(p.description||"")}

</p>



<div class="price">

${prix}

</div>



<button

class="add-btn"

data-add="${p.id}">

Ajouter

</button>



</article>


`;

}










function groupBy(arr,key){

return arr.reduce((o,x)=>{

(o[x[key]]??=[]).push(x);

return o;

},{});

}










function addToCart(item){


const key=item.productId+"-"+item.optionsText;


let exist=cart.find(x=>x.key===key);



if(exist){

exist.qty++;

}

else{


cart.push({

...item,

key,

qty:1

});


}



saveCart();

renderCart();


el.mobileCartBtn.classList.add("cart-bounce");


setTimeout(()=>{

el.mobileCartBtn.classList.remove("cart-bounce");

},500);


showToast("Ajouté au panier 🛒");


}









function getTotal(){

return cart.reduce(
(a,b)=>a+(b.prix*b.qty),
0
);

}








function renderCart(){


if(!cart.length){


el.cartItems.innerHTML=

"Votre panier est vide.";


}

else{


el.cartItems.innerHTML=

cart.map(i=>`

<div class="cart-item">


<b>

${i.qty} x ${escapeHtml(i.nom)}

</b>


<p>

${i.optionsText||""}

</p>


<button data-minus="${i.key}">-</button>

${i.qty}

<button data-plus="${i.key}">+</button>


<button data-remove="${i.key}">

❌

</button>


</div>


`).join("");

}


let total=formatPrice(getTotal());


el.cartTotal.textContent=total;

el.mobileTotal.textContent=total;


}










function sendWhatsApp(){


if(!cart.length){

showToast("Panier vide");

return;

}



let name=clientName.value.trim();

let phone=clientPhone.value.trim();

let zone=clientZone.value.trim();

let address=clientAddress.value.trim();



if(!name||!phone||!zone||!address){

showToast("Complétez vos informations");

return;

}




let msg=

`🔥 *COMMANDE LA SHISH* 🔥\n\n`+

`👤 ${name}\n`+

`📞 ${phone}\n`+

`📍 ${zone}\n`+

`🏠 ${address}\n\n`;


msg+="🛒 Commande:\n";



cart.forEach(i=>{


msg+=

`\n${i.qty}x ${i.nom}`;

if(i.optionsText)

msg+=`\n${i.optionsText}`;


msg+=`\n${i.prix*i.qty} FCFA\n`;


});



msg+=

`\n💰 TOTAL ${formatPrice(getTotal())} FCFA`;



window.open(

`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(msg)}`,

"_blank"

);


}










function showToast(t){


let x=document.createElement("div");


x.className="toast";


x.textContent=t;


document.body.appendChild(x);


setTimeout(()=>x.remove(),2000);


}










function escapeHtml(s){

return String(s||"")
.replace(/[&<>"']/g,m=>({

"&":"&amp;",
"<":"&lt;",
">":"&gt;",
'"':"&quot;",
"'":"&#039;"

}[m]));


}










document.addEventListener("click",e=>{


let add=e.target.closest("[data-add]");

if(add){

let p=allProducts.find(
x=>x.id==add.dataset.add
);


addToCart({

productId:p.id,

nom:p.nom,

prix:p.prix,

optionsText:""

});


}




let tab=e.target.closest("[data-category]");


if(tab){

activeCategory=tab.dataset.category;

renderMenu();

}



let plus=e.target.closest("[data-plus]");

if(plus){

let i=cart.find(x=>x.key===plus.dataset.plus);

i.qty++;

saveCart();

renderCart();

}



let minus=e.target.closest("[data-minus]");

if(minus){

let i=cart.find(x=>x.key===minus.dataset.minus);

i.qty--;

if(i.qty<=0)

cart=cart.filter(x=>x!==i);


saveCart();

renderCart();

}




});







el.searchInput.addEventListener(

"input",

debounce(e=>{

searchTerm=e.target.value;

renderMenu();

},300)

);



el.resetSearch.onclick=()=>{

searchTerm="";

el.searchInput.value="";

renderMenu();

};





el.whatsappBtn.onclick=sendWhatsApp;



el.mobileCartBtn.onclick=()=>{

el.cartPanel.classList.add("open");

};



el.closeCartMobile.onclick=()=>{

el.cartPanel.classList.remove("open");

};





renderMenu();

renderCart();
