class ImageSlide {
        constructor(imagesContainer, images) {
                if (typeof imagesContainer === "string") {
                        this.imagesContainer = document.querySelector(imagesContainer)
                } else {
                        this.imagesContainer = imagesContainer
                }
                if (typeof images === "string") {
                        this.images = document.querySelectorAll(images)
                } else {
                        this.images = images
                }
                this.containerWidth = imagesContainer.clientWidth
                this.imagesWidth = images.offsetWidth
                this.init()
        }

        listener(e) {
                let mouseX = e.clientX
                let rng = this.mapRange(mouseX, -1, -window.innerWidth, 0, this.getImagesWidth())
                this.images.style.transform = `translateX(${rng}px)`
        }

        init() {
                if (this.getImagesWidth() === 0) return;
                this.listenerHandler = this.listener.bind(this)
                document.addEventListener("mousemove", this.listenerHandler)
        }

        mapRange(value, low1, high1, low2, high2) {
                return low2 + (high2 - low2) * (value - low1) / (high1 - low1)
        }

        getImagesWidth() {
                let width = 0
                this.images.querySelectorAll("img").forEach(img => {
                        width += img.offsetWidth
                })
                return width
        }

        destroy() {
                document.removeEventListener("mousemove", this.listenerHandler)
        }
}

class TextSlide {
        constructor(textContainer, text) {
                if (typeof textContainer === "string") {
                        this.textContainer = document.querySelector(textContainer)
                } else {
                        this.textContainer = textContainer
                }
                if (typeof text === "string") {
                        this.text = document.querySelectorAll(text)
                } else {
                        this.text = text
                }
                this.containerWidth = textContainer.clientWidth
                this.textWidth = text.offsetWidth
                this.init()
        }

        listener(e) {
                let mouseX = e.clientX
                let rng = this.mapRange(mouseX, -1, -window.innerWidth, 0, this.getTextWidth())
                this.text.style.transform = `translateX(${rng}px)`
        }

        init() {
                if (this.getTextWidth() === 0) return;
                this.listenerHandler = this.listener.bind(this)
                document.addEventListener("mousemove", this.listenerHandler)
        }

        mapRange(value, low1, high1, low2, high2) {
                return low2 + (high2 - low2) * (value - low1) / (high1 - low1)
        }

        getTextWidth() {
                let width = 0
                this.images.querySelectorAll("img").forEach(img => {
                        width += img.offsetWidth
                })
                return width
        }

        destroy() {
                document.removeEventListener("mousemove", this.listenerHandler)
        }
}

class RandomSvgPosition {
        constructor(svgPath, svgContainer) {
                this.svg = document.createElement("object")
                this.svgContainer = svgContainer
                this.svg.data = svgPath
                this.svg.type = "image/svg+xml"
                this.svg.style.position = "absolute"
                //set width and height 
                this.svg.style.width = "10rem"
                this.svg.style.height = "10rem"
                this.svg.style.top = 0
                this.svg.style.left = 0
                this.svg.style.transform = "translate(-50%, -50%)"
                this.init()
        }

        init() {
                this.svg.style.top = `${Math.random() * 100}%`
                this.svg.style.left = `${Math.random() * 100}%`
                this.svg.style.transform = `rotate(${Math.random() * 360}deg)`
                this.svgContainer.appendChild(this.svg)
        }

}

function handleArtist() {
        const artists = document.querySelectorAll(".artist__name")
        let imgsSlide;
        artists.forEach(artist => {
                artist.addEventListener("click", (e) => {
                        artist.nextElementSibling.toggleAttribute("hidden")
                        if (!artist.nextElementSibling.hasAttribute("hidden")) {
                                const imageContainer = document.querySelector("main .wrapper")
                                const image = artist.nextElementSibling.querySelector(".imgs")
                                imgsSlide = new ImageSlide(imageContainer, image)
                        } else {
                                imgsSlide.destroy()
                        }
                })
        })
}

function handleNoMovement() {
        let idleTimeCount = 0;
        let svgPaths = ["public/assets/bih_01.svg", "public/assets/bih_02.svg", "public/assets/bih_03.svg", "public/assets/bih_04.svg"]
        let svgContainer = document.querySelector(".svg__holder")
        function resetIdleTime() {
                return (idleTimeCount = 0);
        }

        function reset() {
                resetIdleTime();
                svgContainer.innerHTML = "";
        }

        let events = ["mousedown", "mousemove", "touchstart", "scroll", "wheel"];
        events.forEach(event => {
                document.addEventListener(event, reset);
        }
        );

        function checkIdleTime() {
                if (idleTimeCount > 900) {
                        let svgPath = svgPaths[Math.floor(Math.random() * svgPaths.length)]
                        let svg = new RandomSvgPosition(svgPath, svgContainer)
                        resetIdleTime();
                }
                idleTimeCount++;
                if (idleTimeCount > 10000) return;
                window.requestAnimationFrame(checkIdleTime);
        }

        window.requestAnimationFrame(checkIdleTime);

}

function handleTheme(){
  const getCurrentTheme = () =>{
      let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      localStorage.getItem("bih.theme")
        ? (theme = localStorage.getItem("bih.theme"))
        : null;
      return theme;
    }
  const setTheme = (theme) =>{
      const root = document.querySelector(":root");
      root.setAttribute("color-scheme", `${theme}`)
    };
  
  const svgObject = document.querySelector("#svg__object");
  svgObject.addEventListener("load",function(){
    const themeButton = svgObject.contentDocument.firstElementChild
    if(!themeButton) return;

    themeButton.addEventListener("click", ()=>{
      let currentTheme = getCurrentTheme();
      if (currentTheme === "dark"){
        currentTheme = "light";
      } else {
        currentTheme = "dark"
      }
      setTheme(currentTheme);
      localStorage.setItem("bih.theme", currentTheme)
    })    
  })
  
   window.addEventListener("DOMContentLoaded", ()=>{
    setTheme(getCurrentTheme())
    })                              
}


(() => {
        handleArtist()
        handleNoMovement()
        handleTheme()
})();