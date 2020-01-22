import React from 'react'
import Context from '../context.js'

class Image extends React.Component {
    static contextType = Context;

    render() {
        
        let value = this.context.data;

        let city_name = value.city_name 
            if (value.country_code === "US") {
                city_name += `, ${value.state_code}`
            }
        
        let icon_url = "https://www.weatherbit.io/static/img/icons/" + value.weather["icon"] + ".png"
        
        let cloud;
        

        if (value.weather.description.toLowerCase().includes("cloud")) {
          cloud = <div className="cloud"></div>
        } 
        let converter = (input) =>{
          let number = (1.8 * input) + 32;
          if (!Number.isInteger(number)) {
            return number.toFixed(2)
          } else {
            return number
        }

        }

        let temp = converter(value.temp);
        let feels = converter(value.app_temp);


        // let time = new Date(value.last_ob_time).toLocaleString('en-us', {timeZone: value.timezone});
return (  

  <div className="image">
    <h2>{city_name}</h2> 
    <img src={icon_url} alt="weather icon"></img>
    {/* <h4> Observed at: {time} </h4> */}

      <h1>{temp}°F </h1>
    <h4>feels like {feels}° </h4>
  </div>
  )

}
}

export default Image
