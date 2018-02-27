/**
 *  Created by Wojtek on 2018-02-22.
 */
import React from 'react';
import Loader from './LoaderComponent';
import BearItem from './BearItemComponent';
import Modal from  './ModalComponent';


export default class BearsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beers: [],
            beer: undefined,
            showModal: false,
            beerHint: undefined
        };
    }

    //get url
    getBears() {
        return fetch('https://api.punkapi.com/v2/beers', {
            method: 'get',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        })
    }

    //fetch data
    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
        this.getBears()
            .then((Response) => Response.json())
            .then((beers) => {
                console.log(beers);
                this.setState({
                    beers
                });
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    //event on scroll
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    //on scroll function passed to lifecycle
    onScroll() {
        if (
            (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) // if reches the BOTTOM
        ) {
            // console.log('scrolled')
        }
    }


    // toggle modal
    handleModal(beer) {
        // console.log(beer.id, beer.name);
        this.setState({
            showModal: !this.state.showModal,
            beer
        })
    }

    // displayHint() {
    //     const {beerHint} = this.state;
    //     console.log(beerHint);
    //     this.setState({
    //         beerHint: beers
    //     })
    // }




    render() {
        const {beers, beer} = this.state;
        //LOADER//
        if (!beers.length) {
            return <Loader />
        }
        return (
            <div>
                <div className="items-wrapper container">
                    { beers.map((bearEl, index) =>
                        <BearItem {...bearEl}
                                  key={index}
                                  onItemClick={this.handleModal.bind(this, bearEl)}

                        />
                    )}
                </div>
                <Modal showModal={this.state.showModal}
                       onCloseClick={this.handleModal.bind(this)}
                       beer={beer}
                       beers={beers}
                />
            </div>
        )
    }
}