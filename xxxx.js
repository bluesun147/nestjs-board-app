function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    })
}

async function getApple() {
    await delay(2000);
    return 'apple!';
}