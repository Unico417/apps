import React from 'react';
import ReactDOM from 'react-dom/client';
import { SongList } from './ReactViews/SongList';
import { SongListManager } from './SongListManager';
import { checkMobile } from './Utils';

(function main () {

    const app = {};
    window.app = app;

    const manager = new SongListManager();
    const mobile = checkMobile();
    manager.mobile = mobile;

    window.onresize = () => {
        const isMobile = checkMobile();
        manager.mobile = isMobile;
    };

    const songListNode = document.getElementById('song-list');
    const songListRoot = ReactDOM.createRoot(songListNode);
    songListRoot.render(
        <SongList
            manager={manager} />
    );
})();
