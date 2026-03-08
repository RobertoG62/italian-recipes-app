/* ======================================
   App — Router, Init, Orchestration
   ====================================== */

(async function App() {
    let debounceTimer = null;

    // Initialize i18n and detect language
    const detectedLang = i18n.init();
    applyLanguageSettings(detectedLang);

    UI.showLoading();

    try {
        await RecipeData.fetchRecipes(detectedLang);
    } catch (err) {
        console.error('Failed to load recipes:', err);
        const errorMsg = i18n.getLanguage() === 'he'
            ? 'שגיאה בטעינת המתכונים'
            : 'Error loading recipes';
        const retryMsg = i18n.getLanguage() === 'he'
            ? 'נסו שוב'
            : 'Try again';
        document.getElementById('loading-state').innerHTML = `
            <div class="text-center">
                <div class="text-5xl mb-4"><i class="fas fa-exclamation-triangle"></i></div>
                <p class="font-bold mb-2">${errorMsg}</p>
                <button onclick="location.reload()" class="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    ${retryMsg}
                </button>
            </div>
        `;
        return;
    }

    function applyLanguageSettings(lang) {
        // Update HTML attributes
        document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang === 'he' ? 'he' : 'en';

        // Update meta tags
        document.title = i18n.t('meta.title');
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', i18n.t('meta.description'));
        }

        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            ogTitle.setAttribute('content', i18n.t('meta.title'));
        }

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
            ogDesc.setAttribute('content', i18n.t('meta.description'));
        }
    }

    function updateStaticText() {
        // Update header logo
        const logoText = document.querySelector('#header-logo span:last-child');
        if (logoText) logoText.textContent = i18n.t('header.logo');

        // Update search placeholder
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.placeholder = i18n.t('hero.searchPlaceholder');

        // Update back button
        const backBtn = document.querySelector('#back-btn span');
        if (backBtn) backBtn.textContent = i18n.t('header.backToRecipes');

        // Update hero title (preserving highlight structure)
        const heroTitle = document.querySelector('#hero h1');
        if (heroTitle) {
            if (i18n.getLanguage() === 'he') {
                heroTitle.innerHTML = `${i18n.t('hero.title')} <span class="text-it-primary">${i18n.t('hero.titleHighlight')}</span>`;
            } else {
                heroTitle.innerHTML = `<span class="text-it-primary">${i18n.t('hero.titleHighlight')}</span> ${i18n.t('hero.title')}`;
            }
        }

        // Update hero subtitle
        const heroSubtitle = document.querySelector('#hero p');
        if (heroSubtitle) heroSubtitle.textContent = i18n.t('hero.subtitle');

        // Update empty state text
        const emptyStateTitle = document.querySelector('#empty-state h3');
        if (emptyStateTitle) emptyStateTitle.textContent = i18n.t('search.noResults');

        const emptyStateDesc = document.querySelector('#empty-state p');
        if (emptyStateDesc) emptyStateDesc.textContent = i18n.t('search.tryAgain');

        const clearFiltersBtn = document.getElementById('clear-filters-btn');
        if (clearFiltersBtn) clearFiltersBtn.textContent = i18n.t('search.clearFilters');

        // Update loading state
        const loadingText = document.querySelector('#loading-state p');
        if (loadingText) loadingText.textContent = i18n.t('loading');

        // Update footer tagline (find text nodes and update)
        const footerTagline = document.querySelector('footer p');
        if (footerTagline) {
            // Replace text while preserving heart icon
            const heartIcon = footerTagline.querySelector('i');
            footerTagline.textContent = i18n.t('footer.tagline');
            if (heartIcon) {
                footerTagline.innerHTML = `${i18n.t('footer.tagline')} ${heartIcon.outerHTML}`;
            }
        }

        // Update back to hub link
        const hubLink = document.querySelector('footer a span');
        if (hubLink) hubLink.textContent = i18n.t('footer.backToHub');
    }

    function renderHome() {
        const state = RecipeData.getState();
        UI.renderFilters(state.categories, state.activeCategory, onCategoryClick);
        UI.renderCards(state.filteredRecipes);
        UI.renderResultCount(state.filteredRecipes.length, state.recipes.length);
    }

    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear');

    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const state = RecipeData.getState();
            RecipeData.filterRecipes(searchInput.value, state.activeCategory);
            renderHome();
        }, 200);
        searchClear.classList.toggle('hidden', !searchInput.value);
    });

    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.classList.add('hidden');
        const state = RecipeData.getState();
        RecipeData.filterRecipes('', state.activeCategory);
        renderHome();
    });

    function onCategoryClick(category) {
        RecipeData.filterRecipes(searchInput.value, category);
        renderHome();
    }

    document.getElementById('clear-filters-btn').addEventListener('click', () => {
        searchInput.value = '';
        searchClear.classList.add('hidden');
        RecipeData.filterRecipes('', 'all');
        renderHome();
    });

    document.getElementById('back-btn').addEventListener('click', () => {
        location.hash = '#/';
    });

    const header = document.getElementById('app-header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('header-glass', window.scrollY > 50);
    }, { passive: true });

    function handleRoute() {
        const hash = location.hash || '#/';
        if (hash.startsWith('#/recipe/')) {
            const id = hash.replace('#/recipe/', '');
            const recipe = RecipeData.getRecipeById(id);
            if (recipe) {
                UI.renderRecipeDetail(recipe);
                UI.showRecipeView();
            } else {
                location.hash = '#/';
            }
        } else {
            UI.showHome();
            renderHome();
        }
    }

    // Language switcher event listeners
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            const lang = this.getAttribute('data-lang');
            await switchLanguage(lang);
        });
    });

    async function switchLanguage(lang) {
        // Save preference
        localStorage.setItem('lang', lang);

        // Update i18n
        i18n.setLanguage(lang);

        // Update HTML/meta
        applyLanguageSettings(lang);

        // Reload recipes in new language
        UI.showLoading();
        await RecipeData.switchLanguage(lang);

        // Re-render UI
        renderHome();
        updateStaticText();

        // Update active button state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    // Initialize static text and language buttons
    updateStaticText();
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === i18n.getLanguage());
    });

    window.addEventListener('hashchange', handleRoute);
    handleRoute();
})();
