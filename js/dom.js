// ________ ___  ________  _______   ________  ________  ________  _______           ________  _________  ___  ___  ________ ________
// |\  _____\\  \|\   __  \|\  ___ \ |\   __  \|\   __  \|\   ____\|\  ___ \         |\   ____\|\___   ___\\  \|\  \|\  _____\\  _____\
// \ \  \__/\ \  \ \  \|\  \ \   __/|\ \  \|\ /\ \  \|\  \ \  \___|\ \   __/|        \ \  \___|\|___ \  \_\ \  \\\  \ \  \__/\ \  \__/
// \ \   __\\ \  \ \   _  _\ \  \_|/_\ \   __  \ \   __  \ \_____  \ \  \_|/__       \ \_____  \   \ \  \ \ \  \\\  \ \   __\\ \   __\
//  \ \  \_| \ \  \ \  \\  \\ \  \_|\ \ \  \|\  \ \  \ \  \|____|\  \ \  \_|\ \       \|____|\  \   \ \  \ \ \  \\\  \ \  \_| \ \  \_|
//   \ \__\   \ \__\ \__\\ _\\ \_______\ \_______\ \__\ \__\____\_\  \ \_______\        ____\_\  \   \ \__\ \ \_______\ \__\   \ \__\
//    \|__|    \|__|\|__|\|__|\|_______|\|_______|\|__|\|__|\_________\|_______|       |\_________\   \|__|  \|_______|\|__|    \|__|
//                                                         \|_________|                \|_________|
//
// db.collection('locations').orderBy('name').onSnapshot(snapshot => {
//     setupPlaces(snapshot.docs);
// });
const locationMenu = document.querySelector('#table');
// const setupPlaces = (data) => {
//     let html = '';
//     html += `
//     <li class="table-header">
//         <div class="col col-1">Mask?</div>
//         <div class="col col-1">Number</div>
//         <div class="col col-2">Address</div>
//         <div class="col col-3">Location Name</div>
//         <div class="col col-4">Safety Status</div>
//     </li>`;
//     data.forEach(doc => {
//         const onePlace = doc.data();
//         // Safety Check
//         var numberOfPeople = onePlace.numberPeople;
//         var safetyCheck = '';
//         if (numberOfPeople <= 10) {
//             safetyCheck = 'Safe';
//         }
//         else if (numberOfPeople <= 20) {
//             safetyCheck = 'Take extra care';
//         }
//         else {
//             safetyCheck = 'Check back later';
//         }
//         // Actual Code
//         const div = `
//         <li class="table-row">
//             <div class="col col-1" data-label="Mask">${onePlace.maskRequired}</div>
//             <div class="col col-1" data-label="Number">${numberOfPeople}</div>
//             <div class="col col-2" data-label="Address">${onePlace.address}</div>
//             <div class="col col-3" data-label="Location Name">${onePlace.name}</div>
//             <div class="col col-4" data-label="Safety Status">${safetyCheck}</div>
//         </li>
//         `;
//         html += div;
//     });
//     locationMenu.innerHTML = html;
// }
// /$$$$$$                        /$$
// /$$__  $$                      | $$
// | $$  \__/  /$$$$$$   /$$$$$$  /$$$$$$
// |  $$$$$$  /$$__  $$ /$$__  $$|_  $$_/
// \____  $$| $$  \ $$| $$  \__/  | $$
// /$$  \ $$| $$  | $$| $$        | $$ /$$
// |  $$$$$$/|  $$$$$$/| $$        |  $$$$/
// \______/  \______/ |__/         \___/
//
const searchRequest = document.querySelector('#searchRequest');
searchRequest.addEventListener('submit', (e) =>{
    e.preventDefault();
    // Selected Option
    var options = document.getElementById("select-option");
    // var selectedOption = options.options[options.selectedIndex].value;
    var selectedOption = options.options[options.selectedIndex].value;
    // Text that is Typed inspect
    var inputVal = document.getElementById("lookup").value;
    // Sort
    locationMenu.innerHTML = '';
    db.collection('locations').where("category", "==", selectedOption).where("zipCode", "==", inputVal).orderBy('name').get().then(function(querySnapshot){
        let html = '';
        var index = 0;
        html += `
        <li class="table-header">
            <div class="col col-1">Mask?</div>
            <div class="col col-1">Number</div>
            <div class="col col-2">Address</div>
            <div class="col col-3">Location Name</div>
            <div class="col col-4">Safety Status</div>
        </li>`;
        querySnapshot.forEach(function(doc) {
            const onePlace = doc.data();
            // Safety Check
            var numberOfPeople = onePlace.numberPeople;
            var safetyCheck = '';
            if (numberOfPeople <= 10) {
                safetyCheck = 'Safe';
            }
            else if (numberOfPeople <= 20) {
                safetyCheck = 'Take extra care';
            }
            else {
                safetyCheck = 'Check back later';
            }
            // Actual Code
            const div = `
            <li class="table-row">
                <div class="col col-1" data-label="Mask">${onePlace.maskRequired}</div>
                <div class="col col-1" data-label="Number">${numberOfPeople}</div>
                <div class="col col-2" data-label="Address">${onePlace.address}</div>
                <div class="col col-3" data-label="Location Name">${onePlace.name}</div>
                <div class="col col-4" data-label="Safety Status">${safetyCheck}</div>
            </li>
            `;
            html += div;
            index++;
        });
        if(index == 0){
            locationMenu.innerHTML = "Sorry, there are no matches found!";
        }
        else {
            locationMenu.innerHTML = html;
        }
    })
})
