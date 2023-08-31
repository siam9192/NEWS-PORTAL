



// const sorting = [...categoriesItem]
// for (let i = 0; i < sorting.length - 1; i++) {
//   for (let j = 0; j < sorting.length - i - 1; j++) {
//     if (sorting[j].total_view < sorting[j + 1].total_view) {
      
//       let temp = sorting[j];
//       sorting[j] = sorting[j + 1];
//        sorting[j + 1] = temp;
    
//     }
//   }
// }




const array = [1,2,3,4,6,7,8];
let c ;
let arr = []
// console.log(array[-1])
for(let i = 0; i< array.length-1; i++){
    for(let x = 0; x < array.length -i -1; x ++){
        
       if(array[x] < array[x+1]){

const temp = array[x];
array[x] = array[x+1]
array[x + 1] = temp;


       }
       
    } 
arr.push(c)
    if(array[0] < c){
arr.push(array[0])
    }

    
}

console.log(array)
console.log(arr)

// console.log(c)