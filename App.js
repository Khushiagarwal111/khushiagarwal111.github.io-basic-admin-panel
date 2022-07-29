import React from 'react';
import axios from 'axios';
import './App.css';
import './style.css'
import TableRow from './components/tableRow/TableRow';
import InfoWrapper from './components/infoWrapper/InfoWrapper';
//  var url = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';


class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    userData: [],
    searchQuery: "",
    filteredUser: [],
    activeRowId: '',
    activeRowIndex: 2,
    activeRowData: ''
  }

  componentDidMount() {
    axios.get('http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D')
      .then((res) => {

        this.setState({
          userData: res.data,
          activeRowId: res.data[this.state.activeRowIndex].id,
          activeRowData: res.data[this.state.activeRowIndex]
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  getSearchValue = (e) => {
    let filteredUser = this.state.userData.filter((user) => {
      if (user.firstName.toLowerCase().includes(e.target.value.toLowerCase())) {
        return true
      }
    })
    console.log(filteredUser)

    this.setState({
      searchQuery: e.target.value,
      filteredUser
    })
  }

  handleSelectedRow = (id) => {
    let selectedRowRecords = this.state.userData.findIndex(user => user.id == id)
    console.log(selectedRowRecords)


    this.setState({
      activeRowId: id,
      activeRowData: this.state.userData[selectedRowRecords]
    }
    )
  }

  render() {
    return (
      <div>
      <main>
        <div id="table-section">

          <form action="/">

            <input
              type="text"
              placeholder="Enter something"
              name="search-box"
              id="search-box"
              onChange={this.getSearchValue}
              value={this.state.searchQuery}

            />
          </form>

          <div id="table-wrapper">

            <div id="table-headers">
              <table>
                <thead>
                  <tr>
                    <th className="column1">Id</th>
                    <th className="column2">FirstName</th>
                    <th className="column3">LastName</th>
                    <th className="column4">Email</th>
                    <th className="column5">Phone</th>
                  </tr>
                </thead>
              </table>
            </div>

            <div id="table-data">
              <table>
                <tbody>

                  {
                    //this.state.userData.map((user)=><TableRow data={user}/>)
                    this.state.filteredUser.length === 0 && this.state.searchQuery === '' ?
                      this.state.userData.map((user) => <TableRow
                        data={user}
                        handleSelectedRow={this.handleSelectedRow}
                        selectedRow={this.state.activeRowId}
                      />) :
                      this.state.filteredUser.map((user) => <TableRow
                        data={user}
                        handleSelectedRow={this.handleSelectedRow}
                        selectedRow={this.state.activeRowId}
                      />)




                  }

                </tbody>
              </table>
            </div>

          </div>

        </div>




        {this.state.activeRowData &&
          <InfoWrapper
            activeRowData={this.state.activeRowData}

          />}
          </main>
      </div>
    );
  }
}

export default App;
