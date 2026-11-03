const galleryCategories = {
    photography: {
        title: "Fotografija",
        cover: "assets/images/gallery/optimized/photography/cover.webp",
        series: [
            {
                title: "Pejzaži",
                cover: "assets/images/gallery/optimized/photography/landscape-cover.webp",
                images: [
                    { src: "assets/images/gallery/optimized/photography/landscape-01.webp", alt: "Fotografija pejzaža, rad 1" },
                    { src: "assets/images/gallery/optimized/photography/landscape-02.webp", alt: "Fotografija pejzaža, rad 2" }
                ]
            },
            {
                title: "Portreti",
                cover: "assets/images/gallery/optimized/photography/portrait-cover.webp",
                images: [
                    { src: "assets/images/gallery/optimized/photography/portrait-01.webp", alt: "Portret, rad 1" },
                    { src: "assets/images/gallery/optimized/photography/portrait-02.webp", alt: "Portret, rad 2" }
                ]
            }
        ]
    },
    "digital-art": {
        title: "Digitalna slika",
        cover: "assets/images/gallery/optimized/digital-art/cover.webp",
        series: [{
            title: "Test radovi",
            cover: "assets/images/gallery/optimized/digital-art/cover.webp",
            images: [
                { src: "assets/images/gallery/optimized/digital-art/work-01.webp", alt: "Digitalna slika, test rad 1" },
                { src: "assets/images/gallery/optimized/digital-art/work-02.webp", alt: "Digitalna slika, test rad 2" },
                { src: "assets/images/gallery/optimized/digital-art/work-03.webp", alt: "Digitalna slika, test rad 3" },
                { src: "assets/images/gallery/optimized/digital-art/work-04.webp", alt: "Digitalna slika, test rad 4" }
            ]
        }]
    },
    paintings: { title: "Slike", cover: null, series: [] }
};

const categoryGrid = document.getElementById("category-grid");
const seriesView = document.getElementById("series-view");
const worksView = document.getElementById("works-view");
const seriesTrack = document.getElementById("series-track");
const seriesEmpty = document.getElementById("series-empty");
const seriesCategoryTitle = document.getElementById("series-category-title");
const seriesTitle = document.getElementById("series-dialog-title");
const seriesPosition = document.getElementById("series-position");
const seriesImage = document.getElementById("series-image");
const seriesImageButton = document.getElementById("series-image-button");
const seriesImageEmpty = document.getElementById("series-image-empty");
const imageDialog = document.getElementById("image-dialog");
const zoomedImage = document.getElementById("zoomed-image");
const brand = document.getElementById("site-brand");
const intro = document.getElementById("brand-intro");
const introBrand = document.getElementById("intro-brand");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

intro.hidden = false;
document.body.classList.add("intro-is-active");

let activeCategory = null;
let activeSeries = null;
let activeImageIndex = 0;
let introComplete = false;
let introAnimating = false;
let introAnimationTimer = null;
let introAnimation = null;

function openCategory(categoryId) {
    const category = galleryCategories[categoryId];
    if (!category) return;

    activeCategory = category;
    seriesCategoryTitle.textContent = category.title;
    categoryGrid.hidden = true;
    worksView.hidden = true;
    seriesView.hidden = false;
    renderSeries();
    seriesView.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "nearest" });
    seriesView.querySelector(".gallery-back").focus({ preventScroll: true });
}

function renderSeries() {
    seriesTrack.replaceChildren();
    seriesTrack.scrollLeft = 0;
    seriesEmpty.hidden = activeCategory.series.length > 0;
    if (!activeCategory.series.length) {
        seriesEmpty.textContent = `Serije za kategoriju „${activeCategory.title}“ još nisu dodate. Nazive serija i putanje do fotografija dodajte u fajl assets/data/gallery.json.`;
        return;
    }

    activeCategory.series.forEach((series) => {
        const card = document.createElement("button");
        card.className = "series-card";
        card.type = "button";
        const cover = series.cover || series.images?.[0]?.src;
        const fallback = document.createElement("span");
        fallback.className = "series-card__fallback";
        fallback.textContent = "Naslovna fotografija nije dodata";
        if (cover) {
            const image = document.createElement("img");
            image.src = cover;
            image.alt = `Naslovna slika serije ${series.title}`;
            image.loading = "lazy";
            fallback.hidden = true;
            image.addEventListener("error", () => {
                image.hidden = true;
                fallback.hidden = false;
            }, { once: true });
            card.append(image);
        }
        const title = document.createElement("span");
        title.className = "series-card__title";
        title.textContent = series.title;
        card.append(fallback, title);
        card.addEventListener("click", () => openSeries(series));
        seriesTrack.append(card);
    });
}

function openSeries(series) {
    activeSeries = series;
    activeImageIndex = 0;
    seriesTitle.textContent = series.title;
    updateSeriesImage();
    seriesView.hidden = true;
    worksView.hidden = false;
    worksView.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "nearest" });
    worksView.querySelector(".gallery-back").focus({ preventScroll: true });
}

function updateSeriesImage() {
    const images = activeSeries.images || [];
    const image = images[activeImageIndex];
    seriesImageEmpty.hidden = Boolean(image);
    seriesImage.hidden = !image;
    seriesImageButton.disabled = !image;
    seriesImage.classList.remove("is-loaded");
    if (image) {
        seriesImage.src = image.src;
        seriesImage.alt = image.alt || `${activeSeries.title} — rad ${activeImageIndex + 1}`;
        seriesImage.onload = () => seriesImage.classList.add("is-loaded");
        seriesImage.onerror = () => {
            seriesImage.hidden = true;
            seriesImageButton.disabled = true;
            seriesImageEmpty.textContent = "Fotografija nije mogla da se učita. Proverite putanju u assets/data/gallery.json.";
            seriesImageEmpty.hidden = false;
        };
    } else {
        seriesImage.removeAttribute("src");
        seriesImage.alt = "";
        seriesImageEmpty.textContent = "U ovoj seriji još nema dodatih fotografija.";
    }
    seriesPosition.textContent = image
        ? `${String(activeImageIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`
        : "Radovi / 0";
}

function stepImage(direction) {
    const images = activeSeries?.images || [];
    if (!images.length) return;
    activeImageIndex = (activeImageIndex + direction + images.length) % images.length;
    updateSeriesImage();
}

function openZoom() {
    if (!activeSeries?.images?.length || !seriesImage.naturalWidth) return;
    zoomedImage.src = activeSeries.images[activeImageIndex].src;
    zoomedImage.alt = seriesImage.alt;
    imageDialog.hidden = false;
    imageDialog.querySelector("[data-close-zoom]").focus();
}

function closeZoom() {
    imageDialog.hidden = true;
    worksView.querySelector("#series-image-button").focus();
}

function closeSeries() {
    activeSeries = null;
    worksView.hidden = true;
    seriesView.hidden = false;
    seriesView.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "nearest" });
    seriesView.querySelector(".series-card")?.focus({ preventScroll: true });
}

function backToCategories() {
    activeCategory = null;
    activeSeries = null;
    worksView.hidden = true;
    seriesView.hidden = true;
    categoryGrid.hidden = false;
    categoryGrid.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "nearest" });
    categoryGrid.querySelector(".category-preview")?.focus({ preventScroll: true });
}

document.querySelectorAll(".category-preview").forEach((button) => {
    button.addEventListener("click", () => openCategory(button.dataset.category));
});

document.querySelector('[data-gallery-back="categories"]').addEventListener("click", backToCategories);
document.querySelector('[data-gallery-back="series"]').addEventListener("click", closeSeries);
document.querySelector("[data-close-zoom]").addEventListener("click", closeZoom);
seriesImageButton.addEventListener("click", openZoom);

document.querySelectorAll("[data-scroll-series]").forEach((button) => {
    button.addEventListener("click", () => {
        const direction = Number(button.dataset.scrollSeries);
        seriesTrack.scrollBy({
            left: direction * Math.max(seriesTrack.clientWidth * 0.8, 260),
            behavior: reducedMotion.matches ? "auto" : "smooth"
        });
    });
});

document.querySelectorAll("[data-step-image]").forEach((button) => {
    button.addEventListener("click", () => stepImage(Number(button.dataset.stepImage)));
});

imageDialog.addEventListener("click", (event) => {
    if (event.target === imageDialog) closeZoom();
});

imageDialog.querySelector(".image-dialog__image").addEventListener("click", (event) => event.stopPropagation());

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        if (!imageDialog.hidden) {
            closeZoom();
        } else if (!worksView.hidden) {
            closeSeries();
        } else if (!seriesView.hidden) {
            backToCategories();
        }
        return;
    }
    if (!imageDialog.hidden) return;
    if (!worksView.hidden && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        stepImage(event.key === "ArrowRight" ? 1 : -1);
    }
});

function animateIntroToHeader() {
    if (introComplete || introAnimating) return;
    introAnimating = true;
    document.body.classList.add("intro-is-transitioning");

    if (reducedMotion.matches) {
        finishIntro();
        return;
    }

    const from = introBrand.getBoundingClientRect();
    const to = brand.getBoundingClientRect();
    const targetTransform = `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width}, ${to.height / from.height})`;
    introBrand.style.position = "fixed";
    introBrand.style.left = `${from.left}px`;
    introBrand.style.top = `${from.top}px`;
    introBrand.style.margin = "0";
    introBrand.style.transformOrigin = "top left";
    introBrand.style.width = `${from.width}px`;
    introBrand.style.textAlign = "left";
    introAnimation = introBrand.animate(
        [{ transform: "translate(0, 0) scale(1, 1)" }, { transform: targetTransform }],
        { duration: 850, easing: "cubic-bezier(.2, .8, .2, 1)", fill: "forwards" }
    );
    introAnimation.onfinish = finishIntro;
    introAnimationTimer = window.setTimeout(finishIntro, 1400);
}

function finishIntro() {
    if (introComplete) return;
    introComplete = true;
    window.clearTimeout(introAnimationTimer);
    introAnimationTimer = null;
    if (introAnimation?.playState === "running") introAnimation.cancel();
    introAnimation = null;
    introAnimating = false;
    document.body.classList.remove("intro-is-active", "intro-is-transitioning");
    document.body.classList.add("intro-is-finished");
    intro.hidden = true;
    introBrand.removeAttribute("style");
    window.scrollTo({ top: 0, behavior: "auto" });
    document.getElementById("intro-continue").removeEventListener("click", animateIntroToHeader);
}

document.getElementById("intro-continue").addEventListener("click", animateIntroToHeader);

window.addEventListener("wheel", (event) => {
    if (!introComplete && event.deltaY > 0) {
        event.preventDefault();
        animateIntroToHeader();
    }
}, { passive: false });

window.addEventListener("touchmove", (event) => {
    if (!introComplete) {
        event.preventDefault();
        animateIntroToHeader();
    }
}, { passive: false });

document.addEventListener("keydown", (event) => {
    if (!introComplete && ["ArrowDown", "PageDown", " ", "Enter"].includes(event.key)) {
        event.preventDefault();
        animateIntroToHeader();
    }
});

let scrollTicking = false;
window.addEventListener("scroll", () => {
    if (scrollTicking || !introComplete) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
        const vertical = window.scrollY > window.innerHeight * 0.55;
        document.body.classList.toggle("brand-is-vertical", vertical);
        scrollTicking = false;
    });
}, { passive: true });

if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const letterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("letters-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15 });

    function animateTextLetters(element) {
        if (element.dataset.lettersPrepared) return;
        element.dataset.lettersPrepared = "true";

        const wrapText = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const fragment = document.createDocumentFragment();
                [...node.textContent].forEach((character, index) => {
                    const letter = document.createElement("span");
                    letter.className = "letter-char";
                    letter.style.setProperty("--letter-index", index);
                    letter.textContent = character === " " ? "\u00a0" : character;
                    fragment.append(letter);
                });
                node.replaceWith(fragment);
            } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "BR") {
                [...node.childNodes].forEach(wrapText);
            }
        };

        [...element.childNodes].forEach(wrapText);
        letterObserver.observe(element);
    }

    document.querySelectorAll("#home h1, #gallery h2, #about h2, #about h3, #exhibitions h3, #exhibitions h4, #contact h2").forEach(animateTextLetters);

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(
        "#home .font-label-bold, #home p, #home a[href='#gallery'], #gallery > div:first-child, " +
        "#gallery .category-preview, #gallery .gallery-content, #about > div, " +
        "#exhibitions .grid > div, #contact > div > div"
    ).forEach((element, index) => {
        element.classList.add("reveal");
        element.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 90}ms`);
        revealObserver.observe(element);
    });

    document.body.classList.add("reveal-motion-ready");
}

fetch("assets/data/gallery.json")
    .then((response) => {
        if (!response.ok) throw new Error(`Ne mogu da učitam podatke galerije (${response.status}).`);
        return response.json();
    })
    .then((data) => {
        Object.entries(data.categories || {}).forEach(([id, category]) => {
            if (!galleryCategories[id] || !Array.isArray(category.series)) return;
            galleryCategories[id].series = category.series;
            if (category.cover) galleryCategories[id].cover = category.cover;
        });
        document.querySelectorAll(".category-preview").forEach((button) => {
            const category = galleryCategories[button.dataset.category];
            const image = button.querySelector(".category-preview-image");
            if (category.cover) {
                image.src = category.cover;
                image.hidden = false;
            } else {
                image.hidden = true;
                button.querySelector(".category-preview-fallback").hidden = false;
            }
            image.addEventListener("error", () => {
                image.hidden = true;
                button.querySelector(".category-preview-fallback").hidden = false;
            }, { once: true });
        });
        if (activeCategory) renderSeries();
    })
    .catch((error) => {
        if (window.location.protocol !== "file:") {
            console.error(error);
            seriesEmpty.textContent = "Galerija koristi ugrađene probne radove jer spisak galerije nije mogao da se učita.";
        }
    });
