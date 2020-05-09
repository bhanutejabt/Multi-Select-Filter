import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prodetails: [],
      selectcat: "",
      selectprice: "",
      selectcod: ""
    };

  }

  handleChangeCat = event => {
    this.setState({ selectcat: event.target.value });
  };

  handleChangePrice = event => {
    this.setState({ selectprice: event.target.value });
  };

  handleChangeCod = event => {
    this.setState({ selectcod: event.target.value });
  };


  getUnique(arr, comp) {
    const unique = arr
      //store the comparison values in array
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e])

      .map(e => arr[e]);

    return unique;
  }

  componentDidMount() {
    const prodetails = require("./ProDetails.json");
    this.setState({ prodetails: prodetails });
  }

  render() {

    const uniqueCat = this.getUnique(this.state.prodetails, "category");
    const prodetails = this.state.prodetails;

    const selectcat = this.state.selectcat;
    const selectcod = this.state.selectcod;
    const selectprice = this.state.selectprice;

    //console.log(selectprice, selectcat, selectcod)

    const filterProd = prodetails.filter(function (result) {
      if (selectprice === "1") {
        return result.category === selectcat && result.cod === selectcod && result.price <= 10000;
      }
      else if (selectprice === "2") {
        return result.category === selectcat && result.cod === selectcod && result.price > 10000 && result.price <= 20000;
      }
      else if (selectprice === "3") {
        return result.category === selectcat && result.cod === selectcod && result.price > 20000;
      }
    });

    //console.log(filterProd)



    return (
      <div>
        <center><h1>Multi-Select Filter </h1>
          <h3>Choose From Below 3 Filters</h3></center>

        <form class="form">

          <table width="100%">
            <tr>
              <td>
                <b>Category</b>
              </td>
              <td>
                <select
                  value={this.state.selectcat}
                  onChange={this.handleChangeCat}
                >
                  <option key="0" value="Choose Below">Choose Below</option>
                  {uniqueCat.map(cat => (
                    <option value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <b>Price Range</b>
              </td>
              <td>
                <select
                  value={this.state.selectprice}
                  onChange={this.handleChangePrice}
                >
                  <option value="Choose Below">Choose Below</option>
                  <option value="1">Less Than 10000</option>
                  <option value="2">Between 10k to 20k</option>
                  <option value="3">Above 20k</option>
                </select>
              </td>

              <td>
                <b> COD or Online Payment</b>
              </td>
              <td>
                <select
                  value={this.state.selectcod}
                  onChange={this.handleChangeCod}
                >
                  <option value="Choose Below">Choose Below</option>
                  <option value="Yes">COD</option>
                  <option value="No">Online Payment</option>

                </select>
              </td>
            </tr>
          </table>
          <br />
          <center><h2>Filtered Product Details</h2></center>

          <table width="100%" style={{ textAlign: "left", marginLeft: "15%", marginRight: "15%" }}>
            <tr>
              <th>Category</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>COD (Yes/No)</th>
            </tr>
            {

              filterProd.map(pro => (
                <tr key={pro.id} style={{ paddingLeft: "40px" }}>
                  <td>{pro.category}</td>
                  <td>{pro.product}</td>
                  <td>{"Rs." + pro.price}</td>
                  <td>{pro.cod}</td>

                </tr>
              ))
            }


          </table>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
