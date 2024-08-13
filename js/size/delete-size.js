function deleteSize(_id) {
    fetch(`http://127.0.0.1:5000/size/id/${_id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    })
    .then (() => {
        showNotification();
    })
    .then(() => {
        window.location.href = '/app/size/sizes.html';
    });
}

/**
 * Shows a notification when the size is deleted
 */
function showNotification() {
    let sizeAlert = $("#size-alert");
    sizeAlert.toggle();
    setTimeout(() => sizeAlert.toggle(), 5000);
}