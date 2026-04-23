const CACHE_NAME = 'bible-project-v1';
const STATIC_ASSETS = [
    './',
'./index.html',
'./web_scripts_js/init_load.js',
'./web_scripts_js/main_scripts.js',
'./web_scripts_js/offsets_n_counts.js',
'./web_scripts_js/story_scripts.js',
'./data/story_table.js',
'./data/web/Genesis.js',
'./data/web/Exodus.js',
'./data/web/Leviticus.js',
'./data/web/Numbers.js',
'./data/web/Deuteronomy.js',
'./data/web/Joshua.js',
'./data/web/Judges.js',
'./data/web/1Samuel.js',
'./data/web/2Samuel.js',
'./data/web/1Kings.js',
'./data/web/2Kings.js',
'./data/web/Isaiah.js',
'./data/web/Jeremiah.js',
'./data/web/Ezekiel.js',
'./data/web/Hosea.js',
'./data/web/Joel.js',
'./data/web/Amos.js',
'./data/web/Obadiah.js',
'./data/web/Jonah.js',
'./data/web/Micah.js',
'./data/web/Nahum.js',
'./data/web/Habakkuk.js',
'./data/web/Zephaniah.js',
'./data/web/Haggai.js',
'./data/web/Zechariah.js',
'./data/web/Malachi.js',
'./data/web/Psalms.js',
'./data/web/Proverbs.js',
'./data/web/Job.js',
'./data/web/SongofSongs.js',
'./data/web/Ruth.js',
'./data/web/Lamentations.js',
'./data/web/Ecclesiastes.js',
'./data/web/Esther.js',
'./data/web/Daniel.js',
'./data/web/Ezra.js',
'./data/web/Nehemiah.js',
'./data/web/1Chronicles.js',
'./data/web/2Chronicles.js',
'./data/web/Matthew.js',
'./data/web/Mark.js',
'./data/web/Luke.js',
'./data/web/John.js',
'./data/web/Acts.js',
'./data/web/Romans.js',
'./data/web/1Corinthians.js',
'./data/web/2Corinthians.js',
'./data/web/Galatians.js',
'./data/web/Ephesians.js',
'./data/web/Philippians.js',
'./data/web/Colossians.js',
'./data/web/1Thessalonians.js',
'./data/web/2Thessalonians.js',
'./data/web/1Timothy.js',
'./data/web/2Timothy.js',
'./data/web/Titus.js',
'./data/web/Philemon.js',
'./data/web/Hebrews.js',
'./data/web/James.js',
'./data/web/1Peter.js',
'./data/web/2Peter.js',
'./data/web/1John.js',
'./data/web/2John.js',
'./data/web/3John.js',
'./data/web/Jude.js',
'./data/web/Revelation.js',
'./manifest.json'
];

// 1. Install Phase: Save the core app files
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Forces the new service worker to become active immediately
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
});

// 2. Fetch Phase: Intercept requests for Bible data scripts
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return cached file if found
            if (cachedResponse) return cachedResponse;

            // Otherwise, fetch from network
            return fetch(event.request).then((networkResponse) => {
                // Only cache successful responses and data files
                if (networkResponse.ok && event.request.url.includes('/data/')) {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                }
                return networkResponse;
            });
        })
    );
});

self.addEventListener('activate', (event) => {
    // Forces the service worker to take control of all open tabs immediately
    event.waitUntil(clients.claim());
});
