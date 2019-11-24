import React, {Component} from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-material/dist/all.css';
import axios from 'axios';
import ReactDataGrid from 'react-data-grid';
import 'bootstrap-4-grid/css/grid.min.css';
import './App.css';



class App extends Component {
   

constructor(props){

  super(props);
 
}

 state = {rows: [], dataLoaded: false, error: null};
  

componentDidMount() {
   this.timer= setInterval( () =>  axios.get("https://financialmodelingprep.com/api/v3/forex")
    .then(res => res.data.forexList)


    .then(
      result => {
        this.setState({
         dataLoaded: true,
          rows: result
        });
      },
      
      error => {
        this.setState({
          dataLoaded: true,
          error
        });
      }
      )
  
  , 1000)

  }
  componentWillUnmount() {
        clearInterval(this.timer);
    }


   dataRecieved = (forex) => {
        this.setState({
            ...this.state,
            rows: forex
        });
    }

       dataStateChange = (e) => {
        this.setState({
            ...this.state,
            rows: e.data
        });
    }



  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };    



 render() {

  const {rows, dataLoaded, error} = this.state;


if(error) {
console.log("ERROR :"+ error);
return <div>ERROR......</div>;

}
else if (!dataLoaded) {
console.log("loaded... :"+ dataLoaded);
return <div>Please wait a moment....</div>;

}

else {
  console.log("ROWS :"+ JSON.stringify(rows));
return(
/*  
<ReactDataGrid
        columns={columns}
        rowGetter={i => rows[i]}
        rowsCount={rows.length}
        onGridRowsUpdated={this.onGridRowsUpdated}
        enableCellSelect={true}/>*/

        
 <div className="app-container container">
<div className="row">
  
  
    <Grid style={{ height: '400px', width: '800px'}} data={rows} >

      <Column field="ticker" title="Ticker" width="120px" />
      <Column field="bid" title="Bid" width="100px" />
      <Column field="ask" title="Ask" width="80px" />
      <Column field="open" title="Price" width="80px" />
      <Column field="low" title="Stock" width="90px" />
      <Column field="high" title="High" width="80px" />
      <Column field="changes" title="Changes" width="150px" />
      <Column field="date"  title="Date" width="150px"/>

    </Grid>
  </div> 
</div>
);
}
}


}



export default App;




