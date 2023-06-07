import Alpine from 'alpinejs/dist/module.cjs'
import Glider from 'glider-js';

window.Alpine = Alpine


window.addEventListener('DOMContentLoaded', function () {
	
  new Glider(document.querySelector('.slider'), {
    slidesToScroll: 1,
    slidesToShow: 5.5,
    draggable: true,
    exactWidth : true,
  })

})

Alpine.start()