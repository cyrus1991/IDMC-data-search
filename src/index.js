import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  state = {
    results: [],
    isLoading: true
  };
  componentDidMount() {
    setTimeout(() => {
      const url =
        "https://api.idmcdb.org/api/displacement_data?ci=IDMCWSHSOLO009";

      fetch(url)
        .then(response => response.json())
        .then(json => {
          const results = json.results;
          const dataFrom2016 = results.filter(x => x.year === 2016);
          this.setState({
            results: dataFrom2016,
            isLoading: false
          });
        });
    }, 2000);
  }
  render() {
    console.log(this.state);
    const { isLoading, results } = this.state;
    return (
      <div>
        {isLoading && <span>Loading...</span>}
        {!isLoading && <pre>{JSON.stringify(results, 0, 2)}</pre>}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
