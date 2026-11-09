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
const englishCopy = {
    "Vizuelni umetnik / Fotograf": "Visual Artist / Photographer",
    "Skrolujte da nastavite ↓": "Scroll to continue ↓",
    "Galerija": "Gallery",
    "Izložbe": "Exhibitions",
    "O meni": "About",
    "Iskustvo": "Experience",
    "Kontakt": "Contact",
    "Angažuj": "Hire me",
    "NOVA": "NEW",
    "ESTETIKA.": "AESTHETICS.",
    "Miloš Točaković je vizuelni umetnik i fotograf. Bavi se fotografijom i digitalizacijom umetničkih dela, kao i savremenim multimedijalnim praksama.": "Miloš Točaković is a visual artist and photographer. His practice includes photography, digitization of artworks, and contemporary multimedia work.",
    "Pogledaj Radove": "View selected works",
    "Status Sistema": "System status",
    "Dostupan za nove projekte": "Available for new projects",
    "Portfolio / 01": "Portfolio / 01",
    "Izbor radova": "Selected works",
    "Izaberite kategoriju i pogledajte radove.": "Choose a category to explore the work.",
    "Naslovna fotografija nije dodata": "Category cover photo not added",
    "Naslovna slika nije dodata": "Category cover image not added",
    "Fotografija": "Photography",
    "Digitalna slika": "Digital Art",
    "Slike": "Paintings",
    "← Nazad na kategorije": "← Back to categories",
    "Portfolio / Serije": "Portfolio / Series",
    "Izaberite seriju radova": "Choose a series",
    "← Nazad na serije": "← Back to series",
    "Portfolio / Radovi": "Portfolio / Works",
    "U ovoj seriji još nema dodatih fotografija.": "No images have been added to this series yet.",
    "Umetnički fokus:": "Artistic focus:",
    "Fotografija i digitalizacija umetničkih dela": "Photography and digitization of artworks",
    "Savremene multimedijalne prakse": "Contemporary multimedia practices",
    "Digitalna slika, slikarstvo i fotografija": "Digital art, painting, and photography",
    "Obrazovanje": "Education",
    "Akademija umetnosti u Novom Sadu": "Academy of Arts in Novi Sad",
    "Master studije fotografije — u toku.": "Master's studies in photography — in progress.",
    "Osnovne studije fotografije (2018–septembar 2022), diplomirani fotograf.": "Bachelor's studies in photography (2018–September 2022); graduated photographer.",
    "Iskustva i saradnje": "Experience and collaborations",
    "Odabrani projekti i saradnje": "Selected projects and collaborations",
    "• Spomen-zbirka Rajka Mamuzića — projekat digitalizacije slika iz kolekcije.": "• Rajko Mamuzić Memorial Collection — digitization of paintings from the collection.",
    "• Narodni muzej Vojvodine — digitalizacija u okviru projekta „Simboli srpske državnosti na etnološkim predmetima Muzeja Vojvodine“ (etnolog Ljiljana Trifunović).": "• Museum of Vojvodina — digitization for “Symbols of Serbian Statehood on Ethnological Objects of the Museum of Vojvodina” (ethnologist Ljiljana Trifunović).",
    "• Digitalizacija umetničkih dela u okviru privatnih angažmana.": "• Digitization of artworks for private clients.",
    "• Saradnja sa Festivalom studentskog pozorišta / SNP.": "• Collaboration with the Student Theatre Festival / Serbian National Theatre.",
    "• Saradnja sa Fondacijom „Laza Kostić“.": "• Collaboration with the Laza Kostić Foundation.",
    "Tehničke veštine": "Technical skills",
    "Profesionalna fotografska oprema; Adobe Photoshop CC, Lightroom CC, Capture One Pro, InDesign, Microsoft Word i ChaiNNer.": "Professional photography equipment; Adobe Photoshop CC, Lightroom CC, Capture One Pro, InDesign, Microsoft Word, and ChaiNNer.",
    "Izložbe i učešća": "Exhibitions and participation",
    "Beograd": "Belgrade",
    "Belgrade Photo Month": "Belgrade Photo Month",
    "Svetsko bijenale studentske fotografije": "World Student Photography Biennial",
    "Svetsko bijenale studentske fotografije, Best of 2022": "World Student Photography Biennial, Best of 2022",
    "Diplomska izložba Umetničkog odseka, Akademija umetnosti u Novom Sadu": "Graduation exhibition, Department of Fine Arts, Academy of Arts in Novi Sad",
    "Bijenale studentskog crteža i grafike": "Student Drawing and Printmaking Biennial",
    "2. Međunarodno bijenale vizuelnih medija Quanzhou Huaguang": "2nd Quanzhou Huaguang International Biennale of Visual Media",
    "Quanzhou, Kina": "Quanzhou, China",
    "Zaviri (u atelje), samostalna studentska izložba": "Come In (to the Studio), student solo exhibition",
    "Projekat Razlike, Akademija umetnosti": "Differences Project, Academy of Arts",
    "„IceCre“, samostalna izložba": "“IceCre”, solo exhibition",
    "Projekat Razlike, Akademija umetnosti 2024": "Differences Project, Academy of Arts 2024",
    "PROJEKAT": "PROJECT",
    "Umetnički rad": "Artwork",
    "Novi Sad": "Novi Sad",
    "„Dreams of Movement“": "“Dreams of Movement”",
    "Dreams of Movement — nagrada „Maja Momirov“": "Dreams of Movement — Maja Momirov Award",
    "Udruženje BAZA — pohvala žirija": "BAZA Association — jury commendation",
    "Esej i umetnički rad — Crowned Dogs": "Essay and artwork — Crowned Dogs",
    "Otvori publikaciju ↗": "Read the publication ↗",
    "Hajde da stvaramo": "Let's create",
    "Otvoren sam za nove projekte i upite galerija. Za saradnju ili umetničke konsultacije, pišite mi.": "I am open to new projects and gallery inquiries. For collaborations or art consultations, get in touch.",
    "Email upit": "Email inquiries",
    "Telefon": "Phone",
    "Društvene mreže": "Social media",
    "01 / Ime i prezime": "01 / Full name",
    "Email za odgovor": "Reply email",
    "02 / Kategorija projekta": "02 / Project category",
    "Umetnička fotografija": "Fine-art photography",
    "Digitalizacija umetničkih dela": "Artwork digitization",
    "Instalacija / izložba": "Installation / exhibition",
    "Ostalo": "Other",
    "03 / Poruka": "03 / Message",
    "Pošalji upit": "Send inquiry",
    "Nazad na vrh ↑": "Back to top ↑",
    "Vaše ime": "Your name",
    "Opišite vašu ideju": "Tell me about your idea",
    "Pejzaži": "Landscapes",
    "Portreti": "Portraits",
    "Test radovi": "Test works",
    "Fotografija pejzaža, rad 1": "Landscape photograph, work 1",
    "Fotografija pejzaža, rad 2": "Landscape photograph, work 2",
    "Portret, rad 1": "Portrait, work 1",
    "Portret, rad 2": "Portrait, work 2",
    "Digitalna slika, test rad 1": "Digital artwork, test work 1",
    "Digitalna slika, test rad 2": "Digital artwork, test work 2",
    "Digitalna slika, test rad 3": "Digital artwork, test work 3",
    "Digitalna slika, test rad 4": "Digital artwork, test work 4",
    "Serije za kategoriju": "No series have been added for",
    "još nisu dodate. Nazive serija i putanje do fotografija dodajte u fajl assets/data/gallery.json.": "yet. Add series names and image paths to assets/data/gallery.json.",
    "Naslovna fotografija nije dodata": "Cover image not added",
    "Fotografija nije mogla da se učita. Proverite putanju u assets/data/gallery.json.": "The image could not be loaded. Check its path in assets/data/gallery.json.",
    "Galerija trenutno ne može da učita listu serija. Osvežite stranicu ili proverite da li je fajl assets/data/gallery.json dostupan.": "The gallery could not load its series list. Refresh the page or check that assets/data/gallery.json is available.",
    "Galerija koristi ugrađene probne radove jer spisak galerije nije mogao da se učita.": "The gallery is showing its built-in test works because the series list could not be loaded.",
    "Radovi / 0": "Works / 0",
    "Naslovna fotografija kategorije Fotografija": "Photography category cover",
    "Naslovna slika kategorije Digitalna slika": "Digital Art category cover",
    "Naslovna slika kategorije Slike": "Paintings category cover",
    "Naslovna slika serije": "Series cover",
    "Otvaram email aplikaciju — pošaljite poruku iz nje.": "Opening your email app — send the message from there.",
    "Upit za saradnju: ": "Collaboration inquiry: ",
    "Ime i prezime: ": "Full name: ",
    "Email za odgovor: ": "Reply email: ",
    "Kategorija projekta: ": "Project category: ",
    "Poruka:\n": "Message:\n",
    "Uvećan prikaz rada": "Enlarged artwork view",
    "Nazad na karusel": "Back to carousel",
    "Otvori meni": "Open menu",
    "Zatvori meni": "Close menu",
    "Prethodni rad": "Previous work",
    "Sledeći rad": "Next work",
    "Uvećaj prikaz rada": "Enlarge artwork",
    "Točakov — početna": "Točakov — home",
    "Glavna navigacija": "Main navigation",
    "Izbor jezika": "Language selection",
    "Prethodne serije": "Previous series",
    "Sledeće serije": "Next series",
    "vas@email.com": "your@email.com",
    "Miloš Točaković Portrait": "Portrait of Miloš Točaković",
    "Miloš Točaković — Vizuelni umetnik i fotograf": "Miloš Točaković — Visual Artist and Photographer"
};
let currentLanguage = (() => {
    try {
        return localStorage.getItem("portfolio-language") === "en" ? "en" : "sr";
    } catch {
        return "sr";
    }
})();
let letterObserver = null;
const textSources = new WeakMap();
const attributeSources = new WeakMap();

intro.hidden = false;
document.body.classList.add("intro-is-active");

function localized(text) {
    return currentLanguage === "en" ? (englishCopy[text] || text) : text;
}

function applyLanguage(language) {
    currentLanguage = language === "en" ? "en" : "sr";
    letterObserver?.disconnect();
    document.body.classList.remove("letters-motion-ready");

    document.querySelectorAll("[data-letters-prepared]").forEach((element) => {
        element.innerHTML = element.dataset.originalMarkup;
        delete element.dataset.lettersPrepared;
        element.classList.remove("letters-visible");
    });

    if (currentLanguage === "en") {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
            const node = walker.currentNode;
            if (node.parentElement.closest("script, style, [aria-hidden='true']")) continue;
            const original = textSources.get(node) ?? node.nodeValue;
            textSources.set(node, original);
            const trimmed = original.trim();
            if (!trimmed) continue;
            const start = original.indexOf(trimmed);
            node.nodeValue = `${original.slice(0, start)}${localized(trimmed)}${original.slice(start + trimmed.length)}`;
        }
    } else {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
            const node = walker.currentNode;
            if (textSources.has(node)) node.nodeValue = textSources.get(node);
        }
    }

    document.querySelectorAll("[data-i18n-placeholder]").forEach((field) => {
        field.dataset.serbianPlaceholder ||= field.placeholder;
        field.placeholder = localized(field.dataset.serbianPlaceholder);
    });

    document.querySelectorAll("[aria-label], [alt], [title]").forEach((element) => {
        const values = attributeSources.get(element) || {};
        ["aria-label", "alt", "title"].forEach((name) => {
            if (!element.hasAttribute(name)) return;
            values[name] ??= element.getAttribute(name);
            element.setAttribute(name, localized(values[name]));
        });
        attributeSources.set(element, values);
    });

    const ariaLabels = [
        ["#site-brand", "Točakov — početna"],
        ["#menu-toggle", document.querySelector("#menu-toggle")?.getAttribute("aria-expanded") === "true" ? "Zatvori meni" : "Otvori meni"],
        ["#image-dialog", "Uvećan prikaz rada"],
        ["[data-close-zoom]", "Nazad na karusel"],
        ["#series-image-button", "Uvećaj prikaz rada"],
        ["#main-nav", "Glavna navigacija"],
        [".language-switch", "Izbor jezika"]
    ];
    ariaLabels.forEach(([selector, source]) => {
        const element = document.querySelector(selector);
        if (element) element.setAttribute("aria-label", localized(source));
    });
    document.querySelectorAll("[data-step-image]").forEach((button) => {
        button.setAttribute("aria-label", localized(Number(button.dataset.stepImage) < 0 ? "Prethodni rad" : "Sledeći rad"));
    });
    document.querySelectorAll("[data-scroll-series]").forEach((button) => {
        button.setAttribute("aria-label", localized(Number(button.dataset.scrollSeries) < 0 ? "Prethodne serije" : "Sledeće serije"));
    });

    document.documentElement.lang = currentLanguage;
    document.title = localized("Miloš Točaković — Vizuelni umetnik i fotograf");
    document.querySelectorAll("[data-language]").forEach((button) => {
        const selected = button.dataset.language === currentLanguage;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-pressed", String(selected));
    });

    prepareHeadingLetters();
    if (activeCategory && !seriesView.hidden) renderSeries();
    if (activeSeries && !worksView.hidden) {
        seriesTitle.textContent = localized(activeSeries.title);
        updateSeriesImage();
    }
}

document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
        if (button.dataset.language === currentLanguage) return;
        try {
            localStorage.setItem("portfolio-language", button.dataset.language);
        } catch {
            // Language switching still works when storage is unavailable.
        }
        applyLanguage(button.dataset.language);
    });
});

document.getElementById("contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const subject = `${localized("Upit za saradnju: ")}${data.get("category")}`;
    const body = [
        `${localized("Ime i prezime: ")}${data.get("name")}`,
        `${localized("Email za odgovor: ")}${data.get("email")}`,
        `${localized("Kategorija projekta: ")}${data.get("category")}`,
        "",
        `${localized("Poruka:\n")}${data.get("message")}`
    ].join("\n");
    document.getElementById("form-status").textContent = localized("Otvaram email aplikaciju — pošaljite poruku iz nje.");
    window.location.href = `mailto:milostocakovic.photo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

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
    seriesCategoryTitle.textContent = localized(category.title);
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
        seriesEmpty.textContent = currentLanguage === "en"
            ? `${localized("Serije za kategoriju")} “${localized(activeCategory.title)}” ${localized("još nisu dodate. Nazive serija i putanje do fotografija dodajte u fajl assets/data/gallery.json.")}`
            : `Serije za kategoriju „${activeCategory.title}“ još nisu dodate. Nazive serija i putanje do fotografija dodajte u fajl assets/data/gallery.json.`;
        return;
    }

    activeCategory.series.forEach((series) => {
        const card = document.createElement("button");
        card.className = "series-card";
        card.type = "button";
        const cover = series.cover || series.images?.[0]?.src;
        const fallback = document.createElement("span");
        fallback.className = "series-card__fallback";
        fallback.textContent = localized("Naslovna fotografija nije dodata");
        if (cover) {
            const image = document.createElement("img");
            image.src = cover;
            image.alt = `${localized("Naslovna slika serije")} ${localized(series.title)}`;
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
        title.textContent = localized(series.title);
        card.append(fallback, title);
        card.addEventListener("click", () => openSeries(series));
        seriesTrack.append(card);
    });
}

function openSeries(series) {
    activeSeries = series;
    activeImageIndex = 0;
    seriesTitle.textContent = localized(series.title);
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
        seriesImage.alt = localized(image.alt || `${activeSeries.title} — rad ${activeImageIndex + 1}`);
        seriesImage.onload = () => seriesImage.classList.add("is-loaded");
        seriesImage.onerror = () => {
            seriesImage.hidden = true;
            seriesImageButton.disabled = true;
            seriesImageEmpty.textContent = localized("Fotografija nije mogla da se učita. Proverite putanju u assets/data/gallery.json.");
            seriesImageEmpty.hidden = false;
        };
    } else {
        seriesImage.removeAttribute("src");
        seriesImage.alt = "";
        seriesImageEmpty.textContent = localized("U ovoj seriji još nema dodatih fotografija.");
    }
    if (!imageDialog.hidden && image) {
        zoomedImage.src = image.src;
        zoomedImage.alt = seriesImage.alt;
    }
    seriesPosition.textContent = image
        ? `${String(activeImageIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`
        : localized("Radovi / 0");
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

function prepareHeadingLetters() {
    if (!("IntersectionObserver" in window) || reducedMotion.matches) return;
    letterObserver?.disconnect();
    letterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("letters-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15 });

    const wrapText = (node, index = { value: 0 }) => {
        if (node.nodeType === Node.TEXT_NODE) {
            const fragment = document.createDocumentFragment();
            [...node.textContent].forEach((character) => {
                const letter = document.createElement("span");
                letter.className = "letter-char";
                letter.style.setProperty("--letter-index", index.value++);
                letter.textContent = character === " " ? "\u00a0" : character;
                fragment.append(letter);
            });
            node.replaceWith(fragment);
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "BR") {
            [...node.childNodes].forEach((child) => wrapText(child, index));
        }
    };

    document.querySelectorAll("#home h1, #gallery h2, #about h2, #about h3, #exhibitions h3, #exhibitions h4, #contact h2").forEach((element) => {
        element.dataset.originalMarkup ||= element.innerHTML;
        element.dataset.lettersPrepared = "true";
        wrapText(element);
        letterObserver.observe(element);
    });
    document.body.classList.add("letters-motion-ready");
}

if ("IntersectionObserver" in window && !reducedMotion.matches) {
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

applyLanguage(currentLanguage);

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
            seriesEmpty.textContent = localized("Galerija koristi ugrađene probne radove jer spisak galerije nije mogao da se učita.");
        }
    });
