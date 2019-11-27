import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Favorites extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.favClicked = this.favClicked.bind(this);
    }

    handleClick () {
        this.props.history.push('/');
    }

    favClicked(key) {
        this.props.history.push('/detail/'+key);
    }

    render() {
        const renderTable = () => {
            let data = cookies.getAll({path: '/'});
            if (!!data) {
               return Object.keys(data).map(key => {
                    return (
                        <TableRow key={key} onClick={() => this.favClicked(key)}>
                            <TableCell component="th" scope="row">
                                {data[key]}
                            </TableCell>
                        </TableRow>
                    )
                });
            }
        }
        return (
            <div>
                <Button onClick={this.handleClick} variant="contained" color="primary" style={{marginTop: '15px', marginLeft: '15px'}}>
                    Back to search
                </Button>
                <Paper className="root">
                    <Table className="table" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>My favorites</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderTable()}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default Favorites;