
fetch('http://localhost:3000/cart')
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
    }
});

function deleteTrip() {
	for (let i = 0; i < document.querySelectorAll('.deleteTrip').length; i++) {
		document.querySelectorAll('.deleteTrip')[i].addEventListener('click', function () {
			fetch(`http://localhost:3000/cart/${this.id}`, { method: 'DELETE' })
				.then(response => response.json())
				.then(data => {
					if (data.result) {
						this.parentNode.remove();
					}
				});
		});
	}
}