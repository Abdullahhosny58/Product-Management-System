let title = document.getElementById('title')
let price = document.getElementById('price')
let taxex = document.getElementById('taxex')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let moood = 'create';
let tmp;
// console.log(title, price, taxex, ads, discount, total, count, category, submit)

// get total
function getTotal()
{
    if (price.value != ''){
        let result = (+price.value + +taxex.value + +ads.value)
            - discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';

    }
}



// create product
let dataPro;
if (localStorage.product != null) {
   dataPro =JSON.parse(localStorage.product)
} else {
    dataPro = [];
}

submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase() ,
        price: price.value,
        taxex: taxex.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category:category.value.toLowerCase(),
    }
    
    if (moood === 'create') {
    if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++){
        dataPro.push(newPro)
        }
        }else {
        dataPro.push(newPro)
            
    }
}else {
        dataPro[tmp] = newPro
        moood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }
    dataPro.push(newPro)
    localStorage.setItem('product', JSON.stringify(dataPro))
    
    clearData()
    showDate()
}    


// cleardate
function clearData() {
    title.value = '';
    price.value= '';
    taxex.value= '';
    ads.value= '';
    discount.value= '';
    total.innerHTML= '';
    count.value= '';
    category.value= '';
}

// Read
function showDate()
{
    let table = '';  
    for (let i = 0; i < dataPro.length;i++){
        table += `
        <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxex}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateDate(${i})"  id="update">update</button></td>
                <td><button onclick =" deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `;
    getTotal()

    }   

    document.getElementById('tbody').innerHTML = table;
    let btnDeletee = document.getElementById('deleteAll ');
    
    // if (dataPro.length > 0) {
    //     btnDeletee.innerHTML = `
    //     <button onclik="deleteAll()"> Delete All  </button>
    // `
    // } else {
    //     btnDeletee.innerHTML=''
    // }
}
showDate()


// delete
function deleteData(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro);
    showDate()
}
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showDate()
}


//count


// update
function updateDate(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxex.value = dataPro[i].taxex;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none'
    category.value = dataPro[i].category;
    submit.innerHTML='Update'
    moood = 'update'
    tmp = i;
    scroll({
        top: 0,
        behavior:"smooth"
    })
}
// search
let search = document.getElementById('search')
let searchMood = 'title'
function getSearchMood(id) {
    if (id === 'searchTitle') {
        searchMood = 'title';
        search.placeholder = 'Search By Title'
    } else {
        searchMood = 'category';
         search.placeholder = 'Search By Category'
    }
search.focus()
    search.value = '';
    showDate()
}
function searchDate(valeu) {
    let table = '';
    if (searchMood === 'title') {
    
        for (let i = 0; i < dataPro.length;i++ ){
            if (dataPro[i].title.includes(valeu.toLowerCase())) {
              table += `
        <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxex}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateDate(${i})"  id="update">update</button></td>
                <td><button onclick =" deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `;
        }
}
}

    else {
        for (let i = 0; i < dataPro.length;i++ ){
            if (dataPro[i].category.includes(valeu.toLowerCase())) {
            table += `
        <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxex}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateDate(${i})"  id="update">update</button></td>
                <td><button onclick =" deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `;
        }
}
    }
    document.getElementById('tbody').innerHTML = table;
    
}