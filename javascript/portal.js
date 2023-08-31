// global variable
const card_container = document.getElementById('card-container');
const loadMoreButtonDiv = document.getElementById('loadMoreDiv');
const loadMoreButton = document.getElementById('load-more');
const loadingBottom = document.getElementById('loading-bottom');
let cat_list;
// let x = 4;
let cat_id = 0;
// show category list
let x = 4;
  
async function loadCategory(){
const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
const categories_object = await response.json();
// console.log(categories_object.data)
const dataMain = categories_object.data.news_category;
console.log(dataMain)
loadCategoryList(dataMain)

}

loadCategory()



function loadCategoryList (categories){
    console.log(categories)
    const slice_categories = categories.slice(0,5)
slice_categories.forEach((categorie)=> {

    const categories_container = document.getElementById('cartegories-container');
    const div = document.createElement('div');
 div.className = 'px-3 py-2 '
   div.innerHTML = `
   <li class="list-none text-2xl font-medium tab border-[2px] text-center" onclick = "getData('${categorie.category_id}')">${categorie.category_name}</li>`
categories_container.appendChild(div)
   
// console.log(categorie)
})

}

async function getData (id){
  cat_id = id;
   
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    const categoriesItem = data.data;
    card_container.innerHTML = ''
    if(sort_input.value === 'Sort By view'){
      sortByData(cat_id)
    }
    else{
   loadData(categoriesItem) }
  console.log(id)
  x = 4;
  
}

getData("01")



   
const loadData = (categoriesItem) =>{

  
  if(categoriesItem.length > 4){
    loadMoreButtonDiv.classList.remove('hidden')
  
}
else{
  loadMoreButtonDiv.classList.add('hidden')
}
console.log(categoriesItem)

let slice = categoriesItem.slice(0,x);
console.log(categoriesItem.slice(0,8))
card_container.innerHTML = ''
slice.forEach(data=>{
    const card = document.createElement('div');
  card.classList = 'card flex gap-4 flex-col items-center p-10 bg-white shadow-md rounded-lg border-gray-300 border-[2px]'

  card.innerHTML = `
  <div class = 'lg:w-1/2'>

  <img src=${data.image_url} />
  </div>
  <div class="space-y-5">
    <h1 class="lg:text-3xl md:text-3xl text-2xl text-black font-medium">${data.title}</h1>
    <p>${data?.details.slice(0,500)}...</p>
      <div class="deatails  ">
        <div class="flex gap-5 lg:items-center md:items-center justify-between lg:flex-row md:flex-row flex-col ">
        
  <div class="flex gap-2 items-center">
  <div class="w-14 ">
    <img src= ${data.author.img}  class = "rounded-full"/>
  </div>
  <div class="flex flex-col">
    <p class=" text-black font-semibold" id="author-name">${data.author.name}</p>
  <p class="" id="date">${data.author.published_date}</p>
  </div>
  
</div>

<div class="flex lg:flex-row md:flex-row flex-row gap-5">
<div class="flex gap-1 items-center">
<i class="fa-regular fa-eye text-xl"></i>
<h1 class="text-xl textgray-600 font-semibold"> ${data?.total_view}</h1>
</div>
<div class="flex flex-row text-black text-xl">
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star"></i>
<i class="fa-solid fa-star"></i>
</div>
</div>
<div class = "lg:text-start md:text-start text-center ">
<i class="fa-solid fa-arrow-right text-blue-700 text-3xl"></i>
</div>
</div>
</div>
</div>

  
  `

  card_container.appendChild(card)

 
})  
loadingBottom.classList.add('hidden')

const card = card_container.querySelectorAll('.card');
if(categoriesItem.length === card.length){
  loadMoreButtonDiv.classList.add('hidden')
}

else{
  loadMoreButtonDiv.classList.remove('hidden')
}
const sort_input = document.getElementById('sort-input');
if(sort_input.value !== 'Sort By view'){
  x = 4;
}

}
let y;
loadMoreButton.addEventListener('click',()=>{
  x += 3;
 y = x;
  loadMoreButtonDiv.classList.add('hidden')
  loadingBottom.classList.remove('hidden')
x+=3
  setTimeout(()=>{
    if(sort_input.value === 'Sort By view'){
      
      sortByData(cat_id)
    }
    
    else{
  
    getData(cat_id)}
  },2000)
 
  loadMoreButtonDiv.classList.add('hidden')
  
})

const sort_input = document.getElementById('sort-input');
sort_input.addEventListener('change',()=>{
  if(sort_input.value === 'Sort By view'){
    if(x > 4){
      x = y;
    }
    sortByData(cat_id)
    console.log(x)
  }
})


async function sortByData (id){
  cat_id = id;
   const array = [];
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    const categoriesItem = data.data;
    console.log(categoriesItem)
    card_container.innerHTML = ''

   const sorting = [...categoriesItem]
    for (let i = 0; i < sorting.length - 1; i++) {
      for (let j = 0; j < sorting.length - i - 1; j++) {
        if (sorting[j].total_view < sorting[j + 1].total_view) {
          
          let temp = sorting[j];
          sorting[j] = sorting[j + 1];
           sorting[j + 1] = temp;
        
        }
      }
    }
   
console.log(sorting)
console.log(array)
loadData(sorting)

}
  

setTimeout(()=>{
  const container = document.getElementById('cartegories-container');

  const list = container.querySelectorAll('.tab');
//   list.forEach((li,index) =>{
//     li.addEventListener('click',()=>{
//       console.log(78999)
//     })
//   })
// }
console.log(container)
console.log(list)
list.forEach((li,index)=>{
 li.addEventListener('click',()=>{
  li.classList.add("border-black")
  li.classList.add('bg-gray-300')
  li.classList.add('text-black')
  for(let i = 0 ; i < list.length; i++){
  
    if(i === index){
     
      continue
    }
    else{
      list[i].classList.remove('border-black')
      list[i].classList.remove('bg-gray-300')
  list[i].classList.remove('text-black')
    }
   
  }
 }) 
})

}
,1000
)