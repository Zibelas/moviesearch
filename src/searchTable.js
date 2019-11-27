import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import axios from "axios";
import TablePagination from "@material-ui/core/TablePagination";

class SearchTable extends Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.favoritesClick = this.favoritesClick.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.cellClicked = this.cellClicked.bind(this);
        this.state = {
            rows: [],
            search: '',
            totalResults: 0,
            rowsPerPage: 10,
            page: 1
        };
    }

    cellClicked (title) {
        this.props.history.push('/detail/'+title);
    }

    favoritesClick () {
        this.props.history.push('/fav/');
    }

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
        this.doSearch(newPage);
    };

    changeInput (event) {
        this.setState({search: event.target.value})
    }

    handleChangeRowsPerPage(event) {
        this.setState({rowsPerPage: event.target.value});
        this.setState({page: 1});
    };

    doSearch(pageNumber) {
        let page = pageNumber === 1 ? '' : '&page='+ pageNumber;
        this.setState({rows: []});
        axios.get('http://www.omdbapi.com/?apikey=25486812&s='+this.state.search + page)
            .then(response => {
                this.setState({rows: response.data.Search});
                this.setState({totalResults: Number(response.data.totalResults)})
            });
    }

    handleClick () {
        this.setState({page: 1});
        this.doSearch(1);
    }

    render() {
        const renderTable = () => {
            if (!!this.state.rows) {
                return this.state.rows.map(row => {
                    return (
                        <TableRow key={row.Title} onClick={() => this.cellClicked(row.imdbID)} >
                            <TableCell component="th" scope="row">
                                {row.Title}
                            </TableCell>
                            <TableCell align="right">{row.Year}</TableCell>
                        </TableRow>
                    )
                })
            }
        }
        return (
            <div>

                <div style={{textAlign: 'center', marginTop: '50px'}}>
                    <Button onClick={this.handleClick} variant="contained" color="primary" style={{marginRight: '5px'}}>
                        Search
                    </Button>
                    <input type='text' value={this.state.search} onChange={this.changeInput}/>
                    <Button onClick={this.favoritesClick} variant="contained" color="primary" style={{marginLeft: '5px'}}>
                        Favorites
                    </Button>
                    <Paper className="root">
                        <Table className="table" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="right">Year</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {renderTable()}
                            </TableBody>
                        </Table>
                        <TablePagination rowsPerPageOptions={[10]}
                                         component="div"
                                         count={this.state.totalResults}
                                         page={this.state.totalResults === 0 ? 0 : this.state.page}
                                         onChangePage={this.handleChangePage}
                                         rowsPerPage={this.state.rowsPerPage}
                                         onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                         />
                    </Paper>
                </div>
            </div>
        );
    }
}
export default SearchTable;