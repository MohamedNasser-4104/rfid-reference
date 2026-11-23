(function () {
  var root = document.documentElement;
  var KEY = "rfid-ref-lang";

  function setLang(lang) {
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = lang === "ar" ? "مرجع RFID" : "RFID Reference";
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  var initial = saved || ((navigator.language || "").toLowerCase().indexOf("ar") === 0 ? "ar" : "en");
  setLang(initial);

  document.getElementById("langToggle").addEventListener("click", function () {
    setLang(root.lang === "ar" ? "en" : "ar");
  });

  // Show a dashed placeholder when an image file is not there yet
  document.querySelectorAll(".shot img").forEach(function (img) {
    function showMissing() {
      img.style.display = "none";
      var ph = img.parentElement.querySelector(".shot-missing");
      if (ph) ph.hidden = false;
    }
    img.addEventListener("error", showMissing);
    if (img.complete && img.naturalWidth === 0) showMissing();
  });

  // Highlight the current section in the nav
  var links = document.querySelectorAll(".nav a");
  var map = {};
  links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.remove("active"); });
          var a = map[e.target.id];
          if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("main .layer").forEach(function (s) { io.observe(s); });
  }
})();
