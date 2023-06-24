import React, { Component } from 'react';
import Searchbox from './searchbox.js';

class SearchApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: []
    };
  }

  componentDidMount() {
    this.fetchLocations(this.props.searchfield);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchfield !== this.props.searchfield) {
      this.fetchLocations(this.props.searchfield);
    }
  }

  fetchLocations = async (searchfield) => {
    try {
      let url;
      if (searchfield.trim() === '') {
        // Fetch top cities if search field is empty
        url = 'https://dataservice.accuweather.com/locations/v1/topcities/50?apikey=QiIeQlIz1YVcGP7OvuOcPWEXzHxy2JNc';
      } else {
        // Fetch locations based on search field value
        url = `https://api.weatherapi.com/v1/search.json?key=820087a8ca4840f2b6674100232206&q=${searchfield}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      this.setState({ location: data });
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  render() {
    const { searchfield, searchChange, search, searchClick } = this.props;
    const { location } = this.state;
    console.log(searchfield)
    return (
      <div>
        <Searchbox
          searchfield={search}
          searchChange={searchChange}
          locations={location}
          search={searchfield}
          searchClick={searchClick}
        />
      </div>
    );
  }
}

export default SearchApi;
