function isDeviceAMobile(){
    let screenWidth = window.screen.width;
    let screenHeight = window.screen.height;
    let isTouchSupported = navigator.maxTouchPoints > 0 ? true: false;
    let isScreenSmall = function(){
        let iPadScreenWidth = 768;
        let iPadScreenHeight = 1024; // assumption most popular tablet is largest;
        if (screenWidth <= iPadScreenWidth && screenHeight <= iPadScreenHeight) return true;
        if (screenWidth <= iPadScreenHeight && screenHeight <= iPadScreenWidth) return true;
        return false;
    }
    // if whole screen is small, and touch is supported, most probably this is a mobie device
    if (isScreenSmall() && isTouchSupported) return true;
    return false;
}
(function showWarinigForMobiles(){
    if (isDeviceAMobile()) document.querySelector('#warningForMobiles').setAttribute('data-visible', true)
})()