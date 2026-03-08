const i18n = (() => {
    let currentLang = 'he';

    const translations = {
        he: {
            meta: {
                title: 'המטבח האיטלקי — מתכונים אותנטיים',
                description: 'המטבח האיטלקי — מתכונים אותנטיים מאיטלקי, בעברית.'
            },
            header: {
                logo: 'המטבח האיטלקי',
                backToRecipes: 'חזרה למתכונים'
            },
            hero: {
                title: 'המטבח',
                titleHighlight: 'האיטלקי',
                subtitle: 'מתכונים אותנטיים מהלב של איטליה',
                searchPlaceholder: 'חיפוש מתכון...'
            },
            categories: {
                all: 'הכל',
                pasta: 'פסטה',
                pizza: 'פיצה',
                risotto: 'ריזוטו',
                desserts: 'קינוחים',
                mainDishes: 'מנות עיקריות'
            },
            difficulty: {
                easy: 'קל',
                medium: 'בינוני',
                hard: 'מאתגר'
            },
            detail: {
                prepTime: 'זמן הכנה',
                cookTime: 'זמן בישול',
                servings: 'מנות',
                difficulty: 'רמת קושי',
                ingredients: 'מצרכים',
                instructions: 'הוראות הכנה',
                tags: 'תגיות',
                whatsappShare: 'שלח רשימת קניות ב-WhatsApp',
                minute: 'דקה',
                minutes: 'דקות',
                serving: 'מנה',
                servingsPlural: 'מנות'
            },
            search: {
                noResults: 'לא נמצאו מתכונים',
                tryAgain: 'נסו לשנות את מילות החיפוש או לבחור קטגוריה אחרת',
                clearFilters: 'נקה חיפוש',
                resultsCount: 'נמצאו {count} מתכונים'
            },
            loading: 'טוען מתכונים...',
            footer: {
                tagline: 'המטבח האיטלקי — מתכונים אותנטיים מאיטלקי, בעברית',
                backToHub: 'לעוד מתכוני עולם — חזרה לרכזת המתכונים'
            }
        },
        en: {
            meta: {
                title: 'Italian Kitchen — Authentic Recipes',
                description: 'Italian Kitchen — Authentic recipes from Italy.'
            },
            header: {
                logo: 'Italian Kitchen',
                backToRecipes: 'Back to Recipes'
            },
            hero: {
                title: 'Italian',
                titleHighlight: 'Kitchen',
                subtitle: 'Authentic recipes from the heart of Italy',
                searchPlaceholder: 'Search recipe...'
            },
            categories: {
                all: 'All',
                pasta: 'Pasta',
                pizza: 'Pizza',
                risotto: 'Risotto',
                desserts: 'Desserts',
                mainDishes: 'Main Dishes'
            },
            difficulty: {
                easy: 'Easy',
                medium: 'Medium',
                hard: 'Hard'
            },
            detail: {
                prepTime: 'Prep Time',
                cookTime: 'Cook Time',
                servings: 'Servings',
                difficulty: 'Difficulty',
                ingredients: 'Ingredients',
                instructions: 'Instructions',
                tags: 'Tags',
                whatsappShare: 'Share shopping list on WhatsApp',
                minute: 'minute',
                minutes: 'minutes',
                serving: 'serving',
                servingsPlural: 'servings'
            },
            search: {
                noResults: 'No recipes found',
                tryAgain: 'Try different search terms or select another category',
                clearFilters: 'Clear search',
                resultsCount: 'Found {count} recipes'
            },
            loading: 'Loading recipes...',
            footer: {
                tagline: 'Italian Kitchen — Authentic recipes from Italy',
                backToHub: 'More world recipes — Back to Recipe Hub'
            }
        }
    };

    function t(key) {
        const keys = key.split('.');
        let value = translations[currentLang];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        return value || key;
    }

    function setLanguage(lang) {
        if (!translations[lang]) {
            console.error(`Language not supported: ${lang}`);
            return;
        }
        currentLang = lang;
    }

    function getLanguage() {
        return currentLang;
    }

    function detectLanguage() {
        const saved = localStorage.getItem('lang');
        if (saved && translations[saved]) {
            return saved;
        }

        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('he')) return 'he';
        return 'en';
    }

    function init() {
        const detectedLang = detectLanguage();
        setLanguage(detectedLang);
        return detectedLang;
    }

    return {
        t,
        setLanguage,
        getLanguage,
        detectLanguage,
        init
    };
})();
