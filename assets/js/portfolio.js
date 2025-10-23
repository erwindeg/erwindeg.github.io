(() => {
    const gallery = document.querySelector("[data-gallery]");
    const lightbox = document.querySelector("[data-lightbox]");

    if (!gallery || !lightbox) {
        return;
    }

    const imageEl = lightbox.querySelector(".lightbox__image");
    const captionEl = lightbox.querySelector(".lightbox__caption");
    const closeBtn = lightbox.querySelector(".lightbox__close");
    const prevBtn = lightbox.querySelector(".lightbox__nav--prev");
    const nextBtn = lightbox.querySelector(".lightbox__nav--next");
    const triggers = Array.from(gallery.querySelectorAll("[data-gallery-item] a"));

    let currentIndex = 0;
    let lightboxOpen = false;

    const updateSlide = (index) => {
        const item = triggers[index];
        if (!item) {
            return;
        }

        const fullSrc = item.dataset.full || item.getAttribute("href");
        const caption = item.dataset.caption || "";
        const alt = item.querySelector("img")?.getAttribute("alt") || "Gallery image";

        imageEl.src = fullSrc;
        imageEl.alt = alt;
        captionEl.textContent = caption;
        currentIndex = index;
        toggleNavDisabled();
    };

    const toggleNavDisabled = () => {
        const isFirst = currentIndex === 0;
        const isLast = currentIndex === triggers.length - 1;

        prevBtn.disabled = isFirst;
        nextBtn.disabled = isLast;
        prevBtn.setAttribute("aria-disabled", String(isFirst));
        nextBtn.setAttribute("aria-disabled", String(isLast));
    };

    const openLightbox = (index) => {
        if (triggers.length === 0) {
            return;
        }

        lightbox.hidden = false;
        requestAnimationFrame(() => {
            lightbox.dataset.open = "true";
        });
        document.body.classList.add("lightbox-open");
        lightboxOpen = true;
        updateSlide(index);
    };

    const closeLightbox = () => {
        lightbox.dataset.open = "false";
        document.body.classList.remove("lightbox-open");
        lightboxOpen = false;
        setTimeout(() => {
            lightbox.hidden = true;
            imageEl.src = "";
        }, 250);
    };

    const showNext = () => {
        if (currentIndex < triggers.length - 1) {
            updateSlide(currentIndex + 1);
        }
    };

    const showPrev = () => {
        if (currentIndex > 0) {
            updateSlide(currentIndex - 1);
        }
    };

    gallery.addEventListener("click", (event) => {
        const anchor = event.target.closest("[data-gallery-item] a");
        if (!anchor) {
            return;
        }
        event.preventDefault();
        const index = triggers.indexOf(anchor);
        if (index >= 0) {
            openLightbox(index);
        }
    });

    closeBtn?.addEventListener("click", closeLightbox);
    prevBtn?.addEventListener("click", showPrev);
    nextBtn?.addEventListener("click", showNext);

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (!lightboxOpen) {
            return;
        }
        switch (event.key) {
        case "Escape":
            closeLightbox();
            break;
        case "ArrowLeft":
            showPrev();
            break;
        case "ArrowRight":
            showNext();
            break;
        default:
            break;
        }
    });
})();
