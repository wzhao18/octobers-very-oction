import {API_URL} from '../config';
/* AJAX fetch() calls */
const log = console.log

log('Loaded front-end javascript.')

// A function to send a GET request to the web server,
//  and then loop through them and add a list element for each student.

export async function getItemById(itemId) {
    // the URL for the request
    const url = API_URL+'items/' + itemId;

    // Since this is a GET request, simply call fetch on the URL
    const item = await fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json() 
       } else {
            alert('Could not get item')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
        return json
    }).catch((error) => {
        log(error)
    })
    return item;
}

export async function getItems() {
    // the URL for the request
    const url = API_URL + 'items';

    // Since this is a GET request, simply call fetch on the URL
    const items = await fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json() 
       } else {
            alert('Could not get item')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
        return json.items
    }).catch((error) => {
        log(error)
        return []
    })
    return items;
}

export async function getItemsByKeyword(word) {
    // the URL for the request
    const url = API_URL+'items-by-keyword/' + word;

    // Since this is a GET request, simply call fetch on the URL
    const items = await fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json() 
       } else {
            alert('Could not get item')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
        return json.items
    }).catch((error) => {
        log(error)
    })
    return items;
}


export async function getItemsByCategory(category) {
    // the URL for the request
    const url = API_URL+'items-by-category/' + category;

    // Since this is a GET request, simply call fetch on the URL
    const items = await fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json() 
       } else {
            alert('Could not get item')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
        return json.items
    }).catch((error) => {
        log(error)
    })
    
    return items;
}

export async function getItemsByKeywordAndCategory(word, category) {
    // the URL for the request
    const url = API_URL+'items-by-keyword-and-category/' + word + '/' + category;

    // Since this is a GET request, simply call fetch on the URL
    const items = await fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
           return res.json() 
       } else {
            alert('Could not get item')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
        return json.items
    }).catch((error) => {
        log(error)
    })
    
    return items;
}

// A function to send a POST request with a new student.
export function addItem(itemName, itemCategory, itemDescription, itemImageSrc) {
    // the URL for the request
    const url = API_URL+'items';

    // The data we are going to send in our request
    let item = {
        itemName : itemName,
        itemCategory : itemCategory,
        itemDescription : itemDescription, 
        itemImageSrc : itemImageSrc
    }

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(item),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {
            console.log('Added item')
    }).catch((error) => {
        log(error)
    })
}

export async function itemAddOrder(itemId, orderId) {
    // the URL for the request
    const url = API_URL+"items-add-order/";

    // The data we are going to send in our request
    let act = {
        itemId: itemId,
        orderId: orderId
    }

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(act),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        }
    });

    // Send the request with fetch()
    await fetch(request)
    .then(function(res) {

    }).catch((error) => {
        log(error)
        throw error;
    })
}

export async function itemAddBid(itemId, price, userId) {
    // the URL for the request
    const url = API_URL+"items-add-bid/";

    // The data we are going to send in our request
    let act = {
        itemId: itemId,
        price: price,
        userId: userId
    }

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(act),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        }
    });

    // Send the request with fetch()
    await fetch(request)
    .then(function(res) {
            log(res)
            console.log('item added bid')
    }).catch((error) => {
        log(error)
        throw error;
    })
}

export async function itemRemoveBid(itemId, price, userId) {
    // the URL for the request
    const url = API_URL+"items-remove-bid/";

    // The data we are going to send in our request
    let act = {
        itemId: itemId,
        price: price,
        userId: userId
    }

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(act),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        }
    });

    // Send the request with fetch()
    await fetch(request)
    .then(function(res) {
            log(res)
            console.log('item removed bid')
    }).catch((error) => {
        log(error)
        throw error;
    })
}

export async function itemAddAsk(itemId, price, userId) {
    // the URL for the request
    const url = API_URL+"items-add-ask/";

    // The data we are going to send in our request
    let act = {
        itemId: itemId,
        price: price,
        userId: userId
    }

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(act),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        }
    });

    // Send the request with fetch()
    await fetch(request)
    .then(function(res) {
            log(res)
            console.log('item added ask')
    }).catch((error) => {
        log(error)
        throw error;
    })
}

export async function itemRemoveAsk(itemId, price, userId) {
    // the URL for the request
    const url = API_URL+"items-remove-ask/";

    // The data we are going to send in our request
    let act = {
        itemId: itemId,
        price: price,
        userId: userId
    }

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(act),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        }
    });

    // Send the request with fetch()
    await fetch(request)
    .then(function(res) {
            log(res)
            console.log('item removed ask')
    }).catch((error) => {
        log(error)
        throw error;
    })
}
