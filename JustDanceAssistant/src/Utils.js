/**
 * グローバルなUIDを返す
 * @returns {String}
 */
function uid () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * 引数全てが定義済みであれば、trueを返す
 * @param  {...any} targets 
 * @returns 
 */
function defined (...targets) {
    let result = true;
    for (const target of targets) {
        result = result
            && !(target === undefined || target === null);
    }
    return result;
}

/**
 * スマートフォンからのアクセスであれば、`<main>`に"mobile"クラスを付与する
 * @returns {Boolean}
 */
function checkMobile () {
    const width = window.innerWidth;
    const main = document.getElementsByTagName('main')[0];
    let mobile = false;

    if (width < 950) {
        main.classList.add('mobile');
        mobile = true;
    } else {
        main.classList.remove('mobile');
        mobile = false;
    }

    return mobile;
}

export { uid, defined, checkMobile };
