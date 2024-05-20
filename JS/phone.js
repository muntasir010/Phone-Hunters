const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // console.log('Is Show all', isShowAll);
    // display only first 12 phones
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        // console.log(phone);
        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl p-6`;
        // 3. set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
        alt="Phones" /></figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-accent">Show Details</button>
        </div>
        </div>
        `;
        // 4 append child
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// 
const handleShowDetail =async(id) =>{
    // console.log('Clicked show detial', id)
    // load single phone data
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone)=>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="" />
        <p><span>Storage:</Span>${phone?.mainFeatures?.storage}</p>
        <p><span>Display Size:</Span>${phone?.}</p>
        <p><span>GPS:</Span>${phone?.others?.GPS || 'GPS not available'}</p>
    `
    // show the modal
    show_details_modal.showModal(); 
}

// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
    // console.log(searchText);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    // loadingSpinner.classList.remove('hidden');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

// handle Show all
const handleShowAll = () =>{
    handleSearch(true);
}
// loadPhone();