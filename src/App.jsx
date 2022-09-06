import React, { useState, useEffect } from "react";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);

          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div id="">
        <h1>Contact list</h1>
        <input className="search" type="text" placeholder="Search"></input>
        <button>
          {" "}
          <i class="fa fa-search" i></i>
        </button>
        <i class="fa fa-ellipsis-vertical" i></i>
        {items.map((item, index) => {
          console.log(item);
          let firstchar = item.name.charAt(0);
          //console.log(firstchar);
          return (
            <div className="main">
              <div className="ContactDiv" key={"contact_" + index}>
                <div className="firstCol">
                  <p>{firstchar}</p>
                </div>
                <div className="secondCol">
                  <p className="para">{item.name}</p>

                  <p className="para">{item.phone}</p>
                  <button>
                    <i class="fa fa-edit"> edit</i>
                  </button>
                  <button>
                    <i class="fa fa-trash"> delete</i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
