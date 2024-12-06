/* Antidote-API_JS-Connect.js */

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('initAntidote').addEventListener('click', 
					function onclick(ev){
							window.activeAntidoteAPI_JSConnect();
							window.alert('Antidote : Boutons JS-Connect activés');
					}
				);
	document.getElementById('desinitAntidote').addEventListener('click', 
					function onclick(ev){
							window.desactiveAntidoteAPI_JSConnect();
							window.alert('Antidote : Boutons JS-Connect désactivés');
					}
				);
});
