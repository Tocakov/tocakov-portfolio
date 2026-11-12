const seriesSelection = document.getElementById("series-selection");
const seriesGrid = document.getElementById("series-grid");
const galleryStatus = document.getElementById("gallery-status");
const seriesIntro = document.getElementById("series-intro");
const seriesIntroTitle = document.getElementById("series-intro-title");
const seriesIntroDescription = document.getElementById("series-intro-description");
const seriesIntroCover = document.getElementById("series-intro-cover");
const seriesIntroFallback = document.getElementById("series-intro-fallback");
const imageViewer = document.getElementById("image-viewer");
const viewerImage = document.getElementById("viewer-image");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const seriesNames = {
    "Pejzaži": "Landscapes",
    "Portreti": "Portraits",
    "Test radovi": "Test works"
};
const temporaryDescriptions = {
    "Pejzaži": {
        sr: "Privremeni opis za pregled galerije. Konačni tekst ove serije biće dodat uz odabrane radove.",
        en: "Temporary gallery preview text. The final description for this series will be added with the selected works."
    },
    "Portreti": {
        sr: "Privremeni opis za pregled galerije. Konačni tekst ove serije biće dodat uz odabrane radove.",
        en: "Temporary gallery preview text. The final description for this series will be added with the selected works."
    },
    "Test radovi": {
        sr: "Privremeni opis za pregled galerije. Konačni tekst ove serije biće dodat uz odabrane radove.",
        en: "Temporary gallery preview text. The final description for this series will be added with the selected works."
    }
};
const altTranslations = {
    "Fotografija pejzaža, rad 1": "Landscape photograph, work 1",
    "Fotografija pejzaža, rad 2": "Landscape photograph, work 2",
    "Portret, rad 1": "Portrait, work 1",
    "Portret, rad 2": "Portrait, work 2",
    "Digitalna slika, test rad 1": "Digital artwork, test work 1",
    "Digitalna slika, test rad 2": "Digital artwork, test work 2",
    "Digitalna slika, test rad 3": "Digital artwork, test work 3",
    "Digitalna slika, test rad 4": "Digital artwork, test work 4"
};

let language = (() => {
    try {
        return localStorage.getItem("portfolio-language") === "en" ? "en" : "sr";
    } catch {
        return "sr";
    }
})();
let allSeries = [];
let currentSeries = null;
let currentImageIndex = 0;
let returnFocus = null;

function localizedSeriesName(name) {
    return language === "en" ? (seriesNames[name] || name) : name;
}

function localizedAlt(alt) {
    return language === "en" ? (altTranslations[alt] || alt) : alt;
}

function setLanguage(nextLanguage) {
    language = nextLanguage === "en" ? "en" : "sr";
    try {
        localStorage.setItem("portfolio-language", language);
    } catch {
        // The current page still changes language if storage is unavailable.
    }
    document.documentElement.lang = language;
    document.title = language === "en" ? "Portfolio — Miloš Točaković" : "Portfolio — Miloš Točaković";
    document.querySelectorAll("[data-sr][data-en]").forEach((element) => {
        element.textContent = language === "en" ? element.dataset.en : element.dataset.sr;
    });
    document.querySelectorAll("[data-language]").forEach((button) => {
        const selected = button.dataset.language === language;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-pressed", String(selected));
    });
    document.querySelector(".gallery-back-home").setAttribute(
        "aria-label",
        language === "en" ? "Back to home page" : "Nazad na početnu stranu"
    );
    document.querySelector(".gallery-back-home").title =
        language === "en" ? "Back to home page" : "Nazad na početnu stranu";
    imageViewer.setAttribute("aria-label", language === "en" ? "Photograph viewer" : "Prikaz fotografije");
    document.getElementById("viewer-close").setAttribute("aria-label", language === "en" ? "Close viewer" : "Zatvori prikaz");
    document.getElementById("viewer-previous").setAttribute("aria-label", language === "en" ? "Previous photograph" : "Prethodna fotografija");
    document.getElementById("viewer-next").setAttribute("aria-label", language === "en" ? "Next photograph" : "Sledeća fotografija");
    document.getElementById("open-series").setAttribute("aria-label", language === "en" ? "Open series" : "Otvori seriju");

    if (allSeries.length) renderSeries();
    if (currentSeries) renderSeriesIntro();
    if (!imageViewer.hidden && currentSeries) updateViewerImage();
}

function seriesCover(series) {
    return series.cover || series.images?.[0]?.src || "";
}

function seriesImages(series) {
    const images = [...(series.images || [])];
    const cover = seriesCover(series);
    if (cover && images[0]?.src !== cover) {
        images.unshift({
            src: cover,
            alt: language === "en"
                ? `${localizedSeriesName(series.title)} — series cover`
                : `${series.title} — naslovna fotografija serije`
        });
    }
    return images;
}

function setImageErrorState(image, fallback) {
    const showError = () => {
        if (fallback) fallback.hidden = false;
        image.hidden = true;
    };

    image.hidden = false;
    image.onerror = showError;
    if (image.complete && !image.naturalWidth) showError();
}

function renderSeries() {
    seriesGrid.replaceChildren();
    allSeries.forEach((series, index) => {
        const card = document.createElement("button");
        card.className = "series-card";
        card.type = "button";
        card.style.setProperty("--card-delay", `${Math.min(index, 6) * 90}ms`);

        const title = document.createElement("span");
        title.className = "series-card__title";
        title.textContent = localizedSeriesName(series.title);

        const media = document.createElement("span");
        media.className = "series-card__media";
        const image = document.createElement("img");
        image.className = "series-card__image";
        image.alt = `${language === "en" ? "Series cover:" : "Naslovna fotografija serije:"} ${localizedSeriesName(series.title)}`;
        image.loading = "lazy";
        image.decoding = "async";
        const cover = seriesCover(series);
        if (cover) image.src = cover;

        const fallback = document.createElement("span");
        fallback.className = "series-card__fallback";
        fallback.textContent = language === "en" ? "Series cover will be added" : "Naslovna fotografija serije biće dodata";
        fallback.hidden = Boolean(cover);
        media.append(image, fallback);
        if (cover) setImageErrorState(image, fallback);

        card.append(title, media);
        card.addEventListener("click", () => openSeries(series));
        seriesGrid.append(card);
    });
}

function openSeries(series) {
    currentSeries = series;
    currentImageIndex = 0;
    seriesSelection.classList.add("is-leaving");
    window.setTimeout(() => {
        seriesSelection.hidden = true;
        seriesSelection.classList.remove("is-leaving");
        seriesIntro.hidden = false;
        seriesIntro.classList.add("is-entering");
        renderSeriesIntro();
        window.requestAnimationFrame(() => seriesIntro.classList.remove("is-entering"));
        seriesIntro.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
        document.getElementById("series-back").focus({ preventScroll: true });
    }, reducedMotion.matches ? 0 : 280);
}

function renderSeriesIntro() {
    if (!currentSeries) return;
    seriesIntroTitle.textContent = localizedSeriesName(currentSeries.title);
    seriesIntroDescription.textContent =
        temporaryDescriptions[currentSeries.title]?.[language] ||
        (language === "en"
            ? "Temporary gallery preview text. The final description will be added with the selected works."
            : "Privremeni opis za pregled galerije. Konačni tekst biće dodat uz odabrane radove.");
    const cover = seriesCover(currentSeries);
    seriesIntroCover.hidden = !cover;
    seriesIntroFallback.hidden = Boolean(cover);
    seriesIntroFallback.textContent = language === "en" ? "Series cover will be added" : "Naslovna fotografija serije biće dodata";
    seriesIntroCover.removeAttribute("src");
    seriesIntroCover.onerror = null;
    if (cover) {
        seriesIntroCover.src = cover;
        seriesIntroCover.alt = `${language === "en" ? "First image in" : "Prvi rad iz serije"} ${localizedSeriesName(currentSeries.title)}`;
        setImageErrorState(seriesIntroCover, seriesIntroFallback);
    } else {
        seriesIntroCover.alt = "";
    }
    document.getElementById("open-series").disabled = !(currentSeries.images?.length);
}

function returnToSeries() {
    imageViewer.hidden = true;
    document.body.classList.remove("image-viewer-open");
    seriesIntro.hidden = true;
    seriesSelection.hidden = false;
    seriesSelection.classList.add("is-entering");
    window.requestAnimationFrame(() => seriesSelection.classList.remove("is-entering"));
    currentSeries = null;
    document.querySelector(".series-card")?.focus({ preventScroll: true });
}

function openViewer() {
    if (!currentSeries || !seriesImages(currentSeries).length) return;
    returnFocus = document.getElementById("open-series");
    currentImageIndex = 0;
    updateViewerImage();
    imageViewer.hidden = false;
    document.body.classList.add("image-viewer-open");
    document.getElementById("viewer-close").focus();
    preloadAdjacentImages();
}

function updateViewerImage() {
    const image = currentSeries && seriesImages(currentSeries)[currentImageIndex];
    if (!image) return;
    viewerImage.src = image.src;
    viewerImage.alt = localizedAlt(image.alt || `${currentSeries.title} — ${currentImageIndex + 1}`);
}

function preloadAdjacentImages() {
    const images = currentSeries ? seriesImages(currentSeries) : [];
    if (images.length < 2) return;
    [-1, 1].forEach((direction) => {
        const adjacent = images[(currentImageIndex + direction + images.length) % images.length];
        const preload = new Image();
        preload.src = adjacent.src;
    });
}

function stepViewer(direction) {
    const images = currentSeries ? seriesImages(currentSeries) : [];
    if (!images.length) return;
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    updateViewerImage();
    preloadAdjacentImages();
}

function closeViewer() {
    imageViewer.hidden = true;
    document.body.classList.remove("image-viewer-open");
    returnFocus?.focus({ preventScroll: true });
}

document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
        if (button.dataset.language !== language) setLanguage(button.dataset.language);
    });
});
document.getElementById("series-back").addEventListener("click", returnToSeries);
document.getElementById("open-series").addEventListener("click", openViewer);
seriesIntroCover.addEventListener("click", openViewer);
document.getElementById("viewer-close").addEventListener("click", closeViewer);
document.getElementById("viewer-previous").addEventListener("click", () => stepViewer(-1));
document.getElementById("viewer-next").addEventListener("click", () => stepViewer(1));
imageViewer.addEventListener("click", (event) => {
    if (event.target === imageViewer) closeViewer();
});
viewerImage.addEventListener("click", (event) => event.stopPropagation());

document.addEventListener("keydown", (event) => {
    if (imageViewer.hidden) return;
    if (event.key === "Escape") {
        event.preventDefault();
        closeViewer();
    } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepViewer(-1);
    } else if (event.key === "ArrowRight") {
        event.preventDefault();
        stepViewer(1);
    } else if (event.key === "Tab") {
        const controls = [
            document.getElementById("viewer-close"),
            document.getElementById("viewer-previous"),
            document.getElementById("viewer-next")
        ];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }
});

setLanguage(language);

fetch("assets/data/gallery.json")
    .then((response) => {
        if (!response.ok) throw new Error(`Ne mogu da učitam podatke galerije (${response.status}).`);
        return response.json();
    })
    .then((data) => {
        allSeries = Object.values(data.categories || {}).flatMap((category) =>
            Array.isArray(category.series) ? category.series : []
        );
        renderSeries();
        if (!allSeries.length) {
            galleryStatus.textContent = language === "en" ? "No series have been added yet." : "Serije još nisu dodate.";
            galleryStatus.hidden = false;
        }
    })
    .catch((error) => {
        console.error(error);
        galleryStatus.textContent = language === "en"
            ? "The portfolio could not load its series. Please refresh the page."
            : "Portfolio trenutno ne može da učita serije. Osvežite stranicu.";
        galleryStatus.hidden = false;
    });
