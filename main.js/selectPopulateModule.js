// Defining a method to populate the select menu
export default function populateSelect (selectData) {
    // using a forEach loop to populate the select
    selectData.forEach((option) => {
        const newOption = document.createElement('option');
        newOption.value = option;
        newOption.textContent = option;
        document.querySelector('select').appendChild(newOption);
    })
}