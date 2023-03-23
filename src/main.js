window["baseoneCollect"] = initializatonWidget;
window["closePaymentWidget"] = closeWidget;
// window["hid"] = closeWidget;
const domain = document.referrer;

const supportedAPI = ['init', 'message']; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

async function initializatonWidget(data){
    var url = "";
switch(data.env) {
    case "test":
        url = "http://localhost:8080";
        // url = "https://baseonecollectwidgettest.azureedge.net";
        break;
    case "staging":
        url = "https://baseonecollectwidgetstaging.azureedge.net";
        break;
    case "prod":
        url = "https://baseonewidgetpayment.com";
        break;
    default:
        url = "http://baseonewidgetpayment.com"; 
}
    var iframe = document.createElement('iframe');
  iframe.id = "hidden_iframe";
  iframe.src = `${url}/bankPayment.html?data=${JSON.stringify(data)}&&success=${data.onSuccess}&&failure=${data.onFailure}`;
  iframe.style.width = "100%";
    iframe.style.height = "100%";
  iframe.style.top = "0";
  iframe.style.zIndex = "hidden";
    iframe.style.left = "0";
     iframe.style.position = "fixed";
     iframe.style.zIndex = "300000";
   
  document.body.appendChild(iframe);
 }
function closeWidget(){
    var url = new URL(window.location.href);
            var c = url.searchParams.get("data");
    window.open(JSON.parse(c).url||document.referrer,'_parent','');
    // window.open(document.referrer,'_parent','');
 }
 
function app(window) {
    let configurations = {
        someDefaultConfiguration: false
    };

    // all methods that were called till now and stored in queue
    // needs to be called now 
    let globalObject = window[window['JS-Widget']];
    let queue = globalObject.q;
    if (queue) {
        for (var i = 0; i < queue.length; i++) {
            if (queue[i][0].toLowerCase() == 'init') {
                configurations = extendObject(configurations, queue[i][1]);
                console.log('JS-Widget started', configurations);
            }
            else
                apiHandler(queue[i][0], queue[i][1]);
        }
    }

    // override temporary (until the app loaded) handler
    // for widget's API calls
    globalObject = apiHandler;
    globalObject.configurations = configurations;
}

/**
    Method that handles all API calls
    */
function apiHandler(api, params) {
    if (!api) throw Error('API method required');
    api = api.toLowerCase();

    if (supportedAPI.indexOf(api) === -1) throw Error(`Method ${api} is not supported`);

    console.log(`Handling API call ${api}`, params);

    switch (api) {
        // TODO: add API implementation
        case 'message':
            break;
        default:
            console.warn(`No handler defined for ${api}`);
    }
}

function extendObject(a, b) {
    for (var key in b)
        if (b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
}

app(window);
