// fetching the data

const loadPhoneData = async (searchKeyword, dataLimit) => {
  // clear the previous loaded Phone Data
  const cardParent = document.getElementById("card-parent");
  cardParent.innerHTML = "";

  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchKeyword}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  const loadedPhoneData = data.data;
  displayPhone(loadedPhoneData,dataLimit)
  // slice fisrt 9 Result from the Data
 
};


//display with foreach 

const displayPhone=(loadedPhoneData,dataLimit)=>{

    if(dataLimit){
        document.getElementById('all-result-btn').classList.remove('hidden');
    }
    const firstTenResult = loadedPhoneData.slice(0,dataLimit);

    console.log(firstTenResult);
    firstTenResult.forEach((element) => {
      // console.log(element);
      makePhoneCard(element);
      spinner(false);
    });
}

//function of process Search
const processSearch = (dataLimit) => {
  const searchWord = document.getElementById("search-keyword");
  const searchPhoneModel = searchWord.value;
  loadPhoneData(searchPhoneModel,dataLimit);
//   searchWord.value = "";
};
// search button handler
document.getElementById("search-btn").addEventListener("click", function () {
  spinner(true);
  processSearch(9);
});
// Enter button handler
document
  .getElementById("search-keyword")
  .addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
      spinner(true);
      console.log("clicked");
      processSearch(9);
    } else {
    }
  });

//Click all result Button Handler

document
  .getElementById("all-result-btn")
  .addEventListener("click", function () {

    processSearch();
    document.getElementById('all-result-btn').classList.add('hidden');
    console.log('clicke show all');
  });

//make Phone Card Element Dinamically

const makePhoneCard = (phone) => {
  const { phone_name, image } = phone;

  const cardParent = document.getElementById("card-parent");
  const cardElement = document.createElement("div");
  cardElement.innerHTML = `
    <div class="card w-auto	bg-base-100 shadow-xl">
    <figure class="px-10 pt-10">
      <img src=${image} alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">${phone_name}</h2>
    
      <div class="card-actions">
        <button class="btn btn-primary">Details</button>
      </div>
    </div>
  </div>
    
    `;
  cardParent.appendChild(cardElement);
};

//spinner showing

const spinner = (spinnerStatus) => {
  const spinner = document.getElementById("spinner-gif");
  if (spinnerStatus == true) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};
