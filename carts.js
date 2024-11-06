
fetch('https://ticket-hack-backend-nlie.vercel.app/cart')
	.then(response => response.json())
	.then(data => {
        if (data.result) {
            for (let i =0; i< data.cart.length; i++) {
                const dateObject = new Date(data.cart[i].date); 
                const hours = dateObject.getHours(); 
                const minutes = String(dateObject.getMinutes()).padStart(2, '0');
                const horaire = hours + ':' + minutes;


            document.querySelector('#tripResume').innerHTML += `
            <div class="tripContent">
                <p>${data.cart[i].departure} > ${data.cart[i].arrival}</p>
                <p>${horaire}</p>
                <p>${data.cart[i].price}€</p>
                <button type="button" class='deleteTrip' id="${data.cart[i]._id}">X</button>
            </div>
            `
        }
        deleteTrip()
    } else if (!data.result){
        document.querySelector('#resume').innerHTML = ''
        document.querySelector('#resume').innerHTML = `
        <div class="noTrip">
            <p id"noTrip">No tickets in your cart</p>
            <p id="planTrip">why note plan a trip ?</p>
        </div>
        `
    }
}
);

function deleteTrip() {
	for (let i = 0; i < document.querySelectorAll('.deleteTrip').length; i++) {
		document.querySelectorAll('.deleteTrip')[i].addEventListener('click', function () {
			fetch(`https://ticket-hack-backend-nlie.vercel.app/cart/${this.id}`, { method: 'DELETE' })
				.then(response => response.json())
				.then(data => {
					if (data.result) {
						this.parentNode.remove();
                        updateTotal();
					}
				});
		});
	}
}


function updateTotal() {
fetch('https://ticket-hack-backend-nlie.vercel.app/cart')
	.then(response => response.json())
	.then(data => {
        if (data.result) {
            let result = 0
            for (let i =0; i< data.cart.length; i++) {
                result += data.cart[i].price
            document.querySelector('#total').textContent = `Total : ${result}€`;
        }
    }
});}

updateTotal()



function addBooking() {
    const trips = document.querySelectorAll('.deleteTrip')
    for (let i = 0; i < trips.length; i++) {
        fetch(`https://ticket-hack-backend-nlie.vercel.app/bookings/${trips[i].id}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        }).then( () => {
            setTimeout(() => {
                location.reload();
            }, 300);
        })
    }
}

const purchase = document.querySelector('#purchase');
purchase.addEventListener('click', function() {
    addBooking()
})

