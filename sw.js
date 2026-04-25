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
'./data/bsb/Genesis.js',
'./data/bsb/Exodus.js',
'./data/bsb/Leviticus.js',
'./data/bsb/Numbers.js',
'./data/bsb/Deuteronomy.js',
'./data/bsb/Joshua.js',
'./data/bsb/Judges.js',
'./data/bsb/1Samuel.js',
'./data/bsb/2Samuel.js',
'./data/bsb/1Kings.js',
'./data/bsb/2Kings.js',
'./data/bsb/Isaiah.js',
'./data/bsb/Jeremiah.js',
'./data/bsb/Ezekiel.js',
'./data/bsb/Hosea.js',
'./data/bsb/Joel.js',
'./data/bsb/Amos.js',
'./data/bsb/Obadiah.js',
'./data/bsb/Jonah.js',
'./data/bsb/Micah.js',
'./data/bsb/Nahum.js',
'./data/bsb/Habakkuk.js',
'./data/bsb/Zephaniah.js',
'./data/bsb/Haggai.js',
'./data/bsb/Zechariah.js',
'./data/bsb/Malachi.js',
'./data/bsb/Psalms.js',
'./data/bsb/Proverbs.js',
'./data/bsb/Job.js',
'./data/bsb/SongofSongs.js',
'./data/bsb/Ruth.js',
'./data/bsb/Lamentations.js',
'./data/bsb/Ecclesiastes.js',
'./data/bsb/Esther.js',
'./data/bsb/Daniel.js',
'./data/bsb/Ezra.js',
'./data/bsb/Nehemiah.js',
'./data/bsb/1Chronicles.js',
'./data/bsb/2Chronicles.js',
'./data/bsb/Matthew.js',
'./data/bsb/Mark.js',
'./data/bsb/Luke.js',
'./data/bsb/John.js',
'./data/bsb/Acts.js',
'./data/bsb/Romans.js',
'./data/bsb/1Corinthians.js',
'./data/bsb/2Corinthians.js',
'./data/bsb/Galatians.js',
'./data/bsb/Ephesians.js',
'./data/bsb/Philippians.js',
'./data/bsb/Colossians.js',
'./data/bsb/1Thessalonians.js',
'./data/bsb/2Thessalonians.js',
'./data/bsb/1Timothy.js',
'./data/bsb/2Timothy.js',
'./data/bsb/Titus.js',
'./data/bsb/Philemon.js',
'./data/bsb/Hebrews.js',
'./data/bsb/James.js',
'./data/bsb/1Peter.js',
'./data/bsb/2Peter.js',
'./data/bsb/1John.js',
'./data/bsb/2John.js',
'./data/bsb/3John.js',
'./data/bsb/Jude.js',
'./data/bsb/Revelation.js',
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
