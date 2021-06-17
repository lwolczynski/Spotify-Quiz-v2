const personalized_playlists = {
    items: [
        {
            images: [
                {
                    url: '/img/covers/short_term.png',
                },
            ],
            id: 'top-short_term',
            name: 'Your Top Tracks (last 4 weeks)',
            tracks: {
                href: 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term',
            },
            playlistType: 'top',
        },
        {
            images: [
                {
                    url: '/img/covers/medium_term.png',
                },
            ],
            id: 'top-medium_term',
            name: 'Your Top Tracks (last 6 months)',
            tracks: {
                href: 'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term',
            },
            playlistType: 'top',
        },
        {
            images: [
                {
                    url: '/img/covers/long_term.png',
                },
            ],
            id: 'top-long_term',
            name: 'Your Top Tracks Ever',
            tracks: {
                href: 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term',
            },
            playlistType: 'top',
        },
        {
            images: [
                {
                    url: '/img/covers/recent.png',
                },
            ],
            id: 'recently-played',
            name: 'Recently Played',
            tracks: {
                href: 'https://api.spotify.com/v1/me/player/recently-played',
            },
            playlistType: 'recent',
        },
    ],
};

export default personalized_playlists;
