//variables 
// function makeNewTrForEachElement() {
//     let tableHeading = document.querySelector('.ingredients')
//     let newTR = document.createElement('tr')
//     tableHeading.appendChild(newTR)

// }




function getFetch(){
    document.querySelector('img').classList.remove('hidden')
    document.querySelector('.imgContainer').classList.remove('hidden')
    document.querySelector('.tableContainer').classList.remove('hidden')
    const choice = document.querySelector('#barcodeInput').value
    const url = `https://world.openfoodfacts.org/api/v2/product/${choice}.json`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.status === 1){
            const item = new ProductInfo(data.product)
            item.showinfo()
            item.listIngredients()
        }else if(data.status === 0){
            alert(`Product ${choice} not found. Please try another`)
        }
        
    })
    .catch(err => {
        console.log(`err ${err}`)
    });
}

class ProductInfo {
    constructor(productData) {
        //I am passing in data.product
        this.name = productData.compared_to_category
        this.ingredients = productData.ingredients
        this.image = productData.image_url
    }
    showinfo() {
        document.querySelector('img').src = this.image
        document.querySelector('#productName').innerHTML = this.name
    }
    listIngredients(){
        let tableRef = document.querySelector('.ingredients')
        for (let i = 1; i < tableRef.rows.length;){
            tableRef.deleteRow(i)
        }
        if(!(this.ingredients == null)){
            for(let key in this.ingredients){
                let newRow = tableRef.insertRow(-1)
                let newCell = newRow.insertCell(0) 
                let vegCell = newRow.insertCell(1) 
                let productName = this.ingredients[key].text == null ? 'none' : this.ingredients[key].text
                let newITest = document.createTextNode(productName)
                let vegStatus = !(this.ingredients[key].vegetarian) ? 'unknown' : this.ingredients[key].vegetarian
                let newVText = document.createTextNode(vegStatus)
                newCell.appendChild(newITest)
                vegCell.appendChild(newVText)
                if(vegStatus === 'no'){
                    //turn item red
                    vegCell.classList.add('red')
                }else if (vegStatus === 'unknown' || vegStatus === 'maybe'){
                    vegCell.classList.add('yellow')
                }
            }
            }
        }
       
    }



//event listener 
document.querySelector('#submit').addEventListener('click', getFetch)


// append items function 

// function appendItems(nameValue,yesOrNo){
//     ingredientTableInput.append(nameValue)
//     nameValue.append(yesOrNo)
// }

// function appendThTr(){
//      document.querySelector(tableHeading).appendChild(ingredientTableInput)
// }