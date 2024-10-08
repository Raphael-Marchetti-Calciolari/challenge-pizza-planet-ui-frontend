async function postSize(size) {

    res = await fetch('http://127.0.0.1:5000/size/', {
        method: 'POST',
        body: JSON.stringify(size),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
    res = await res.json();
    showNotification();
    return res


}

/**
 * Get the form and submit it with fetch API
 */
let sizeForm = $("#size-form");
sizeForm.submit(event => {

    let size = getSizeData();
    postSize(size).then(() => {
        window.location.href = '/app/size/sizes.html';
    });

    event.preventDefault();
    event.currentTarget.reset();
});

/**
 * Gets the order data with JQuery
 */
function getSizeData() {

    return {
        name: $("input[name='name']").val(),
        price: $("input[name='price']").val(),
    };
}

/**
 * Shows a notification when the order is accepted
 */
function showNotification() {
    let sizeAlert = $("#size-alert");
    sizeAlert.toggle();
    setTimeout(() => sizeAlert.toggle(), 5000);
}