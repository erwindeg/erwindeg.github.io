(() => {
    const gallery = document.querySelector("[data-gallery]");
    const lightbox = document.querySelector("[data-lightbox]");
    const photogrid = document.querySelector("[data-photogrid]");

    if (!gallery || !lightbox) {
        return;
    }

    const imageEl = lightbox.querySelector(".lightbox__image");
    const captionEl = lightbox.querySelector(".lightbox__caption");
    const closeBtn = lightbox.querySelector(".lightbox__close");
    const prevBtn = lightbox.querySelector(".lightbox__nav--prev");
    const nextBtn = lightbox.querySelector(".lightbox__nav--next");
    const collectionDataNodes = document.querySelectorAll(".portfolio-collection-data");

    const collections = new Map();
    collectionDataNodes.forEach((node) => {
        const key = node.dataset.collection;
        if (!key) {
            return;
        }
        try {
            const parsed = JSON.parse(node.textContent.trim());
            if (Array.isArray(parsed) && parsed.length > 0) {
                collections.set(key, parsed);
            }
        } catch (error) {
            console.error(`Failed to parse collection data for ${key}`, error);
        }
    });

    let currentIndex = 0;
    let currentCollectionKey = "";
    let currentCollection = [];
    let lightboxOpen = false;
    let photogridOpen = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchActive = false;
    let swipeHandled = false;

    const updateSlide = (index) => {
        if (!currentCollection.length) {
            return;
        }

        const boundedIndex = Math.max(0, Math.min(index, currentCollection.length - 1));
        const item = currentCollection[boundedIndex];
        if (!item) {
            return;
        }

        const fullSrc = item.src;
        const caption = item.caption || "";
        const alt = item.alt || "Gallery image";

        imageEl.src = fullSrc;
        imageEl.alt = alt;
        captionEl.textContent = caption;
        currentIndex = boundedIndex;
    };

    const openLightbox = (collectionKey, index) => {
        const items = collections.get(collectionKey);
        if (!items || items.length === 0) {
            return;
        }

        currentCollectionKey = collectionKey;
        currentCollection = items;
        touchActive = false;

        lightbox.hidden = false;
        requestAnimationFrame(() => {
            lightbox.dataset.open = "true";
        });
        document.body.classList.add("lightbox-open");
        lightboxOpen = true;
        swipeHandled = false;
        updateSlide(index);
    };

    const closeLightbox = () => {
        lightbox.dataset.open = "false";
        document.body.classList.remove("lightbox-open");
        lightboxOpen = false;
        currentCollection = [];
        currentCollectionKey = "";
        currentIndex = 0;
        captionEl.textContent = "";
        touchActive = false;
        swipeHandled = false;
        setTimeout(() => {
            lightbox.hidden = true;
            imageEl.src = "";
        }, 250);
    };

    const openPhotoGrid = (collectionKey, startIndex) => {
        const items = collections.get(collectionKey);
        if (!items || items.length === 0) {
            return;
        }

        const gridEl = photogrid.querySelector(".photogrid__grid");
        const titleEl = photogrid.querySelector(".photogrid__title");

        // Clear and populate grid
        gridEl.innerHTML = "";
        items.forEach((item, index) => {
            // Thumbs mirror fulls structure in /images/thumbs/COLLECTION/ with .webp extension
            const thumbSrc = item.src.replace(/\/images\/fulls\/([^/]+)\//, "/images/thumbs/$1/")
                .replace(/\.[^.]+$/, ".webp");
            const btn = document.createElement("button");
            btn.className = "photogrid__item";
            btn.dataset.gridIndex = index;
            btn.innerHTML = `<img src="${siteBaseurl()}${thumbSrc}" alt="${item.alt || ""}" loading="lazy">`;
            btn.addEventListener("click", () => {
                closePhotoGrid();
                setTimeout(() => openLightbox(collectionKey, index), 200);
            });
            gridEl.appendChild(btn);
        });

        // Set title from first item caption
        if (items.length > 0 && items[0].caption) {
            titleEl.textContent = items[0].caption;
        }

        photogrid.hidden = false;
        requestAnimationFrame(() => {
            photogrid.dataset.open = "true";
        });
        photogridOpen = true;
    };

    const closePhotoGrid = () => {
        photogrid.dataset.open = "false";
        photogridOpen = false;
        setTimeout(() => {
            photogrid.hidden = true;
        }, 250);
    };

    const siteBaseurl = () => {
        const base = document.querySelector('base');
        return base ? base.getAttribute("href") : "";
    };

    const showNext = () => {
        if (currentCollection.length <= 1) {
            return;
        }
        const nextIndex = (currentIndex + 1) % currentCollection.length;
        updateSlide(nextIndex);
    };

    const showPrev = () => {
        if (currentCollection.length <= 1) {
            return;
        }
        const prevIndex = (currentIndex - 1 + currentCollection.length) % currentCollection.length;
        updateSlide(prevIndex);
    };

    gallery.addEventListener("click", (event) => {
        const anchor = event.target.closest("[data-gallery-item] a");
        if (!anchor) {
            return;
        }
        const collectionKey = anchor.dataset.collection;
        if (!collectionKey || !collections.has(collectionKey)) {
            return;
        }
        event.preventDefault();

        openPhotoGrid(collectionKey, 0);
    });

    closeBtn?.addEventListener("click", closeLightbox);
    prevBtn?.addEventListener("click", showPrev);
    nextBtn?.addEventListener("click", showNext);

    // Close photogrid button
    photogrid?.querySelector(".photogrid__close")?.addEventListener("click", closePhotoGrid);

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Close photogrid on backdrop click
    photogrid?.addEventListener("click", (event) => {
        if (event.target === photogrid) {
            closePhotoGrid();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (photogridOpen) {
            if (event.key === "Escape") {
                event.preventDefault();
                closePhotoGrid();
            }
            return;
        }
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

    const handleTouchStart = (event) => {
        if (!lightboxOpen) {
            return;
        }
        const touch = event.changedTouches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchActive = true;
        swipeHandled = false;
    };

    const handleTouchMove = (event) => {
        if (!touchActive) {
            return;
        }
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;
        if (Math.abs(deltaX) > Math.abs(deltaY) && event.cancelable) {
            event.preventDefault();
        }
    };

    const handleTouchEnd = (event) => {
        if (!touchActive) {
            return;
        }
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;

        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) {
                showNext();
            } else {
                showPrev();
            }
            swipeHandled = true;
        }
        touchActive = false;
    };

    lightbox.addEventListener("touchstart", handleTouchStart, { passive: true });
    lightbox.addEventListener("touchmove", handleTouchMove, { passive: false });
    lightbox.addEventListener("touchend", handleTouchEnd, { passive: true });

    imageEl?.addEventListener("click", (event) => {
        if (!lightboxOpen || currentCollection.length <= 1) {
            return;
        }

        if (swipeHandled) {
            swipeHandled = false;
            return;
        }

        const rect = imageEl.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const ratio = rect.width > 0 ? x / rect.width : 0.5;

        if (ratio <= 0.35) {
            showPrev();
        } else if (ratio >= 0.65) {
            showNext();
        }

        event.stopPropagation();
    });
})();
