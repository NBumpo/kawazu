function clock() {
    const clockElement = document.getElementById('usertime');
    const dateElement = document.getElementById('userdate')
    const now = new Date();
    const userTime = now.toLocaleTimeString();
    const userDate = now.toLocaleDateString();
    clockElement.textContent = `${userTime}`;
    dateElement.textContent = `${userDate}`;
}

clock();
setInterval(clock, 1000);

document.getElementById('toggle').addEventListener('change', function () {
    if (this.checked) {
        const clockbento = document.getElementById('clockbento');
        clockbento.classList.toggle('blue');
    } else {
        const clockbento = document.getElementById('clockbento');
        clockbento.classList.toggle('blue');
    }



})

// url Async requesting function
function httpGetAsync(theUrl, callback) {
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}

// callback for the top 8 GIFs of search
function tenorCallback_search(responsetext) {
    // Parse the JSON response
    var response_objects = JSON.parse(responsetext);

    top_10_gifs = response_objects["results"];

    // load the GIFs -- for our example we will load the first GIFs preview size (nanogif) and share size (gif)

    document.getElementById("first_gif").src = top_10_gifs[0]["media_formats"]["nanogif"]["url"];
    document.getElementById("second_gif").src = top_10_gifs[1]["media_formats"]["nanogif"]["url"];
    document.getElementById("third_gif").src = top_10_gifs[2]["media_formats"]["nanogif"]["url"];
    document.getElementById("fourth_gif").src = top_10_gifs[3]["media_formats"]["gif"]["url"];
    document.getElementById("fifth_gif").src = top_10_gifs[4]["media_formats"]["gif"]["url"];

    return;

}

gifSearchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        grab_data();
    }
});

// function to call the trending and category endpoints
function grab_data() {
    // set the apikey and limit
    var apikey = "AIzaSyD93Q2nJShuutpxkKbeD5LX63VnyjLaN04";
    var clientkey = "my_test_app";
    var lmt = 8;

    // test search term
    var search_term = document.getElementById('gifSearchInput').value;






    // using default locale of en_US
    var search_url = "https://tenor.googleapis.com/v2/search?q=" + search_term + "&key=" +
        apikey + "&client_key=" + clientkey + "&limit=" + lmt;

    httpGetAsync(search_url, tenorCallback_search);

    // data will be loaded by each call's callback
    return;
}


// SUPPORT FUNCTIONS ABOVE
// MAIN BELOW

// start the flow
grab_data();
