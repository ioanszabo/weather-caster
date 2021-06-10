`[![lunar-fetcher](https://i.imgur.com/yEchLhG.png)](#)

# nodejs-weather-caster
A nodejs application that shows weather data for different cities from  [OpenWeather](https://openweathermap.org/).

Weather Caster displays weather data based on:
- **city**
- **zip code & country code**
- **import file**
- **geolocation**

## Prerequisites
- Unix based operating system
- Valid key from [OpenWeather](https://openweathermap.org/)

## :gear: Installation
- Copy .env.sample to .env and provide a value for GOT_API_KEY

```sh
# install modules (node_modules)
npm install
```

## :clipboard: Example
```sh
# Without options (will use geolocation); it will prompt for city name and temperature unit measurement
node weather

# City & unit measurement with the following options: c (Celsius) or f (Fahrenheit)
node weather -c paris -t c

# Zip code, country code and temperature unit measurement
node weather -z 38000,fr -t f

# It will get weather data for the last location entered by user  
# It will use ~/.weather/last-config.json 
node weather -l

# Unit measurement; it will prompt for city name
node weather -t c

# City name; it will prompt for temperature unit measurement
node weather -c paris

# City name; it will prompt for temperature unit measurement
node weather -z 38000,fr

# User to provide list of cities; will be displayed first 10 cities from array
node weather --import ./cities.json
example of file content:
[
  'Paris',
  'London'
]

# It will not use geolocation; it will prompt for city name and temperature unit measurement
node weather --nogeolocation

# Displays help
node weather -h

# After completion the file 2020-2021.json will be created. There you can find all lunar data for specified years.
```

#### Notes
- To get `GOT_API_KEY` sign in to https://openweathermap.org/ and create there a key
- When using the `--import` or `-l` options `last-config.json` will not be updated

## :heavy_check_mark: Run tests
```sh
# Run tests 
npm run test
```

## :scroll: License
Apache License, Version 2.0 © Ioan-Adrian Szabo
