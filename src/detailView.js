import React, { Component } from 'react';
import axios from "axios";
import Button from "@material-ui/core/Button";
import Cookies from 'universal-cookie';
import Checkbox from "@material-ui/core/Checkbox";

const cookies = new Cookies();

class DetailView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            movie: null,
            cookies: null,
            favorite: cookies.get(this.props.match.params.id) != null ? true : false
        };
        this.handleClick = this.handleClick.bind(this);
        this.changeToCookie = this.changeToCookie.bind(this);
        this.doSearch();
    }

    handleClick () {
        this.props.history.push('/');
    }

    changeToCookie () {
        if (!this.state.favorite) {
            cookies.set(this.state.id, this.state.movie.Title, {path: '/'});
        }else {
            cookies.remove(this.state.id, {path: '/'});
        }
        this.setState({favorite: !this.state.favorite});
    }

    doSearch() {
        axios.get('http://www.omdbapi.com/?apikey=25486812&i='+this.state.id)
            .then(response => {
                this.setState({movie: response.data});
            });
    }

    render() {
        const renderTable = () => {
            if (!!this.state.movie) {
                return (
                    <div style={{ width: '100%', height: '100%', left: '25%', right: '25%', textAlign: 'left',
                        position: 'fixed', marginTop: '50px'}}>
                        <img src={this.state.movie.Poster} style={{float: 'left'}}/>
                        <b>My Favorite </b>
                        <Checkbox
                            checked={this.state.favorite}
                            onChange={this.changeToCookie}
                        /> <br/>
                        <b>Title </b>{this.state.movie.Title} <br/>
                        <b>Year </b> {this.state.movie.Year} <br/>
                        <b>Rated </b> {this.state.movie.Rated} <br/>
                        <b>Released </b>{this.state.movie.Released} <br/>
                        <b>Runtime </b>{this.state.movie.Runtime} <br/>
                        <b>Genre </b>{this.state.movie.Genre} <br/>
                        <b>Director </b>{this.state.movie.Director} <br/>
                        <b>Writer </b>{this.state.movie.Writer} <br/>
                        <b>Actors </b>{this.state.movie.Actors} <br/>
                        <b>Plot </b>{this.state.movie.Plot} <br/>
                        <b>Language </b>{this.state.movie.Language} <br/>
                        <b>Country </b>{this.state.movie.Country} <br/>
                        <b>Awards </b>{this.state.movie.Awards} <br/>
                        <b>Ratings </b><br/>
                        {
                            this.state.movie.Ratings.map((rating) => {
                                return (
                                    <div key={rating.Source}>{rating.Source} {rating.Value}</div>
                                );
                            })
                        }
                        <b>Metascore </b> {this.state.movie.Metascore}
                        <b>  imdbRating</b> {this.state.movie.imdbRating}
                        <b>  imdbVotes </b> {this.state.movie.imdbVotes}
                        <b>  imdbID </b> {this.state.movie.imdbID} <br/>
                        <b>Type </b> {this.state.movie.Type}
                        <b>  DVD </b> {this.state.movie.DVD}
                        <b>  BoxOffice </b> {this.state.movie.BoxOffice}
                        <b>  Production </b> {this.state.movie.Production}
                        <b>  Website </b> {this.state.movie.Website}
                    </div>
                )
            }
        }
        return (
            <div>
                <Button onClick={this.handleClick} variant="contained" color="primary" style={{marginTop: '15px', marginLeft: '15px'}}>
                    Back to search
                </Button>
                {renderTable()}
            </div>
        );
    }
}
export default DetailView;