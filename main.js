(function(){
  var $starsUrl = document.querySelector(".header-nav-current-user a")

  if (!$starsUrl) {
    console.debug("GitHub Stars Dashboard extension skipped")
    console.debug('Could not find user dropdown $(".header-nav-current-user a")')

    return
  }

  var starsUrl = $starsUrl.href + "?tab=stars"
  var $dashboardSidebar = document.querySelector(".dashboard-sidebar.js-sticky")

  console.debug("GitHub Stars Dashboard extension loaded")

  // <h2 class="hide-sm hide-md f5 mb-1 border-top pt-3">
  //  <a href="https://github.com/username?tab=stars">Your stars</a>
  // </h2>
  $starsHeading = document.createElement("h2")
  $starsHeading.classList = "hide-sm hide-md f5 mb-1 border-top pt-3"
  $starsHeadingLink = document.createElement("a")
  $starsHeadingLink.classList = "link-gray-dark"
  $starsHeadingLink.innerText = "Your stars"
  $starsHeadingLink.href = starsUrl
  $starsHeading.appendChild($starsHeadingLink)

  $dashboardSidebar.appendChild($starsHeading)

  $loading = document.createElement("p")
  $loading.classList = "notice"
  $loading.innerText = "Loading stars..."

  $dashboardSidebar.appendChild($loading)

  fetch(starsUrl)
    .then(res => res.text())
    .then(text => {
      var parser = new DOMParser()

      return parser.parseFromString(text, "text/html")
    })
    .then(doc => {
      var $stars = doc.querySelectorAll(".col-12.d-block.width-full.py-4.border-bottom")

      $loading.remove()
      $starsHeading.classList.remove("mb-1") // Remove bottom border

      $stars.forEach($star => {
        $star.classList.replace("py-4", "py-3")
        $star.querySelector("h3").style.fontSize = "14px"

        $description = $star.querySelector("p")
        if ($description) {
          $description.style.fontSize = "13px"
        }

        $star.querySelector(".float-right").remove()
        $dashboardSidebar.appendChild($star)
      })
    })
})()