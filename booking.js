fetch('https://ticket-hack-backend-beige.vercel.app/bookings')
	.then(response => response.json())
	.then(data => {
        if (data.result) {
            for (let i =0; i< data.bookings.length; i++) {
                const dateObject = new Date(data.bookings[i].date); 
                const hours = dateObject.getHours(); 
                const minutes = String(dateObject.getMinutes()).padStart(2, '0');
                const horaire = hours + ':' + minutes;


            document.querySelector('#tripResume').innerHTML += `
            <div class="tripContent">
                <p>${data.bookings[i].departure} > ${data.bookings[i].arrival}</p>
                <p>${horaire}</p>
                <p>${data.bookings[i].price}€</p>
                <p>Departure ${data.bookings[i].start}</p>
            </div>
            `
        }
    } else if (!data.result){
        document.querySelector('#resume').innerHTML = ''
        document.querySelector('#resume').innerHTML = `
        <div class="noTrip">
            <p id"noTrip">No booking yet</p>
            <p id="planTrip">why note plan a trip ?</p>
        </div>
        `
    }
});