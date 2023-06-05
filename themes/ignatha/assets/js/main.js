import Alpine from 'alpinejs/dist/module.cjs'
import lunr from "lunr"
import ScrollMagic from 'scrollmagic'

window.Alpine = Alpine

// // init controller ScrollMagic
// var controller = new ScrollMagic.Controller()
// // build scene

// document.addEventListener("DOMContentLoaded", function(event) { 
//   const sidebarWrapper = document.querySelector("#sidebar-wrapper")
//   const contentWrapper = document.querySelector("#content")

//   const scrollHeight = (contentWrapper.offsetHeight - sidebarWrapper.offsetHeight) - 150

//   var scene = new ScrollMagic.Scene({triggerElement: contentWrapper, duration: scrollHeight,triggerHook: 0})
//                   .setPin(sidebarWrapper,{ pushFollowers: false })
//                   .addTo(controller)
// });

// define globale variables
window.search = async function (query) {

    if (!query || query == null) {
        return []
    }

  return getPost(query)
}

async function getPost(query)
{
  var idx = null;

  let getData = await fetch('/index.json')
  let posts = await getData.json();

  idx = lunr(function () {
    this.field('url')
    this.field('title')
    this.field('content')
    this.field('date')
    this.ref('url')
  
    posts.forEach((post) => { this.add(post) })
  })

  const result = idx.search(query)

	return result.map((item) => {
		return posts.find((post) => item.ref === post.url)
	})

}

Alpine.start()