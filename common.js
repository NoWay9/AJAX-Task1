var get = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState != xhr.DONE) return;

    var status = xhr.status;
    var headers = xhr.getAllResponseHeaders();
    var text = xhr.responseText;

    callback(status, headers, text);
  }

  xhr.send();
}

var appendImage = function (url) {
  var imgEl = document.createElement('img');

  imgEl.src = url;

  imgEl.onerror = function () {
    this.style.display = 'none';
  }

  document.getElementById('images').appendChild(imgEl);
}

var getImages = function (params) {
  var params = params || {};
  params.category = encodeURIComponent(params.category);
  if (!isNaN(params.limit)) params.limit = encodeURIComponent(params.limit);
  else params.limit = 100;
  var url = 'https://www.reddit.com/r/pics/search.json?q=' + (params.category || 'pics');
  url += '&limit=' + (params.limit);

  get(url, function (status, headers, body) {
    var response = JSON.parse(body);

    _.each(response.data.children, function (child) {
      var url = child.data.url;

      appendImage(url);

      console.log('ITEM!', child.data.url);
    });

  });
}
