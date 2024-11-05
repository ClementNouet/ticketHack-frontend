document.querySelector('#search').addEventListener('click', function (event) {
    event.preventDefault();

    const departure = document.querySelector('#departure').value;
    const arrival = document.querySelector('#arrival').value;
    const date = document.querySelector('#date').value;

    const requestTrip = {
        departure,
        arrival,
        date
    };

    // Effectue la requête POST pour rechercher les voyages
    fetch('http://localhost:3000/trips', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestTrip),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        if (data.result) {
            document.querySelector('#tripsList').innerHTML = '';

            for (let i = 0; i < data.trips.length; i++) {
                const dateObject = new Date(data.trips[i].date); 
                const hours = dateObject.getHours(); 
                const minutes = String(dateObject.getMinutes()).padStart(2, '0');
                const horaire = hours + ':' + minutes;

                // Ajoute chaque voyage au DOM
                document.querySelector('#tripsList').innerHTML += `
                    <div class="tripsContainer">
                        <p class="trip">${data.trips[i].departure} > ${data.trips[i].arrival}</p>
                        <p class="date">${horaire}</p>
                        <p class="price">${data.trips[i].price}</p>
                        <button class="addCart" id="${data.trips[i]._id}">Book</button>
                    </div>
                `;
            }

            // Vide les champs du formulaire
            document.querySelector('#departure').value = '';
            document.querySelector('#arrival').value = '';
            document.querySelector('#date').value = '';

            // Ajoute les écouteurs d'événements aux nouveaux boutons "Book"
            const buttonBook = document.querySelectorAll('.addCart');
            for (let i = 0; i < buttonBook.length; i++) {
                buttonBook[i].addEventListener('click', function () {
                    console.log(`${data.trips[i]._id}`);
                    // Code fetch ici pour chaque bouton
                });
            }
        } else {
            document.querySelector('#logoTrain').src = 'images/notfound.png';
            document.querySelector('#tripEmpty').textContent = 'No trip found';
        }
    });
});
