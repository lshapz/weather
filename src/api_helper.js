const base_url = 'https://api.weatherbit.io/v2.0/current';

const api_key = 'b7afe0c35ad64e04b413389536bc3add';

const get_url = function (state) {
    console.log('geturl', state)
    let url = base_url;
    if (state.searchBy === 'zip') {
        url += "?postal_code=" + state.value 
    } else {
        url += "?city=" + state.value.replace(/ /g, '+')
        if (state.state) {
            url += "," + state.state
        }
        if (state.country) {
            url += "&country=" + state.country
        }
    }    

    console.log('api getter', url)
    return url + "&key=" + api_key
}

export default get_url;