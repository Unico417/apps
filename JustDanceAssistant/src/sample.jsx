import React from 'react';
import ReactDOM from 'react-dom/client';
import { SongList } from './ReactViews/SongList';

(function main () {
    const songListNode = document.getElementById('song-list');
    const songListRoot = ReactDOM.createRoot(songListNode);
    songListRoot.render(<SongList />);
})();
